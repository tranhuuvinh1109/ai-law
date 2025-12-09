import { cn } from "@/lib/utils";
import "./Thinking.css";

type ThinkingProps = {
  className?: string;
};

export const Thinking = ({ className }: ThinkingProps) => {
  return (
    <div className={cn("loader rounded-full rounded-tl-none bg-white px-4 py-5", className)}>
      <span className="loader__element"></span>
      <span className="loader__element"></span>
      <span className="loader__element"></span>
    </div>
  );
};
