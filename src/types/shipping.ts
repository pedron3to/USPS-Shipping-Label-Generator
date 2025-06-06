import { z } from 'zod';

export interface Address {
  name: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
  email?: string;
}

export interface PackageDetails {
  weight: number; 
  length: number; 
  width: number; 
  height: number; 
}

export interface ShippingLabel {
  id: string;
  labelUrl: string;
  trackingCode: string;
  rate: {
    service: string;
    price: string;
    currency: string;
  };
}

export type ShippingService = 'First' | 'Priority';

export interface ShippingFormData {
  fromAddress: Address;
  toAddress: Address;
  package: PackageDetails;
}

export const addressSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  street1: z.string().min(1, 'Street address is required'),
  street2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters'),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  country: z.literal('US'),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').optional(),
});

export const packageSchema = z.object({
  weight: z.number().min(0.1, 'Weight must be greater than 0'),
  length: z.number().min(0.1, 'Length must be greater than 0'),
  width: z.number().min(0.1, 'Width must be greater than 0'),
  height: z.number().min(0.1, 'Height must be greater than 0'),
});

export const formSchema = z.object({
  fromAddress: addressSchema,
  toAddress: addressSchema,
  package: packageSchema,
});

export type FormData = z.infer<typeof formSchema>;
export type AddressData = z.infer<typeof addressSchema>;
export type PackageData = z.infer<typeof packageSchema>; 