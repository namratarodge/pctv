import React, { Suspense } from 'react';
import Account from '@/components/account/MainAccount';

export default function AccountPage() {
  return (
    <Suspense fallback={<div>Loading account page...</div>}>
      <Account />
    </Suspense>
  );
}