"use client";

import { toast } from "sonner";

export function ComingSoonWrapper({
  children,
  className,
  message = "Feature coming soon!",
}: {
  children: React.ReactNode;
  className?: string;
  message?: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info(message);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
}
