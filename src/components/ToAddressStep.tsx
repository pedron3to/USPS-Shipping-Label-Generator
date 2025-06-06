import { AddressFields } from "./AddressFields";
import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/shipping";

interface StepProps {
  form: UseFormReturn<FormData>;
  isLoading: boolean;
}

export function ToAddressStep({ form, isLoading }: StepProps) {
  return (
    <AddressFields
      key="to-address"
      control={form.control}
      prefix="toAddress"
      title="To Address"
      namePlaceholder="Recipient's name"
      streetPlaceholder="Recipient's street address"
      emailPlaceholder="recipient.email@example.com"
      isLoading={isLoading}
      watchState={form.watch('toAddress.state')}
      setValue={form.setValue}
    />
  );
} 