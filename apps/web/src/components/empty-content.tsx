import { FileWarning, type LucideProps } from "lucide-react";
import { cloneElement, memo } from "react";
import { cn } from "@/lib/utils";

export const EmptyContent = memo(({ 
  message, 
  className,
  icon = <FileWarning className="size-6 text-gray-500" />,
  iconClassName,
}: { 
  message: string, 
  className?: string,
  icon?: React.ReactElement<LucideProps>,
  iconClassName?: string,
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center h-full gap-2", className)}  >
      {icon && cloneElement(icon, { className: cn("size-6 text-gray-500", iconClassName) })}
      <p className="text-gray-500">{message}</p>
    </div>
  );
})