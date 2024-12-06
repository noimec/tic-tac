import { Button } from "@/shared/ui/button";
import { ReactNode } from "react";

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <Button type="submit" className="w-full">
      {children}
    </Button>
  );
}
