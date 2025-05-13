
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download } from 'lucide-react';
import PageContainer from '@/components/PageContainer';

type UUIDVersion = 'v1' | 'v4';

const UUIDGenerator: React.FC = () => {
  const [uuid, setUuid] = useState('');
  const [version, setVersion] = useState<UUIDVersion>('v4');
  const [batchSize, setBatchSize] = useState<number>(10);
  const [batchUuids, setBatchUuids] = useState<string[]>([]);

  const generateUUID = () => {
    // Since we can't create true v1 UUIDs in the browser without extra libraries
    // we'll simulate it for demo purposes with a timestamp prefix
    if (version === 'v1') {
      const now = new Date();
      const timestampHex = Math.floor(now.getTime() / 1000).toString(16);
      const rest = crypto.randomUUID().slice(8);
      const simulatedV1 = `${timestampHex.padStart(8, '0')}-${rest}`;
      return simulatedV1;
    } else {
      return crypto.randomUUID();
    }
  };

  const handleGenerateUUID = () => {
    const newUuid = generateUUID();
    setUuid(newUuid);
  };

  const handleGenerateBatch = () => {
    const newBatch: string[] = [];
    for (let i = 0; i < batchSize; i++) {
      newBatch.push(generateUUID());
    }
    setBatchUuids(newBatch);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("UUID copied to clipboard");
  };

  const copyBatchToClipboard = () => {
    navigator.clipboard.writeText(batchUuids.join('\n'));
    toast.success(`${batchUuids.length} UUIDs copied to clipboard`);
  };

  const downloadBatch = (format: 'txt' | 'csv') => {
    let content = '';
    let filename = '';
    let mimeType = '';

    if (format === 'txt') {
      content = batchUuids.join('\n');
      filename = 'uuids.txt';
      mimeType = 'text/plain';
    } else {
      // CSV format with header
      content = 'uuid\n' + batchUuids.join('\n');
      filename = 'uuids.csv';
      mimeType = 'text/csv';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${batchUuids.length} UUIDs as ${format.toUpperCase()}`);
  };

  // Generate UUID on mount and when version changes
  useEffect(() => {
    handleGenerateUUID();
  }, [version]);

  return (
    <PageContainer 
      title="UUID Generator" 
      description="Create universally unique identifiers (UUIDs) for distributed systems and databases."
    >
      <Tabs defaultValue="single" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="single">Single UUID</TabsTrigger>
          <TabsTrigger value="batch">Batch Generator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="single">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  UUID Version
                </label>
                <Select 
                  value={version} 
                  onValueChange={(value) => setVersion(value as UUIDVersion)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select UUID version" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v4">Version 4 (Random)</SelectItem>
                    <SelectItem value="v1">Version 1 (Time-based)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Generated UUID
                </label>
                <div className="flex space-x-2">
                  <Input value={uuid} readOnly className="font-mono" />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => copyToClipboard(uuid)}
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              </div>

              <Button className="w-full" onClick={handleGenerateUUID}>
                Generate New UUID
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">About UUID Versions</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Version 4 (Random)</h4>
                  <p className="text-sm text-gray-600">
                    Generated using random numbers. Most commonly used due to its simplicity 
                    and low collision probability.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Version 1 (Time-based)</h4>
                  <p className="text-sm text-gray-600">
                    Created from the current timestamp and the MAC address of the computer. 
                    Note: In this browser implementation, we simulate V1 UUIDs for demonstration.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="batch">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Batch Size
                </label>
                <div className="flex space-x-2 mb-4">
                  <Input 
                    type="number" 
                    min={1} 
                    max={100} 
                    value={batchSize} 
                    onChange={(e) => setBatchSize(Number(e.target.value))}
                  />
                  <Button onClick={handleGenerateBatch}>
                    Generate
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Generate 1-100 UUIDs at once</p>
              </div>

              {batchUuids.length > 0 && (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Generated UUIDs ({batchUuids.length})
                    </label>
                    <div className="bg-gray-100 p-4 rounded-md h-60 overflow-y-auto font-mono text-xs">
                      {batchUuids.map((id, index) => (
                        <div key={index} className="mb-1 flex items-center justify-between">
                          <span>{id}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-2"
                            onClick={() => copyToClipboard(id)}
                          >
                            <Copy size={12} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={copyBatchToClipboard}>
                      <Copy size={16} className="mr-2" />
                      Copy All
                    </Button>
                    <Button variant="outline" onClick={() => downloadBatch('txt')}>
                      <Download size={16} className="mr-2" />
                      Download as TXT
                    </Button>
                    <Button variant="outline" onClick={() => downloadBatch('csv')}>
                      <Download size={16} className="mr-2" />
                      Download as CSV
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default UUIDGenerator;
