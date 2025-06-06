import { AddressFields } from "./AddressFields";
import { StepProps } from "@/types/form";



export function FromAddressStep({ form, isLoading }: StepProps  ) {
  return (
    <AddressFields
      key="from-address"
      control={form.control}
      prefix="fromAddress"
      title="From Address"
      namePlaceholder="Your name"
      streetPlaceholder="Your street address"
      emailPlaceholder="your.email@example.com"
      isLoading={isLoading}
      watchState={form.watch('fromAddress.state')}
      setValue={form.setValue}
    />
  );
} 