"use client";
import Link from "next/link";
import { useState, use } from "react";
import { PageHeader } from "@/components/sidebar";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  EmptyState,
  Input,
  Table,
  TD,
  TH,
} from "@/components/ui";
import {
  getBuilding,
  getUnits,
  getDocuments,
  getEvents,
  getObligations,
  daysUntil,
  urgencyLevel,
  formatDate,
  formatDateTime,
  formatBytes,
  type EventStatus,
  type EventPriority,
} from "@/lib/mock-data";

type Tab = "info" | "units" | "documents" | "events" | "obligations";

const TABS: { key: Tab; label: string }[] = [
  { key: "info", label: "Informacije" },
  { key: "units", label: "Jedinice" },
  { key: "documents", label: "Dokumenti" },
  { key: "events", label: "Dnevnik" },
  { key: "obligations", label: "Servisi i obnove" },
];

export default function BuildingDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const buildingId = Number(id);
  const [tab, setTab] = useState<Tab>("info");
  const b = getBuilding(buildingId);

  if (!b) {
    return (
      <EmptyState title="Zgrada nije pronađena" description="Proveri link ili se vrati na listu zgrada." />
    );
  }

  const units = getUnits(buildingId);
  const docs = getDocuments(buildingId);
  const evts = getEvents(buildingId);
  const obs = getObligations(buildingId);

  return (
    <>
      <div className="mb-4">
        <Link href="/buildings" className="text-sm text-blue-600 hover:underline">
          ← Sve zgrade
        </Link>
      </div>

      <PageHeader
        title={b.name}
        description={`${b.address}, ${b.postalCode} ${b.city}`}
        actions={
          <>
            <Button variant="secondary">Izmeni</Button>
            <Button variant="primary">+ Novi događaj</Button>
          </>
        }
      />

      <div className="mb-5 flex flex-wrap gap-1.5">
        {b.isArchived ? <Badge tone="neutral">Arhivirana</Badge> : <Badge tone="success">Aktivna</Badge>}
        <Badge tone="neutral">{b.unitCount} jedinica</Badge>
        <Badge tone="neutral">{b.entranceCount} ulaz{b.entranceCount > 1 ? "a" : ""}</Badge>
        {b.hasElevator ? <Badge tone="info">Lift</Badge> : null}
        {b.hasCentralHeating ? <Badge tone="info">Centralno grejanje</Badge> : null}
        {b.constructionYear ? <Badge tone="neutral">Izgrađena {b.constructionYear}.</Badge> : null}
      </div>

      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-[var(--border)]">
        {TABS.map((t) => {
          const count =
            t.key === "units" ? units.length :
            t.key === "documents" ? docs.length :
            t.key === "events" ? evts.length :
            t.key === "obligations" ? obs.length :
            null;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative -mb-px flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "border-[var(--primary)] text-[var(--primary)]"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {t.label}
              {count !== null ? (
                <span className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs ${active ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                  {count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {tab === "info" && <InfoTab building={b} />}
      {tab === "units" && <UnitsTab units={units} />}
      {tab === "documents" && <DocumentsTab docs={docs} />}
      {tab === "events" && <EventsTab events={evts} />}
      {tab === "obligations" && <ObligationsTab obligations={obs} />}
    </>
  );
}

function InfoTab({ building }: { building: ReturnType<typeof getBuilding> }) {
  if (!building) return null;
  const rows: [string, React.ReactNode][] = [
    ["Naziv", building.name],
    ["Adresa", building.address],
    ["Grad / PB", `${building.city} · ${building.postalCode}`],
    ["Broj ulaza", building.entranceCount],
    ["Broj jedinica", building.unitCount],
    ["Godina izgradnje", building.constructionYear ?? "—"],
    ["Lift", building.hasElevator ? "Da" : "Ne"],
    ["Centralno grejanje", building.hasCentralHeating ? "Da" : "Ne"],
    ["Status", building.isArchived ? "Arhivirana" : "Aktivna"],
    ["Napomene", building.notes ?? "—"],
  ];
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader><CardTitle>Osnovni podaci</CardTitle></CardHeader>
          <CardBody className="pt-0">
            <dl className="grid grid-cols-1 divide-y divide-[var(--border)] text-sm md:grid-cols-2 md:divide-y-0">
              {rows.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2.5 md:odd:border-r md:odd:border-[var(--border)] md:odd:pr-6">
                  <dt className="text-[var(--muted)]">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </CardBody>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader><CardTitle>Brze akcije</CardTitle></CardHeader>
          <CardBody className="pt-0 space-y-2">
            <Button className="w-full justify-center">+ Dodaj jedinicu</Button>
            <Button className="w-full justify-center">+ Upload dokument</Button>
            <Button className="w-full justify-center">+ Nova obaveza</Button>
            <Button variant="danger" className="w-full justify-center">Arhiviraj zgradu</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function UnitsTab({ units }: { units: ReturnType<typeof getUnits> }) {
  const [q, setQ] = useState("");
  const filtered = units.filter((u) => {
    if (!q) return true;
    const s = q.toLowerCase();
    return (
      u.unitNumber.toLowerCase().includes(s) ||
      `${u.ownerFirstName} ${u.ownerLastName}`.toLowerCase().includes(s) ||
      (u.ownerEmail ?? "").toLowerCase().includes(s)
    );
  });

  if (units.length === 0) {
    return <EmptyState title="Jedinice još nisu unete" description="Dodaj prvu jedinicu da započneš evidenciju vlasnika." />;
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="max-w-sm flex-1">
          <Input placeholder="Pretraži jedinice ili vlasnike…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <Button variant="primary">+ Nova jedinica</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <TH>Broj</TH>
            <TH>Tip</TH>
            <TH>Sprat</TH>
            <TH>m²</TH>
            <TH>Vlasnik</TH>
            <TH>Kontakt</TH>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <TD><span className="font-medium">{u.unitNumber}</span></TD>
              <TD><Badge tone={u.unitType === "stan" ? "primary" : "neutral"}>{u.unitType}</Badge></TD>
              <TD>{u.floor ?? "—"}</TD>
              <TD>{u.areaSqm.toFixed(1)}</TD>
              <TD>
                <div className="font-medium">{u.ownerFirstName} {u.ownerLastName}</div>
                {u.ownerJmbgPib ? <div className="text-xs text-[var(--muted)]">{u.ownerJmbgPib}</div> : null}
              </TD>
              <TD>
                <div>{u.ownerPhone ?? "—"}</div>
                {u.ownerEmail ? <div className="text-xs text-[var(--muted)]">{u.ownerEmail}</div> : null}
              </TD>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

function DocumentsTab({ docs }: { docs: ReturnType<typeof getDocuments> }) {
  const [cat, setCat] = useState<string>("all");
  const categories = ["all", "ugovor", "projekat", "garancija", "resenje", "polisa", "ostalo"];
  const filtered = docs.filter((d) => cat === "all" || d.category === cat);

  if (docs.length === 0) {
    return <EmptyState title="Nema upload-ovanih dokumenata" description="Dodaj ugovore, polise, projekte i rešenja." />;
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                cat === c
                  ? "border-[var(--primary)] bg-blue-50 text-[var(--primary)]"
                  : "border-[var(--border)] bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {c === "all" ? "Sve" : c}
            </button>
          ))}
        </div>
        <Button variant="primary">+ Upload dokument</Button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {filtered.map((d) => {
          const expiresDays = d.expiresAt ? daysUntil(d.expiresAt) : null;
          const expTone =
            expiresDays === null ? "neutral" :
            expiresDays < 0 ? "danger" :
            expiresDays <= 30 ? "warning" : "success";
          return (
            <Card key={d.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                  ▤
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate font-medium">{d.title}</div>
                      <div className="mt-0.5 text-xs text-[var(--muted)]">{d.fileName} · {formatBytes(d.fileSizeBytes)}</div>
                    </div>
                    <Badge tone="neutral">{d.category}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-[var(--muted)]">Datum: {formatDate(d.documentDate)}</span>
                    {d.expiresAt ? (
                      <Badge tone={expTone as "neutral" | "danger" | "warning" | "success"}>
                        Ističe: {formatDate(d.expiresAt)}
                      </Badge>
                    ) : null}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}

function EventsTab({ events }: { events: ReturnType<typeof getEvents> }) {
  const [status, setStatus] = useState<EventStatus | "all">("all");
  const filtered = events
    .filter((e) => status === "all" || e.status === status)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  if (events.length === 0) {
    return <EmptyState title="Dnevnik je prazan" description="Dodaj prvu stavku u evidenciju događaja." />;
  }

  const statusFilters: { key: EventStatus | "all"; label: string }[] = [
    { key: "all", label: "Svi" },
    { key: "otvoren", label: "Otvoreni" },
    { key: "u_toku", label: "U toku" },
    { key: "zatvoren", label: "Zatvoreni" },
  ];

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5">
          {statusFilters.map((s) => (
            <button
              key={s.key}
              onClick={() => setStatus(s.key)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                status === s.key
                  ? "border-[var(--primary)] bg-blue-50 text-[var(--primary)]"
                  : "border-[var(--border)] bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <Button variant="primary">+ Novi događaj</Button>
      </div>

      <div className="space-y-3">
        {filtered.map((e) => {
          const statusTone = e.status === "otvoren" ? "warning" : e.status === "u_toku" ? "info" : "success";
          const prioTone: Record<EventPriority, "neutral" | "info" | "warning" | "danger"> = {
            niska: "neutral",
            srednja: "info",
            visoka: "warning",
            hitna: "danger",
          };
          return (
            <Card key={e.id} className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold">{e.title}</h4>
                    <Badge tone={statusTone}>{e.status.replace("_", " ")}</Badge>
                    <Badge tone={prioTone[e.priority]}>{e.priority}</Badge>
                    <Badge tone="neutral">{e.eventType.replace("_", " ")}</Badge>
                  </div>
                  {e.description ? <p className="mt-1.5 text-sm text-gray-700">{e.description}</p> : null}
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--muted)]">
                    <span>Kreiran: {formatDateTime(e.createdAt)}</span>
                    {e.reportedBy ? <span>Prijavio: {e.reportedBy}</span> : null}
                    {e.assignedContractor ? <span>Izvođač: {e.assignedContractor}</span> : null}
                    {e.resolvedAt ? <span>Zatvoren: {formatDateTime(e.resolvedAt)}</span> : null}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">Izmeni</Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}

function ObligationsTab({ obligations }: { obligations: ReturnType<typeof getObligations> }) {
  if (obligations.length === 0) {
    return <EmptyState title="Nema definisanih obaveza" description="Unesi servise, polise i ugovore koji se redovno obnavljaju." />;
  }

  const sorted = [...obligations]
    .filter((o) => o.isActive)
    .sort((a, b) => daysUntil(a.nextDueAt) - daysUntil(b.nextDueAt));

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-[var(--muted)]">
          Sistem automatski šalje podsetnik 30, 7 i 0 dana pre isteka.
        </p>
        <Button variant="primary">+ Nova obaveza</Button>
      </div>

      <Card>
        <CardBody className="p-0">
          <div className="relative">
            {sorted.map((o, idx) => {
              const days = daysUntil(o.nextDueAt);
              const u = urgencyLevel(days);
              const dotColor = u === "red" ? "bg-red-500" : u === "yellow" ? "bg-amber-500" : "bg-green-500";
              const tone = u === "red" ? "danger" : u === "yellow" ? "warning" : "success";
              const label =
                days < 0 ? `Kasni ${Math.abs(days)} dana` :
                days === 0 ? "Danas ističe" :
                `Za ${days} dana`;

              return (
                <div key={o.id} className="relative flex gap-4 px-5 py-4">
                  {idx !== sorted.length - 1 ? (
                    <div className="absolute left-[34px] top-10 bottom-0 w-px bg-[var(--border)]" />
                  ) : null}
                  <div className={`relative z-10 mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ring-4 ring-white ${dotColor}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-semibold">{o.title}</h4>
                          <Badge tone="neutral">{o.category}</Badge>
                        </div>
                        <div className="mt-0.5 text-sm text-[var(--muted)]">
                          {o.responsibleSupplier ? `Izvršilac: ${o.responsibleSupplier}` : "Bez izvršioca"}
                          {o.intervalMonths ? ` · ciklus ${o.intervalMonths} meseci` : ""}
                        </div>
                      </div>
                      <Badge tone={tone}>{label}</Badge>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-3 text-xs text-[var(--muted)] md:grid-cols-4">
                      <div>
                        <div>Sledeći rok</div>
                        <div className="font-medium text-gray-900">{formatDate(o.nextDueAt)}</div>
                      </div>
                      <div>
                        <div>Poslednji put</div>
                        <div className="font-medium text-gray-900">{formatDate(o.lastCompletedAt)}</div>
                      </div>
                      <div>
                        <div>Podsetnik</div>
                        <div className="font-medium text-gray-900">{o.reminderDaysBefore} dana ranije</div>
                      </div>
                      <div className="flex items-end justify-end">
                        <Button size="sm" variant="secondary">Označi urađeno</Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
