"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { currentUser } from "@/lib/mock-data";

const NAV = [
  { href: "/", label: "Dashboard", icon: "◧" },
  { href: "/buildings", label: "Zgrade", icon: "⌂" },
  { href: "/events", label: "Dnevnik", icon: "≡" },
  { href: "/obligations", label: "Servisi i obnove", icon: "◷" },
  { href: "/documents", label: "Dokumenti", icon: "▤" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-[var(--border)] bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-[var(--border)] px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--primary)] text-white font-bold">A</div>
        <div>
          <div className="text-sm font-semibold tracking-tight">AlfaUpravnik</div>
          <div className="text-[11px] text-[var(--muted)]">Faza 1A · Mock</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {NAV.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mb-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="w-4 text-center text-[15px] leading-none">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-[var(--border)] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
            {currentUser.firstName[0]}
            {currentUser.lastName[0]}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">
              {currentUser.firstName} {currentUser.lastName}
            </div>
            <div className="truncate text-xs text-[var(--muted)]">{currentUser.companyName}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description ? <p className="mt-1 text-sm text-[var(--muted)]">{description}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}
