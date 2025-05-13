
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import PageContainer from '@/components/PageContainer';
import { Copy } from 'lucide-react';
import { type CheckedState } from "@radix-ui/react-checkbox";

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [strength, setStrength] = useState(0);
  
  // Define handler functions to fix the type mismatch
  const handleUppercaseChange = (checked: CheckedState) => {
    setUppercase(checked === true);
  };
  
  const handleLowercaseChange = (checked: CheckedState) => {
    setLowercase(checked === true);
  };
  
  const handleNumbersChange = (checked: CheckedState) => {
    setNumbers(checked === true);
  };
  
  const handleSymbolsChange = (checked: CheckedState) => {
    setSymbols(checked === true);
  };
  
  const generatePassword = () => {
    let charset = '';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+{}[];:<>,.?/';
    
    // Ensure at least one character set is selected
    if (charset === '') {
      setPassword('');
      toast.error("Please select at least one character type");
      return;
    }
    
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(result);
    calculateStrength(result);
  };
  
  const calculateStrength = (pass: string) => {
    // Simple strength calculation based on length and character types
    let score = 0;
    
    // Length factor (up to 40 points)
    score += Math.min(40, pass.length * 2);
    
    // Character type variety (up to 60 points)
    if (/[A-Z]/.test(pass)) score += 15;
    if (/[a-z]/.test(pass)) score += 15;
    if (/[0-9]/.test(pass)) score += 15;
    if (/[^A-Za-z0-9]/.test(pass)) score += 15;
    
    setStrength(score);
  };
  
  const getStrengthLabel = (): string => {
    if (strength < 40) return 'Weak';
    if (strength < 70) return 'Moderate';
    return 'Strong';
  };
  
  const getStrengthColor = (): string => {
    if (strength < 40) return 'bg-red-500';
    if (strength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard");
    }
  };
  
  // Generate password on mount and when settings change
  useEffect(() => {
    generatePassword();
  }, [length, uppercase, lowercase, numbers, symbols, autoRefresh]);
  
  return (
    <PageContainer
      title="Password Generator"
      description="Create strong, secure passwords with customizable options."
    >
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="flex-1 flex items-center">
              <div className="text-3xl font-mono bg-gray-100 p-4 rounded-md overflow-x-auto whitespace-nowrap flex-1">
                {password || 'Select options to generate a password'}
              </div>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="ml-3 flex-shrink-0" 
              onClick={copyToClipboard}
              disabled={!password}
            >
              <Copy size={18} />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Password Options</h3>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="font-medium">Length: {length}</label>
              </div>
              <Slider 
                defaultValue={[16]} 
                min={6} 
                max={64} 
                step={1}
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
                className="mb-4"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>6</span>
                <span>20</span>
                <span>40</span>
                <span>64</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="uppercase" checked={uppercase} onCheckedChange={handleUppercaseChange} />
                <label htmlFor="uppercase" className="text-sm font-medium leading-none cursor-pointer">
                  Uppercase (A-Z)
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="lowercase" checked={lowercase} onCheckedChange={handleLowercaseChange} />
                <label htmlFor="lowercase" className="text-sm font-medium leading-none cursor-pointer">
                  Lowercase (a-z)
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="numbers" checked={numbers} onCheckedChange={handleNumbersChange} />
                <label htmlFor="numbers" className="text-sm font-medium leading-none cursor-pointer">
                  Numbers (0-9)
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="symbols" checked={symbols} onCheckedChange={handleSymbolsChange} />
                <label htmlFor="symbols" className="text-sm font-medium leading-none cursor-pointer">
                  Symbols (!@#$%^&*)
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Password Strength</h3>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span>{getStrengthLabel()}</span>
                <span>{strength}/100</span>
              </div>
              <Progress value={strength} className={`h-2 ${getStrengthColor()}`} />
            </div>
            
            <div className="space-y-4">
              <Button 
                className="w-full" 
                onClick={generatePassword}
              >
                Generate New Password
              </Button>
              
              <div className="flex items-center justify-between">
                <label htmlFor="auto-refresh" className="text-sm font-medium">
                  Auto-refresh when changing options
                </label>
                <Switch 
                  id="auto-refresh" 
                  checked={autoRefresh} 
                  onCheckedChange={setAutoRefresh} 
                />
              </div>
            </div>
            
            {!autoRefresh && (
              <p className="text-xs text-gray-500 mt-4">
                With auto-refresh disabled, click "Generate New Password" to update
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default PasswordGenerator;
