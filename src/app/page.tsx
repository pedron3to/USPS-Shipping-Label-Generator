import ShippingForm from '@/components/ShippingForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                USPS Shipping Label Generator
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Generate and print USPS shipping labels for your packages.
              </p>
              <div className="mt-8">
                <ShippingForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
