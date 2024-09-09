import Locked from "@/components/svg/Locked";
import { memo } from "react";

function LockedPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <Locked className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Verification Required
        </h1>
        <p className="mt-4 text-muted-foreground">
          To access the full features of our app, you must first complete the
          verification process. This helps us ensure the security and integrity
          of our platform.
        </p>
      </div>
    </div>
  );
}

export default memo(LockedPage);
