'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { formSchema, type FormData } from '@/types/shipping';
import { FromAddressStep } from './FromAddressStep';
import { ToAddressStep } from './ToAddressStep';
import { PackageDetailsStep } from './PackageDetailsStep';
import { ReviewStep } from './ReviewStep';
import { User, MapPin, Package, CheckCircle } from "lucide-react";


const STEPS = [
  { id: 'from', label: 'From Address', icon: User },
  { id: 'to', label: 'To Address', icon: MapPin },
  { id: 'package', label: 'Package Details', icon: Package },
  { id: 'review', label: 'Review & Submit', icon: CheckCircle },
];

export default function ShippingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [labelUrl, setLabelUrl] = useState<string | null>(null);

  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromAddress: {
        name: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zip: '',
        country: 'US',
      },
      toAddress: {
        name: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zip: '',
        country: 'US',
      },
    },
  });

  // Helper to go to next/prev step
  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const validateAddresses = async (fromAddress: FormData['fromAddress'], toAddress: FormData['toAddress']) => {
    const [fromResponse, toResponse] = await Promise.all([
      fetch('/api/validate-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fromAddress),
      }),
      fetch('/api/validate-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toAddress),
      }),
    ]);

    if (!fromResponse.ok || !toResponse.ok) {
      throw new Error('Failed to validate addresses');
    }

    const [fromData, toData] = await Promise.all([
      fromResponse.json(),
      toResponse.json(),
    ]);

    return [fromData.isValid, toData.isValid];
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    setLabelUrl(null);

    try {
      const [fromValid, toValid] = await validateAddresses(data.fromAddress, data.toAddress);

      if (!fromValid || !toValid) {
        throw new Error('One or more addresses are invalid');
      }

      const response = await fetch('/api/shipping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create shipping label');
      }

      const label = await response.json();
      setLabelUrl(label.labelUrl);
      setCurrentStep(STEPS.length - 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = async () => {
    const fieldsToValidate = stepValidationFields[currentStep as keyof typeof stepValidationFields] ?? [];
    const valid = await form.trigger(fieldsToValidate);
    if (valid) nextStep();
  };

  // Step renderers array
  const stepRenderers = [
    <FromAddressStep form={form} isLoading={isLoading} key="from-address" />,
    <ToAddressStep form={form} isLoading={isLoading} key="to-address" />,
    <PackageDetailsStep form={form} isLoading={isLoading} key="package-details" />,
    <ReviewStep error={error} isLoading={isLoading} labelUrl={labelUrl} key="review-step" />,
  ];

  const progressValue = ((currentStep + 1) / STEPS.length) * 100;

  const stepValidationFields = {
    0: ['fromAddress.name', 'fromAddress.street1', 'fromAddress.city', 'fromAddress.state', 'fromAddress.zip'] as const,
    1: ['toAddress.name', 'toAddress.street1', 'toAddress.city', 'toAddress.state', 'toAddress.zip'] as const,
    2: ['package.weight', 'package.length', 'package.width', 'package.height'] as const,
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        onKeyDown={e => {
          if (e.key === "Enter" && currentStep !== STEPS.length - 1) {
            e.preventDefault();
          }
        }}
      >
        {/* Progress bar and step labels */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center text-xs font-medium ${idx === currentStep ? 'text-primary' : 'text-muted-foreground'}`}
                  style={{ width: `${100 / STEPS.length}%`, textAlign: 'center' }}
                >
                  <Icon className="mb-1 h-5 w-5" />
                  {step.label}
                </div>
              );
            })}
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>

        {stepRenderers[currentStep]}

        <div className="flex gap-2 mt-4 justify-end">
          {currentStep > 0 && currentStep < STEPS.length && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={isLoading}
            >
              Back
            </Button>
          )}
          {currentStep < STEPS.length - 1 && (
            <Button
              type="button"
              onClick={handleNextStep}
              disabled={isLoading}
            >
              Next
            </Button>
          )}
          
        </div>
      </form>
    </Form>
  );
}