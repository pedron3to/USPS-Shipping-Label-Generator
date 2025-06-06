// components/AddressFields.tsx
import { Control, FieldPath } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AddressCombobox } from '@/components/AddressCombobox';
import { FormData } from '@/types/shipping';

interface AddressFieldsProps {
  control: Control<FormData>;
  prefix: 'fromAddress' | 'toAddress';
  title: string;
  namePlaceholder: string;
  streetPlaceholder: string;
  emailPlaceholder: string;
  isLoading: boolean;
  watchState: string;
  setValue: (name: FieldPath<FormData>, value: any) => void;
}

export function AddressFields({
  control,
  prefix,
  title,
  namePlaceholder,
  streetPlaceholder,
  emailPlaceholder,
  isLoading,
  watchState,
  setValue,
}: AddressFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Name */}
        <FormField
          control={control}
          name={`${prefix}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder={namePlaceholder} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Street Address */}
        <FormField
          control={control}
          name={`${prefix}.street1`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder={streetPlaceholder} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Street 2 */}
        <FormField
          control={control}
          name={`${prefix}.street2`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
              <FormControl>
                <Input type="text" {...field} placeholder="Apt, Suite, Unit, etc." value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* State */}
        <FormField
          control={control}
          name={`${prefix}.state`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <AddressCombobox
                  type="state"
                  value={field.value ?? ''}
                  onValueChange={value => {
                    setValue(`${prefix}.city`, '');
                    setValue(`${prefix}.state`, value);
                  }}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* City */}
        <FormField
          control={control}
          name={`${prefix}.city`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <AddressCombobox
                  type="city"
                  value={field.value ?? ''}
                  onValueChange={field.onChange}
                  stateValue={watchState}
                  disabled={isLoading || !watchState}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* ZIP */}
        <FormField
          control={control}
          name={`${prefix}.zip`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ZIP Code</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  {...field}
                  value={field.value ?? ''}
                  placeholder="12345"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Phone */}
        <FormField
          control={control}
          name={`${prefix}.phone`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone (optional)</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  inputMode="tel"
                  maxLength={14}
                  {...field}
                  value={field.value ?? ''}
                  placeholder="(555) 123-4567"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Email */}
        <FormField
          control={control}
          name={`${prefix}.email`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (optional)</FormLabel>
              <FormControl>
                <Input type="email" {...field} value={field.value ?? ''} placeholder={emailPlaceholder} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}