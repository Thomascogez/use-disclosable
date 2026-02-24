import type { DisclosableInjectedProps } from "use-disclosable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useEffect, useRef } from "react";

type LoadingDialogProps = {
  message?: string;
} & DisclosableInjectedProps;

export const LoadingDialog: React.FC<LoadingDialogProps> = ({
  message = "Loading...",
  isDisclosableOpen,
  closeDisclosable
}) => {
  const timeoutRef = useRef<number | null>(null);
  useEffect(() => {
    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      closeDisclosable();
    }, 2000);
  }, [closeDisclosable])

  return (
    <Dialog open={isDisclosableOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{message}</DialogTitle>
          <DialogDescription>
            Please wait while we process your request...
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
