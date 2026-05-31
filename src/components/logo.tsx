import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="h-10 w-10 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow">
        <Briefcase className="h-5 w-5 text-primary-foreground" />
      </div>
      {showText && (
        <div>
          <p className="text-xl font-extrabold tracking-tight leading-none">
            Job<span className="text-gradient">Now</span>
          </p>
          <p className="text-[10px] text-muted-foreground tracking-widest uppercase mt-0.5">
            Hire. Work. Earn.
          </p>
        </div>
      )}
    </div>
  );
}
