import { Button } from "@/shared/ui/button";
import { ReactNode } from "react";

export function SubmitButton({
  children,
  isPending,
}: {
  children: ReactNode;
  isPending: boolean;
}) {
  return (
    <Button type="submit" disabled={isPending} className="w-full">
      {children}
    </Button>
  );
}
