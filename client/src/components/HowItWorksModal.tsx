import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function HowItWorksModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-blue-500 p-0 h-auto font-normal text-sm">
          How it works?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">How Tax Loss Harvesting Works</DialogTitle>
          <DialogDescription>
            Learn how to optimize your tax liability through tax loss harvesting
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-neutral-700 text-sm">
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <p>Use your capital gains for FY 2024-25 to its maximum potential</p>
          </div>
          
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <p>Sell assets you plan to sell soon at a loss to reduce your tax liability</p>
          </div>
          
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <p>Pre-tip: Experiment with different combinations of your holdings to optimize your tax savings</p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-md mt-6">
            <h3 className="font-medium mb-2">What is Tax Loss Harvesting?</h3>
            <p>
              Tax loss harvesting is a strategy where you sell investments that have experienced losses to offset capital gains that you may have realized from selling other investments at a profit. This can help reduce your overall tax burden.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-md">
            <h3 className="font-medium mb-2">How to Use This Tool</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Review your crypto holdings in the table below</li>
              <li>Select assets that are showing losses (marked in red)</li>
              <li>See how your capital gains tax liability changes in the "After Harvesting" card</li>
              <li>Export your report to share with your tax advisor</li>
            </ol>
          </div>
          
          <div className="p-4 bg-amber-50 rounded-md border border-amber-200">
            <h3 className="font-medium mb-2 text-amber-800">Important Considerations</h3>
            <ul className="list-disc pl-5 space-y-1 text-amber-700">
              <li>Be aware of wash sale rules in your jurisdiction</li>
              <li>Consult with a tax professional before implementing any strategy</li>
              <li>Tax laws vary by country and may change over time</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}