import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  section = false,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  section?: boolean;
}>) {
  if (section) {
    return (
      <section className={cn("container mx-auto max-w-2xl", className)}>
        {children}
      </section>
    );
  }

  return (
    <div className={cn("container mx-auto max-w-2xl", className)}>
      {children}
    </div>
  );
}
