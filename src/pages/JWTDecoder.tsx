
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy } from 'lucide-react';
import PageContainer from '@/components/PageContainer';

interface DecodedJWT {
  header: any;
  payload: any;
  signature: string;
}

const JWTDecoder: React.FC = () => {
  const [token, setToken] = useState('');
  const [decodedToken, setDecodedToken] = useState<DecodedJWT | null>(null);
  const [error, setError] = useState<string | null>(null);

  const decodeToken = (jwt: string) => {
    // Clear previous states
    setError(null);
    setDecodedToken(null);
    
    if (!jwt) {
      return;
    }
    
    try {
      const parts = jwt.split('.');
      if (parts.length !== 3) {
        setError('Invalid JWT format. It should have 3 parts separated by dots.');
        return;
      }
      
      const header = JSON.parse(atob(parts[0]));
      
      // Handle padding for payload
      let payload;
      try {
        const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const payloadPadded = payloadBase64 + '==='.slice((payloadBase64.length + 3) % 4);
        payload = JSON.parse(atob(payloadPadded));
      } catch (e) {
        // Try without padding if the above fails
        payload = JSON.parse(atob(parts[1]));
      }
      
      const signature = parts[2];
      
      setDecodedToken({ header, payload, signature });
    } catch (e) {
      console.error(e);
      setError('Failed to decode JWT. Make sure it is correctly formatted.');
    }
  };

  const formatJSON = (json: any) => {
    return JSON.stringify(json, null, 2);
  };

  const copyToClipboard = (text: string, part: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${part} copied to clipboard`);
  };

  useEffect(() => {
    if (token) {
      decodeToken(token);
    }
  }, [token]);

  return (
    <PageContainer
      title="JWT Decoder"
      description="Decode and view the contents of JSON Web Tokens (JWT) without verification."
    >
      <Card className="mb-6">
        <CardContent className="p-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              JWT Token
            </label>
            <Textarea
              placeholder="Paste your JWT here..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="h-32 font-mono text-sm"
            />
            <p className="text-xs text-amber-600 mt-2">
              Warning: Do not paste sensitive or production tokens here. This decoder doesn't verify token authenticity.
            </p>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {decodedToken && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Header</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(formatJSON(decodedToken.header), 'Header')}
                >
                  <Copy size={14} className="mr-1" /> Copy
                </Button>
              </div>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                {formatJSON(decodedToken.header)}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Payload</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(formatJSON(decodedToken.payload), 'Payload')}
                >
                  <Copy size={14} className="mr-1" /> Copy
                </Button>
              </div>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
                {formatJSON(decodedToken.payload)}
              </pre>

              {decodedToken.payload.exp && (
                <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md text-sm">
                  <span className="font-medium">Token expires:</span> {' '}
                  {new Date(decodedToken.payload.exp * 1000).toLocaleString()}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Signature</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToClipboard(decodedToken.signature, 'Signature')}
                >
                  <Copy size={14} className="mr-1" /> Copy
                </Button>
              </div>
              <div className="bg-gray-100 p-4 rounded-md font-mono text-sm break-all">
                {decodedToken.signature}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                The signature is used to verify the sender of the JWT and ensure the message wasn't changed.
                This tool doesn't verify the signature's authenticity.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </PageContainer>
  );
};

export default JWTDecoder;
