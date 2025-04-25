'use client'; // This is required!

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error); // You can also log this to a monitoring service
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h2 className="text-4xl font-bold">500 - Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}