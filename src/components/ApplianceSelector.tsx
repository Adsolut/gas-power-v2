
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ApplianceSelectorProps {
  title: string;
  appliances: string[];
  selectedAppliances: string[];
  onSelectionChange: (appliances: string[]) => void;
}

const ApplianceSelector = ({ title, appliances, selectedAppliances, onSelectionChange }: ApplianceSelectorProps) => {
  const handleApplianceChange = (appliance: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedAppliances, appliance]);
    } else {
      onSelectionChange(selectedAppliances.filter(a => a !== appliance));
    }
  };

  return (
    <div className="space-y-3">
      <Label className="font-semibold text-base">{title}:</Label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {appliances.map((appliance) => (
          <div key={appliance} className="flex items-center space-x-2">
            <Checkbox
              id={appliance}
              checked={selectedAppliances.includes(appliance)}
              onCheckedChange={(checked) => handleApplianceChange(appliance, checked as boolean)}
            />
            <Label htmlFor={appliance} className="text-sm cursor-pointer">
              {appliance}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplianceSelector;
