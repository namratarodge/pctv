import MainRegister from "@/components/register/Main";
import { Suspense } from "react";

export default function Register() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainRegister />
    </Suspense>
  );
}
