
import React, { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileJson, Copy, Download, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const JSONFormatter: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const { toast } = useToast();
  
  const beautifyJSON = () => {
    if (!jsonInput.trim()) {
      setError('Please enter JSON data to format');
      setFormattedJson('');
      return;
    }
    
    try {
      // Parse JSON to ensure it's valid
      const parsed = JSON.parse(jsonInput);
      
      // Format with 2 space indentation
      const beautified = JSON.stringify(parsed, null, 2);
      setFormattedJson(beautified);
      setError(null);
      
      toast({
        title: "JSON Beautified",
        description: "Your JSON has been successfully formatted."
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(`Invalid JSON: ${err.message}`);
      } else {
        setError('An unknown error occurred while parsing JSON');
      }
      setFormattedJson('');
    }
  };
  
  const minifyJSON = () => {
    if (!jsonInput.trim()) {
      setError('Please enter JSON data to minify');
      setFormattedJson('');
      return;
    }
    
    try {
      // Parse and then stringify without formatting
      const parsed = JSON.parse(jsonInput);
      const minified = JSON.stringify(parsed);
      setFormattedJson(minified);
      setError(null);
      
      toast({
        title: "JSON Minified",
        description: "Your JSON has been successfully minified."
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(`Invalid JSON: ${err.message}`);
      } else {
        setError('An unknown error occurred while parsing JSON');
      }
      setFormattedJson('');
    }
  };

  const copyToClipboard = () => {
    if (!formattedJson) return;
    
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "JSON has been copied to your clipboard."
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJSON = () => {
    if (!formattedJson) return;
    
    const blob = new Blob([formattedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "JSON Downloaded",
      description: "Your JSON file has been downloaded."
    });
  };

  const validateInput = () => {
    if (!jsonInput.trim()) {
      setError(null);
      setFormattedJson('');
      return;
    }
    
    try {
      JSON.parse(jsonInput);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Invalid JSON: ${err.message}`);
      } else {
        setError('Invalid JSON format');
      }
    }
  };

  return (
    <PageContainer
      title="JSON Formatter & Beautifier"
      description="Format JSON data for better readability and debugging."
    >
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileJson className="text-devtools-purple h-5 w-5" />
                <h3 className="text-lg font-medium">JSON Input</h3>
              </div>
              
              <Textarea
                placeholder={`Paste your JSON here, e.g.:\n{\n  "example": "value"\n}`}
                value={jsonInput}
                onChange={(e) => {
                  setJsonInput(e.target.value);
                  // Validate on input change to provide immediate feedback
                  validateInput();
                }}
                className="font-mono min-h-[300px]"
              />
              
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={beautifyJSON}
                  className="bg-devtools-purple hover:bg-purple-700"
                >
                  Beautify
                </Button>
                
                <Button 
                  onClick={minifyJSON}
                  variant="outline"
                >
                  Minify
                </Button>
              </div>
              
              {error && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded border border-red-200">
                  {error}
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileJson className="text-devtools-purple h-5 w-5" />
                  <h3 className="text-lg font-medium">Formatted Output</h3>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!formattedJson}
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadJSON}
                    disabled={!formattedJson}
                    title="Download JSON"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-slate-50 border rounded-md p-3 min-h-[300px] overflow-auto">
                {formattedJson ? (
                  <pre className="text-sm font-mono whitespace-pre-wrap break-words">
                    {formattedJson}
                  </pre>
                ) : (
                  <div className="text-gray-500 h-full flex items-center justify-center text-center">
                    <p>Formatted JSON will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default JSONFormatter;
