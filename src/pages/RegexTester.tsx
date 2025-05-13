
import React, { useState, useEffect } from 'react';
import PageContainer from '@/components/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FileCode, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { type CheckedState } from "@radix-ui/react-checkbox";

const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('');
  const [text, setText] = useState('');
  const [flags, setFlags] = useState({
    global: true,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    unicode: false,
    sticky: false,
  });
  const [matches, setMatches] = useState<RegExpMatchArray | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [explanation, setExplanation] = useState('');
  
  const { toast } = useToast();
  
  // Define handler functions for checkbox state changes
  const handleFlagChange = (flag: keyof typeof flags) => (checked: CheckedState) => {
    setFlags(prev => ({
      ...prev,
      [flag]: checked === true
    }));
  };

  useEffect(() => {
    // Run regex test whenever pattern, text, or flags change
    testRegex();
  }, [pattern, text, flags]);

  const testRegex = () => {
    setError(null);
    setMatches(null);
    
    if (!pattern || !text) return;
    
    try {
      // Create flag string
      const flagsStr = 
        (flags.global ? 'g' : '') +
        (flags.ignoreCase ? 'i' : '') +
        (flags.multiline ? 'm' : '') +
        (flags.dotAll ? 's' : '') +
        (flags.unicode ? 'u' : '') +
        (flags.sticky ? 'y' : '');
      
      // Create regex and find matches
      const regex = new RegExp(pattern, flagsStr);
      const regexMatches = text.match(regex);
      setMatches(regexMatches);
      
      // Generate simple explanation
      generateExplanation(pattern);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const generateExplanation = (regexPattern: string) => {
    // Simple regex explanation generator
    let explain = 'This pattern ';
    
    // Analyze the regex pattern for common elements
    if (regexPattern.includes('^')) explain += 'starts matching at the beginning of a line. ';
    if (regexPattern.includes('$')) explain += 'matches until the end of a line. ';
    if (regexPattern.includes('.')) explain += 'matches any character (except newline by default). ';
    if (/\d/.test(regexPattern)) explain += 'looks for digits. ';
    if (/\w/.test(regexPattern)) explain += 'matches word characters. ';
    if (/\s/.test(regexPattern)) explain += 'includes whitespace characters. ';
    if (/[a-z]/i.test(regexPattern)) explain += 'matches letters. ';
    if (regexPattern.includes('*')) explain += 'includes characters that appear zero or more times. ';
    if (regexPattern.includes('+')) explain += 'matches characters that appear one or more times. ';
    if (regexPattern.includes('?')) explain += 'makes a character optional. ';
    if (regexPattern.includes('|')) explain += 'looks for alternatives. ';
    
    if (explain === 'This pattern ') explain += 'matches text based on the provided expression.';
    
    setExplanation(explain);
  };

  const copyPattern = () => {
    navigator.clipboard.writeText(pattern);
    toast({
      title: "Copied to clipboard",
      description: "Regex pattern has been copied to your clipboard."
    });
  };

  return (
    <PageContainer
      title="Regex Tester"
      description="Test and debug regular expressions in real-time."
    >
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileCode className="text-devtools-purple h-5 w-5" />
                <h3 className="text-lg font-medium">Pattern</h3>
              </div>
              
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Enter regex pattern, e.g., \w+"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className="font-mono"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={copyPattern}
                  title="Copy pattern"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              {error && (
                <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label>Regular Expression Flags:</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="global" 
                      checked={flags.global} 
                      onCheckedChange={handleFlagChange('global')}
                    />
                    <label htmlFor="global" className="text-sm font-medium leading-none cursor-pointer">
                      Global (g)
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="ignoreCase" 
                      checked={flags.ignoreCase} 
                      onCheckedChange={handleFlagChange('ignoreCase')}
                    />
                    <label htmlFor="ignoreCase" className="text-sm font-medium leading-none cursor-pointer">
                      Ignore case (i)
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="multiline" 
                      checked={flags.multiline} 
                      onCheckedChange={handleFlagChange('multiline')}
                    />
                    <label htmlFor="multiline" className="text-sm font-medium leading-none cursor-pointer">
                      Multiline (m)
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="dotAll" 
                      checked={flags.dotAll} 
                      onCheckedChange={handleFlagChange('dotAll')}
                    />
                    <label htmlFor="dotAll" className="text-sm font-medium leading-none cursor-pointer">
                      Dot all (s)
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="unicode" 
                      checked={flags.unicode} 
                      onCheckedChange={handleFlagChange('unicode')}
                    />
                    <label htmlFor="unicode" className="text-sm font-medium leading-none cursor-pointer">
                      Unicode (u)
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="sticky" 
                      checked={flags.sticky} 
                      onCheckedChange={handleFlagChange('sticky')}
                    />
                    <label htmlFor="sticky" className="text-sm font-medium leading-none cursor-pointer">
                      Sticky (y)
                    </label>
                  </div>
                </div>
              </div>
              
              {explanation && (
                <div className="bg-purple-50 p-3 rounded-md border border-purple-100">
                  <h4 className="font-medium text-sm mb-1 text-purple-700">Pattern Explanation:</h4>
                  <p className="text-sm text-purple-900">{explanation}</p>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <Label htmlFor="textInput">Test String:</Label>
              <Textarea
                id="textInput"
                placeholder="Enter text to test against your regex pattern"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[200px]"
              />
              
              <div>
                <Label className="mb-2 block">Results:</Label>
                {matches ? (
                  <div className="bg-slate-50 p-3 rounded border font-mono text-sm">
                    <div className="font-semibold mb-1">Found {matches.length} match(es):</div>
                    <ul className="list-disc list-inside">
                      {matches.map((match, index) => (
                        <li key={index} className="break-words">{match}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">No matches found.</div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default RegexTester;
