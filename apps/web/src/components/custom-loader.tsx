import { memo } from "react";

export const CustomLoader = memo(() => {
  return (
    <div className="flex items-center justify-center flex-col h-full">
      <div className="size-20 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
    </div>
  );
});