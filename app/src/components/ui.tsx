import * as React from "react";
import Link from "next/link";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[var(--border)] rounded-xl shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: DivProps) {
  return <div className={cn("px-5 pt-5 pb-3 flex items-start justify-between gap-3", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-base font-semibold tracking-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-[var(--muted)]", className)} {...props} />;
}

export function CardBody({ className, ...props }: DivProps) {
  return <div className={cn("px-5 pb-5", className)} {...props} />;
}

type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger" | "info";
export function Badge({ tone = "neutral", className, children }: { tone?: BadgeTone; className?: string; children: React.ReactNode }) {
  const tones: Record<BadgeTone, string> = {
    neutral: "bg-gray-100 text-gray-700",
    primary: "bg-blue-50 text-blue-700",
    success: "bg-green-50 text-green-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-red-50 text-red-700",
    info: "bg-indigo-50 text-indigo-700",
  };
  return (
    <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium", tones[tone], className)}>
      {children}
    </span>
  );
}

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
};
export function Button({ className, variant = "secondary", size = "md", ...props }: BtnProps) {
  const variants = {
    primary: "bg-[var(--primary)] text-white hover:bg-blue-700 border border-transparent",
    secondary: "bg-white text-gray-800 hover:bg-gray-50 border border-[var(--border)]",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 border border-transparent",
    danger: "bg-white text-red-600 hover:bg-red-50 border border-red-200",
  };
  const sizes = { sm: "h-8 px-3 text-xs", md: "h-9 px-4 text-sm" };
  return (
    <button
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md font-medium transition-colors disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-md border border-[var(--border)] bg-white px-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100",
        className
      )}
      {...props}
    />
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = "neutral",
  href,
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  tone?: BadgeTone;
  href?: string;
}) {
  const accent: Record<BadgeTone, string> = {
    neutral: "bg-gray-50 text-gray-700",
    primary: "bg-blue-50 text-blue-700",
    success: "bg-green-50 text-green-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-red-50 text-red-700",
    info: "bg-indigo-50 text-indigo-700",
  };
  const inner = (
    <div className="flex items-start justify-between">
      <div>
        <div className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">{label}</div>
        <div className="mt-1.5 text-3xl font-semibold tracking-tight">{value}</div>
        {hint ? <div className="mt-1 text-xs text-[var(--muted)]">{hint}</div> : null}
      </div>
      <span className={cn("inline-flex h-8 w-8 items-center justify-center rounded-md", accent[tone])}>●</span>
    </div>
  );
  if (href) {
    return (
      <Link href={href} className="block transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-xl">
        <Card className="p-5">{inner}</Card>
      </Link>
    );
  }
  return <Card className="p-5">{inner}</Card>;
}

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}
export function TH({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={cn("bg-gray-50 border-b border-[var(--border)] px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-[var(--muted)]", className)}>
      {children}
    </th>
  );
}
export function TD({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn("border-b border-[var(--border)] px-4 py-3 align-middle", className)}>{children}</td>;
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-white px-6 py-10 text-center">
      <div className="text-sm font-medium">{title}</div>
      {description ? <div className="mt-1 text-sm text-[var(--muted)]">{description}</div> : null}
    </div>
  );
}

export { cn };
