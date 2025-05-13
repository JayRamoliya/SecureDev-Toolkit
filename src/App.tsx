
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarNav from "./components/SidebarNav";
import Index from "./pages/Index";
import PasswordGenerator from "./pages/PasswordGenerator";
import HashGenerator from "./pages/HashGenerator";
import UUIDGenerator from "./pages/UUIDGenerator";
import JWTDecoder from "./pages/JWTDecoder";
import RegexTester from "./pages/RegexTester";
import JSONFormatter from "./pages/JSONFormatter";
import HTMLCSSJSMinifier from "./pages/HTMLCSSJSMinifier";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex h-screen w-full">
          <SidebarNav />
          <div className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/password-generator" element={<PasswordGenerator />} />
              <Route path="/hash-generator" element={<HashGenerator />} />
              <Route path="/uuid-generator" element={<UUIDGenerator />} />
              <Route path="/jwt-decoder" element={<JWTDecoder />} />
              <Route path="/regex-tester" element={<RegexTester />} />
              <Route path="/json-formatter" element={<JSONFormatter />} />
              <Route path="/minifier" element={<HTMLCSSJSMinifier />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
