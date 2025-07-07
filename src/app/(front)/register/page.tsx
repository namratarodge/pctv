import { Suspense } from "react";
import MainRegister from "@/components/register/Main";

export default function Register() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainRegister />
    </Suspense>
  );
}
