import Link from "next/link";
import { PageHeader } from "@/components/sidebar";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  StatCard,
  Table,
  TD,
  TH,
} from "@/components/ui";
import {
  buildings,
  events,
  obligations,
  daysUntil,
  urgencyLevel,
  formatDate,
  formatDateTime,
} from "@/lib/mock-data";

export default function Dashboard() {
  const activeBuildings = buildings.filter((b) => !b.isArchived);
  const openEvents = events.filter((e) => e.status !== "zatvoren");
  const upcoming = obligations
    .filter((o) => o.isActive)
    .map((o) => ({ o, days: daysUntil(o.nextDueAt) }))
    .filter((x) => x.days <= 60)
    .sort((a, b) => a.days - b.days)
    .slice(0, 8);

  const critical = upcoming.filter((x) => urgencyLevel(x.days) === "red").length;
  const warning = upcoming.filter((x) => urgencyLevel(x.days) === "yellow").length;

  const recent = [...events].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Pregled stanja svih zgrada pod upravom."
        actions={
          <>
            <Button variant="secondary">Izveštaj</Button>
            <Button variant="primary">+ Novi događaj</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Aktivne zgrade" value={activeBuildings.length} hint={`${buildings.length - activeBuildings.length} arhivirano`} tone="primary" href="/buildings" />
        <StatCard label="Otvoreni događaji" value={openEvents.length} hint="čekaju akciju" tone="info" />
        <StatCard label="Hitno (≤ 7 dana)" value={critical} hint="servisi i obnove" tone="danger" href="/obligations?filter=red" />
        <StatCard label="Uskoro (≤ 30 dana)" value={warning} hint="planirati izvršenje" tone="warning" href="/obligations?filter=yellow" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Obaveze koje ističu</CardTitle>
                <p className="text-sm text-[var(--muted)]">Sortirano po hitnosti · sledećih 60 dana</p>
              </div>
              <Link href="/obligations"><Button variant="ghost" size="sm">Vidi sve →</Button></Link>
            </CardHeader>
            <CardBody className="pt-0">
              {upcoming.length === 0 ? (
                <div className="py-6 text-center text-sm text-[var(--muted)]">Nema obaveza u narednih 60 dana.</div>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <TH>Obaveza</TH>
                      <TH>Zgrada</TH>
                      <TH>Rok</TH>
                      <TH>Status</TH>
                    </tr>
                  </thead>
                  <tbody>
                    {upcoming.map(({ o, days }) => {
                      const u = urgencyLevel(days);
                      const tone = u === "red" ? "danger" : u === "yellow" ? "warning" : "success";
                      const label =
                        days < 0 ? `Kasni ${Math.abs(days)} d` : days === 0 ? "Danas" : `Za ${days} d`;
                      const b = buildings.find((b) => b.id === o.buildingId);
                      return (
                        <tr key={o.id}>
                          <TD>
                            <div className="font-medium">{o.title}</div>
                            <div className="text-xs text-[var(--muted)]">{o.responsibleSupplier ?? "—"}</div>
                          </TD>
                          <TD>
                            <Link href={`/buildings/${o.buildingId}`} className="text-blue-600 hover:underline">
                              {b?.name}
                            </Link>
                          </TD>
                          <TD>{formatDate(o.nextDueAt)}</TD>
                          <TD>
                            <Badge tone={tone}>{label}</Badge>
                          </TD>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Najnovije aktivnosti</CardTitle>
            </CardHeader>
            <CardBody className="pt-0">
              <ul className="space-y-4">
                {recent.map((e) => {
                  const b = buildings.find((x) => x.id === e.buildingId);
                  const tone =
                    e.status === "otvoren" ? "warning" : e.status === "u_toku" ? "info" : "success";
                  return (
                    <li key={e.id} className="flex gap-3">
                      <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium">{e.title}</div>
                        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                          <Link href={`/buildings/${e.buildingId}`} className="hover:underline">
                            {b?.name}
                          </Link>
                          <span>·</span>
                          <span>{formatDateTime(e.createdAt)}</span>
                        </div>
                        <div className="mt-1.5">
                          <Badge tone={tone}>{e.status.replace("_", " ")}</Badge>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
