import { NextResponse } from 'next/server';
import { validateAddress } from '@/lib/easypost';
import { type Address } from '@/types/shipping';

export async function POST(request: Request) {
  try {
    const address: Address = await request.json();
    const isValid = await validateAddress(address);

    console.log(isValid);

    return NextResponse.json({ isValid });
  } catch (error) {
    console.error('Error validating address:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    );
  }
} 