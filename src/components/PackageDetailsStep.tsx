import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { StepProps } from "@/types/form";



export function PackageDetailsStep({ form, isLoading }: StepProps) {
  return (
    <div className="space-y-4" key="package-details">
      <h3 className="text-lg font-medium">Package Details</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Weight */}
        <FormField
          control={form.control}
          name="package.weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight (ounces)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  {...field}
                  value={field.value === undefined || Number.isNaN(field.value) ? '' : field.value}
                  onChange={e => {
                    const val = e.target.value;
                    field.onChange(val === '' ? undefined : parseFloat(val));
                  }}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Length */}
        <FormField
          control={form.control}
          name="package.length"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Length (inches)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  {...field}
                  value={field.value === undefined || Number.isNaN(field.value) ? '' : field.value}
                  onChange={e => {
                    const val = e.target.value;
                    field.onChange(val === '' ? undefined : parseFloat(val));
                  }}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Width */}
        <FormField
          control={form.control}
          name="package.width"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Width (inches)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  {...field}
                  value={field.value === undefined || Number.isNaN(field.value) ? '' : field.value}
                  onChange={e => {
                    const val = e.target.value;
                    field.onChange(val === '' ? undefined : parseFloat(val));
                  }}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Height */}
        <FormField
          control={form.control}
          name="package.height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (inches)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.1"
                  {...field}
                  value={field.value === undefined || Number.isNaN(field.value) ? '' : field.value}
                  onChange={e => {
                    const val = e.target.value;
                    field.onChange(val === '' ? undefined : parseFloat(val));
                  }}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
} 