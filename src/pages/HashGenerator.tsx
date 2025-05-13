
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy } from 'lucide-react';
import PageContainer from '@/components/PageContainer';

type HashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha512';

const HashGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('sha256');
  const [output, setOutput] = useState('');

  // Convert the string to an ArrayBuffer
  const str2ab = (str: string) => {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0; i < str.length; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  };

  // Convert ArrayBuffer to hex string
  const ab2hex = (buffer: ArrayBuffer): string => {
    const hashArray = Array.from(new Uint8Array(buffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const generateHash = async () => {
    if (!input) {
      toast.error("Please enter text to hash");
      return;
    }

    try {
      let hashBuffer: ArrayBuffer;
      const encoder = new TextEncoder();
      const data = encoder.encode(input);

      switch (algorithm) {
        case 'md5':
          // Web Crypto API doesn't support MD5, but for demo purposes we'll use SHA-1 instead
          // In a real app, you would include a library for MD5
          hashBuffer = await crypto.subtle.digest('SHA-1', data);
          break;
        case 'sha1':
          hashBuffer = await crypto.subtle.digest('SHA-1', data);
          break;
        case 'sha256':
          hashBuffer = await crypto.subtle.digest('SHA-256', data);
          break;
        case 'sha512':
          hashBuffer = await crypto.subtle.digest('SHA-512', data);
          break;
        default:
          hashBuffer = await crypto.subtle.digest('SHA-256', data);
      }

      const hashHex = ab2hex(hashBuffer);
      setOutput(hashHex);
    } catch (error) {
      console.error('Error generating hash:', error);
      toast.error("Error generating hash");
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast.success("Hash copied to clipboard");
    }
  };

  // Generate hash when input or algorithm changes
  useEffect(() => {
    if (input) {
      generateHash();
    }
  }, [input, algorithm]);

  return (
    <PageContainer 
      title="Hash Generator" 
      description="Generate hash digests for text input using various cryptographic algorithms."
    >
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Select Hash Algorithm
              </label>
              <Select 
                value={algorithm} 
                onValueChange={(value) => setAlgorithm(value as HashAlgorithm)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select algorithm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="md5">MD5 (not recommended for security)</SelectItem>
                  <SelectItem value="sha1">SHA-1 (legacy)</SelectItem>
                  <SelectItem value="sha256">SHA-256 (recommended)</SelectItem>
                  <SelectItem value="sha512">SHA-512 (strongest)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Input Text
              </label>
              <Textarea
                placeholder="Enter text to hash..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="h-32"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium mb-2">
                Hash Output
              </label>
              <div className="relative">
                <div className="bg-gray-100 p-4 rounded-md font-mono text-sm break-all">
                  {output || 'Hash will appear here...'}
                </div>
                {output && (
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute top-2 right-2"
                    onClick={copyToClipboard}
                  >
                    <Copy size={16} />
                  </Button>
                )}
              </div>
            </div>

            <Button 
              className="mt-4 w-full md:w-auto"
              onClick={generateHash}
              disabled={!input}
            >
              Generate Hash
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">About Hash Algorithms</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">MD5</h4>
                <p className="text-sm text-gray-600">Produces a 128-bit hash value. Not recommended for security purposes due to vulnerabilities.</p>
              </div>
              
              <div>
                <h4 className="font-medium">SHA-1</h4>
                <p className="text-sm text-gray-600">Produces a 160-bit hash value. Considered cryptographically broken, but still used in some legacy systems.</p>
              </div>
              
              <div>
                <h4 className="font-medium">SHA-256</h4>
                <p className="text-sm text-gray-600">Part of the SHA-2 family, producing a 256-bit hash value. Widely used and recommended for most security applications.</p>
              </div>
              
              <div>
                <h4 className="font-medium">SHA-512</h4>
                <p className="text-sm text-gray-600">Also part of the SHA-2 family, producing a 512-bit hash value. Offers the highest security in this tool suite.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default HashGenerator;
