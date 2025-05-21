import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TaxHarvestingProvider } from '@/context/TaxHarvestingContext';
import NotFound from "@/pages/not-found";
import TaxLossHarvesting from "@/pages/TaxLossHarvesting";

function Router() {
  return (
    <Switch>
      <Route path="/" component={TaxLossHarvesting}/>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TaxHarvestingProvider>
          <Toaster />
          <Router />
        </TaxHarvestingProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
