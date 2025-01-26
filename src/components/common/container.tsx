import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  section = false,
}: {
  children: React.ReactNode;
  className?: string;
  section?: boolean;
}) {
  if (section) {
    return (
      <section className={cn("container mx-auto max-w-xl", className)}>
        {children}
      </section>
    );
  }

  return (
    <div className={cn("container mx-auto max-w-xl", className)}>
      {children}
    </div>
  );
}
