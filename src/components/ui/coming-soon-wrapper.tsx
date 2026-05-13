"use client";

import { toast } from "sonner";

export function ComingSoonWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Feature coming soon!");
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
}
