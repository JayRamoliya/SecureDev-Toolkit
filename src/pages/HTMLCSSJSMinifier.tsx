
import React, { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Download, FileCode, FileInput, FileOutput } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HTMLCSSJSMinifier: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [inputCode, setInputCode] = useState({
    html: '',
    css: '',
    js: ''
  });
  const [outputCode, setOutputCode] = useState({
    html: '',
    css: '',
    js: ''
  });
  const [stats, setStats] = useState({
    html: { original: 0, minified: 0, savings: 0 },
    css: { original: 0, minified: 0, savings: 0 },
    js: { original: 0, minified: 0, savings: 0 }
  });

  const { toast } = useToast();

  const minifyHTML = (html: string): string => {
    if (!html.trim()) return '';
    
    return html
      // Remove HTML comments
      .replace(/<!--[\s\S]*?-->/g, '')
      // Remove whitespace between tags
      .replace(/>\s+</g, '><')
      // Remove leading and trailing whitespace
      .replace(/^\s+|\s+$/g, '')
      // Remove repeated spaces
      .replace(/\s{2,}/g, ' ');
  };

  const minifyCSS = (css: string): string => {
    if (!css.trim()) return '';
    
    return css
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove whitespace before and after brackets
      .replace(/\s*{\s*/g, '{')
      .replace(/\s*}\s*/g, '}')
      // Remove whitespace before and after colons and semicolons
      .replace(/\s*:\s*/g, ':')
      .replace(/\s*;\s*/g, ';')
      // Remove trailing semicolons
      .replace(/;\}/g, '}')
      // Remove whitespace after commas
      .replace(/,\s*/g, ',')
      // Remove newlines, tabs, and repeated spaces
      .replace(/[\r\n\t]+/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  };

  const minifyJS = (js: string): string => {
    if (!js.trim()) return '';
    
    // Basic JS minification (not as comprehensive as a full minifier)
    return js
      // Remove single-line comments
      .replace(/\/\/.*$/mg, '')
      // Remove multi-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove leading and trailing whitespace
      .replace(/^\s+|\s+$/g, '')
      // Remove whitespace around certain operators (basic)
      .replace(/\s*([=:+\-*/&|!?{}[\]();,<>])\s*/g, '$1')
      // Simplify multiple spaces
      .replace(/\s{2,}/g, ' ');
  };

  const handleMinify = () => {
    const currentInput = inputCode[activeTab];
    
    if (!currentInput.trim()) {
      toast({
        title: "No code to minify",
        description: `Please enter some ${activeTab.toUpperCase()} code to minify.`,
        variant: "destructive"
      });
      return;
    }

    let minified = '';
    
    switch(activeTab) {
      case 'html':
        minified = minifyHTML(currentInput);
        break;
      case 'css':
        minified = minifyCSS(currentInput);
        break;
      case 'js':
        minified = minifyJS(currentInput);
        break;
    }

    // Calculate statistics
    const originalSize = new Blob([currentInput]).size;
    const minifiedSize = new Blob([minified]).size;
    const percentage = originalSize ? Math.round((1 - minifiedSize / originalSize) * 100) : 0;

    setOutputCode(prev => ({ ...prev, [activeTab]: minified }));
    setStats(prev => ({
      ...prev,
      [activeTab]: {
        original: originalSize,
        minified: minifiedSize,
        savings: percentage
      }
    }));

    toast({
      title: "Code Minified",
      description: `Saved approximately ${percentage}% in file size.`
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setInputCode(prev => ({ ...prev, [activeTab]: value }));
  };

  const copyToClipboard = () => {
    const currentOutput = outputCode[activeTab];
    
    if (!currentOutput) {
      toast({
        title: "Nothing to copy",
        description: "Please minify some code first.",
        variant: "destructive"
      });
      return;
    }
    
    navigator.clipboard.writeText(currentOutput);
    
    toast({
      title: "Copied to clipboard",
      description: "Minified code has been copied to your clipboard."
    });
  };

  const downloadFile = () => {
    const currentOutput = outputCode[activeTab];
    
    if (!currentOutput) {
      toast({
        title: "Nothing to download",
        description: "Please minify some code first.",
        variant: "destructive"
      });
      return;
    }
    
    let fileExtension = '';
    let mimeType = '';
    
    switch(activeTab) {
      case 'html':
        fileExtension = 'html';
        mimeType = 'text/html';
        break;
      case 'css':
        fileExtension = 'css';
        mimeType = 'text/css';
        break;
      case 'js':
        fileExtension = 'js';
        mimeType = 'text/javascript';
        break;
    }
    
    const blob = new Blob([currentOutput], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `minified.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "File Downloaded",
      description: `Your minified ${activeTab.toUpperCase()} file has been downloaded.`
    });
  };

  const beautifyCode = () => {
    const currentOutput = outputCode[activeTab];
    
    if (!currentOutput) {
      toast({
        title: "Nothing to beautify",
        description: "Please minify some code first.",
        variant: "destructive"
      });
      return;
    }
    
    // Note: This is a very basic beautifier, not as sophisticated as professional tools
    let beautified = '';
    
    try {
      switch(activeTab) {
        case 'html':
          // Very basic HTML beautifier
          beautified = currentOutput
            .replace(/></g, '>\n<')
            .replace(/<(\w+)([^>]*)>/g, '<$1$2>\n')
            .replace(/<\/(\w+)>/g, '\n</$1>');
          break;
        case 'css':
          // Very basic CSS beautifier
          beautified = currentOutput
            .replace(/{/g, ' {\n  ')
            .replace(/;/g, ';\n  ')
            .replace(/}/g, '\n}\n');
          break;
        case 'js':
          // Very basic JS beautifier
          beautified = currentOutput
            .replace(/{/g, ' {\n  ')
            .replace(/}/g, '\n}\n')
            .replace(/;/g, ';\n  ')
            .replace(/\(/g, ' (')
            .replace(/\)/g, ') ');
          break;
      }
      
      setInputCode(prev => ({ ...prev, [activeTab]: beautified }));
      
      toast({
        title: "Code Beautified",
        description: "The code has been formatted for better readability."
      });
    } catch (error) {
      toast({
        title: "Beautify Failed",
        description: "Unable to beautify this code. It may be too complex.",
        variant: "destructive"
      });
    }
  };

  return (
    <PageContainer
      title="HTML/CSS/JS Minifier"
      description="Reduce file sizes by removing unnecessary whitespace, comments, and formatting."
    >
      <Card className="mb-6">
        <CardContent className="p-6">
          <Tabs defaultValue="html" onValueChange={(val) => setActiveTab(val as 'html' | 'css' | 'js')}>
            <TabsList className="mb-6">
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="js">JavaScript</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileInput className="text-devtools-purple h-5 w-5" />
                  <h3 className="text-lg font-medium">Input</h3>
                </div>
                
                <TabsContent value="html" className="mt-0">
                  <Textarea
                    placeholder="Paste your HTML code here..."
                    value={inputCode.html}
                    onChange={handleInputChange}
                    className="font-mono min-h-[300px]"
                  />
                </TabsContent>
                
                <TabsContent value="css" className="mt-0">
                  <Textarea
                    placeholder="Paste your CSS code here..."
                    value={inputCode.css}
                    onChange={handleInputChange}
                    className="font-mono min-h-[300px]"
                  />
                </TabsContent>
                
                <TabsContent value="js" className="mt-0">
                  <Textarea
                    placeholder="Paste your JavaScript code here..."
                    value={inputCode.js}
                    onChange={handleInputChange}
                    className="font-mono min-h-[300px]"
                  />
                </TabsContent>
                
                <Button 
                  onClick={handleMinify}
                  className="bg-devtools-purple hover:bg-purple-700"
                >
                  <FileCode className="mr-2 h-4 w-4" />
                  Minify {activeTab.toUpperCase()}
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileOutput className="text-devtools-purple h-5 w-5" />
                    <h3 className="text-lg font-medium">Output</h3>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      title="Copy to clipboard"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadFile}
                      title="Download file"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="html" className="mt-0">
                  <div className="bg-slate-50 border rounded-md p-3 min-h-[300px] overflow-auto">
                    {outputCode.html ? (
                      <pre className="text-sm font-mono whitespace-pre-wrap break-words">{outputCode.html}</pre>
                    ) : (
                      <div className="text-gray-500 h-full flex items-center justify-center">
                        <p>Minified HTML will appear here</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="css" className="mt-0">
                  <div className="bg-slate-50 border rounded-md p-3 min-h-[300px] overflow-auto">
                    {outputCode.css ? (
                      <pre className="text-sm font-mono whitespace-pre-wrap break-words">{outputCode.css}</pre>
                    ) : (
                      <div className="text-gray-500 h-full flex items-center justify-center">
                        <p>Minified CSS will appear here</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="js" className="mt-0">
                  <div className="bg-slate-50 border rounded-md p-3 min-h-[300px] overflow-auto">
                    {outputCode.js ? (
                      <pre className="text-sm font-mono whitespace-pre-wrap break-words">{outputCode.js}</pre>
                    ) : (
                      <div className="text-gray-500 h-full flex items-center justify-center">
                        <p>Minified JavaScript will appear here</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                {stats[activeTab].original > 0 && (
                  <div className="bg-purple-50 p-3 rounded-md border border-purple-100">
                    <h4 className="font-medium text-sm mb-1 text-purple-700">File Size Comparison:</h4>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="font-semibold">Original</div>
                        <div>{(stats[activeTab].original / 1024).toFixed(2)} KB</div>
                      </div>
                      <div>
                        <div className="font-semibold">Minified</div>
                        <div>{(stats[activeTab].minified / 1024).toFixed(2)} KB</div>
                      </div>
                      <div>
                        <div className="font-semibold">Savings</div>
                        <div className="text-green-600">{stats[activeTab].savings}%</div>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button 
                  variant="outline" 
                  onClick={beautifyCode}
                  disabled={!outputCode[activeTab]}
                >
                  Beautify Output
                </Button>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default HTMLCSSJSMinifier;
