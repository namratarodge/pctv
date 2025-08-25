'use client'
import SettingsInner from "@/components/settings/settingsInner";
import { Suspense } from "react";

export default function Settings() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
   
    <SettingsInner />
    </Suspense>
  );
}
