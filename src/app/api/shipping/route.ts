import { NextResponse } from 'next/server';
import { createShippingLabel, validateAddress } from '@/lib/easypost';
import { type FormData } from '@/types/shipping';

export async function POST(request: Request) {
  try {
    const data: FormData = await request.json();

    // Validate addresses first
    const [fromValid, toValid] = await Promise.all([
      validateAddress(data.fromAddress),
      validateAddress(data.toAddress),
    ]);

    if (!fromValid || !toValid) {
      return NextResponse.json(
        { error: 'One or more addresses are invalid' },
        { status: 400 }
      );
    }

    // Create shipping label
    const label = await createShippingLabel(
      data.fromAddress,
      data.toAddress,
      data.package,
    );

    return NextResponse.json(label);
  } catch (error) {
    console.error('Error in shipping API route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
} 