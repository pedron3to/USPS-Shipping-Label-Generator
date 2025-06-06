import { Button } from '@/components/ui/button';

interface StepProps {
  error: string | null;
  isLoading: boolean;
  labelUrl: string | null;
}

export function ReviewStep({ error, isLoading, labelUrl }: StepProps) {
  return (
    <>
      {error && (
        <div className="rounded-md bg-red-50 p-4" key="review-error">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      <Button
        type="submit"
        disabled={isLoading}
        key="review-submit-btn"
      >
        {isLoading ? 'Generating Label...' : 'Generate Label'}
      </Button>
      {labelUrl && (
        <div className="mt-4" key="review-label">
          <h4 className="text-lg font-medium">Shipping Label Generated!</h4>
          <div className="mt-2 flex flex-col gap-2">
            <a
              href={labelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              View and Print Label
            </a>
            <div className="mt-2 border rounded p-2 bg-gray-50 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={labelUrl}
                alt="Shipping Label"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
} 