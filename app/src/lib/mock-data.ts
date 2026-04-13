export type UnitType = "stan" | "lokal" | "garaza" | "parking" | "box";
export type EventStatus = "otvoren" | "u_toku" | "zatvoren";
export type EventPriority = "niska" | "srednja" | "visoka" | "hitna";
export type EventType =
  | "prijava_kvara"
  | "servis"
  | "inspekcija"
  | "korespondencija"
  | "ostalo";
export type DocCategory =
  | "ugovor"
  | "projekat"
  | "garancija"
  | "resenje"
  | "polisa"
  | "ostalo";
export type ObligationCategory =
  | "servis"
  | "inspekcija"
  | "ugovor"
  | "polisa"
  | "registracija"
  | "ostalo";

export type Building = {
  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  entranceCount: number;
  unitCount: number;
  constructionYear: number | null;
  hasElevator: boolean;
  hasCentralHeating: boolean;
  notes: string | null;
  isArchived: boolean;
};

export type Unit = {
  id: number;
  buildingId: number;
  unitNumber: string;
  unitType: UnitType;
  floor: number | null;
  areaSqm: number;
  ownerFirstName: string;
  ownerLastName: string;
  ownerPhone: string | null;
  ownerEmail: string | null;
  ownerJmbgPib: string | null;
};

export type Document = {
  id: number;
  buildingId: number;
  title: string;
  category: DocCategory;
  fileName: string;
  fileSizeBytes: number;
  mimeType: string;
  documentDate: string | null;
  expiresAt: string | null;
};

export type EventItem = {
  id: number;
  buildingId: number;
  unitId: number | null;
  eventType: EventType;
  status: EventStatus;
  title: string;
  description: string | null;
  priority: EventPriority;
  reportedBy: string | null;
  assignedContractor: string | null;
  resolvedAt: string | null;
  createdAt: string;
};

export type Obligation = {
  id: number;
  buildingId: number;
  title: string;
  category: ObligationCategory;
  lastCompletedAt: string | null;
  nextDueAt: string;
  intervalMonths: number | null;
  reminderDaysBefore: number;
  responsibleSupplier: string | null;
  notes: string | null;
  isActive: boolean;
};

export const currentUser = {
  firstName: "Marko",
  lastName: "Jovanović",
  email: "marko@alfa-upravnik.rs",
  phone: "+381 64 123 4567",
  companyName: "Alfa Upravnik d.o.o.",
  companyPib: "109876543",
};

export const buildings: Building[] = [
  {
    id: 1,
    name: "Bulevar 42",
    address: "Bulevar kralja Aleksandra 42",
    city: "Beograd",
    postalCode: "11000",
    entranceCount: 2,
    unitCount: 24,
    constructionYear: 1987,
    hasElevator: true,
    hasCentralHeating: true,
    notes: "Renoviran krov 2022.",
    isArchived: false,
  },
  {
    id: 2,
    name: "Vojvode Stepe 118",
    address: "Vojvode Stepe 118",
    city: "Beograd",
    postalCode: "11000",
    entranceCount: 1,
    unitCount: 12,
    constructionYear: 2005,
    hasElevator: true,
    hasCentralHeating: false,
    notes: null,
    isArchived: false,
  },
  {
    id: 3,
    name: "Dunavska 7",
    address: "Dunavska 7",
    city: "Novi Sad",
    postalCode: "21000",
    entranceCount: 3,
    unitCount: 36,
    constructionYear: 1971,
    hasElevator: false,
    hasCentralHeating: true,
    notes: "Stara zgrada, lift u planu.",
    isArchived: false,
  },
  {
    id: 4,
    name: "Cara Dušana 22",
    address: "Cara Dušana 22",
    city: "Beograd",
    postalCode: "11000",
    entranceCount: 1,
    unitCount: 8,
    constructionYear: 2018,
    hasElevator: true,
    hasCentralHeating: true,
    notes: null,
    isArchived: false,
  },
  {
    id: 5,
    name: "Mišarska 14",
    address: "Mišarska 14",
    city: "Beograd",
    postalCode: "11000",
    entranceCount: 1,
    unitCount: 16,
    constructionYear: 1964,
    hasElevator: false,
    hasCentralHeating: true,
    notes: "Prestali saradnju 2025.",
    isArchived: true,
  },
];

export const units: Unit[] = [
  { id: 1, buildingId: 1, unitNumber: "1", unitType: "stan", floor: 1, areaSqm: 56.4, ownerFirstName: "Petar", ownerLastName: "Petrović", ownerPhone: "+381 64 111 2233", ownerEmail: "petar@example.rs", ownerJmbgPib: "0101980710123" },
  { id: 2, buildingId: 1, unitNumber: "2", unitType: "stan", floor: 1, areaSqm: 62.0, ownerFirstName: "Milena", ownerLastName: "Jovanović", ownerPhone: "+381 65 222 3344", ownerEmail: "milena@example.rs", ownerJmbgPib: null },
  { id: 3, buildingId: 1, unitNumber: "3", unitType: "stan", floor: 2, areaSqm: 48.2, ownerFirstName: "Stefan", ownerLastName: "Ilić", ownerPhone: "+381 63 333 4455", ownerEmail: null, ownerJmbgPib: null },
  { id: 4, buildingId: 1, unitNumber: "4", unitType: "stan", floor: 2, areaSqm: 71.5, ownerFirstName: "Ana", ownerLastName: "Marković", ownerPhone: "+381 60 444 5566", ownerEmail: "ana.m@example.rs", ownerJmbgPib: null },
  { id: 5, buildingId: 1, unitNumber: "PR-1", unitType: "lokal", floor: 0, areaSqm: 84.0, ownerFirstName: "Branko", ownerLastName: "Nikolić", ownerPhone: "+381 69 555 6677", ownerEmail: "branko@firma.rs", ownerJmbgPib: "108765432" },
  { id: 6, buildingId: 1, unitNumber: "G-1", unitType: "garaza", floor: -1, areaSqm: 14.0, ownerFirstName: "Petar", ownerLastName: "Petrović", ownerPhone: "+381 64 111 2233", ownerEmail: null, ownerJmbgPib: null },
  { id: 7, buildingId: 2, unitNumber: "1", unitType: "stan", floor: 1, areaSqm: 45.0, ownerFirstName: "Nikola", ownerLastName: "Đorđević", ownerPhone: "+381 61 111 9988", ownerEmail: "nikola.dj@example.rs", ownerJmbgPib: null },
  { id: 8, buildingId: 2, unitNumber: "2", unitType: "stan", floor: 1, areaSqm: 52.0, ownerFirstName: "Jelena", ownerLastName: "Stanković", ownerPhone: "+381 62 222 8877", ownerEmail: null, ownerJmbgPib: null },
  { id: 9, buildingId: 2, unitNumber: "3", unitType: "stan", floor: 2, areaSqm: 60.0, ownerFirstName: "Dragan", ownerLastName: "Lukić", ownerPhone: "+381 63 333 7766", ownerEmail: "dragan@example.rs", ownerJmbgPib: null },
  { id: 10, buildingId: 3, unitNumber: "1", unitType: "stan", floor: 1, areaSqm: 38.0, ownerFirstName: "Svetlana", ownerLastName: "Radović", ownerPhone: "+381 64 555 1122", ownerEmail: "s.radovic@example.rs", ownerJmbgPib: null },
  { id: 11, buildingId: 3, unitNumber: "2", unitType: "stan", floor: 1, areaSqm: 42.0, ownerFirstName: "Miloš", ownerLastName: "Todorović", ownerPhone: "+381 65 666 2233", ownerEmail: null, ownerJmbgPib: null },
  { id: 12, buildingId: 4, unitNumber: "1", unitType: "stan", floor: 1, areaSqm: 92.5, ownerFirstName: "Aleksandar", ownerLastName: "Kovačević", ownerPhone: "+381 63 777 3344", ownerEmail: "aleks.k@example.rs", ownerJmbgPib: null },
];

export const documents: Document[] = [
  { id: 1, buildingId: 1, title: "Ugovor o upravljanju 2024", category: "ugovor", fileName: "ugovor-2024.pdf", fileSizeBytes: 842_112, mimeType: "application/pdf", documentDate: "2024-01-15", expiresAt: "2027-01-15" },
  { id: 2, buildingId: 1, title: "Polisa osiguranja zgrade", category: "polisa", fileName: "polisa-dunav-2025.pdf", fileSizeBytes: 512_000, mimeType: "application/pdf", documentDate: "2025-03-01", expiresAt: "2026-03-01" },
  { id: 3, buildingId: 1, title: "Projekat izvedenog stanja", category: "projekat", fileName: "projekat-izvedeno.pdf", fileSizeBytes: 12_450_000, mimeType: "application/pdf", documentDate: "1987-06-20", expiresAt: null },
  { id: 4, buildingId: 1, title: "Rešenje o registraciji SZ", category: "resenje", fileName: "resenje-sz.pdf", fileSizeBytes: 321_000, mimeType: "application/pdf", documentDate: "2019-09-10", expiresAt: null },
  { id: 5, buildingId: 1, title: "Garancija krov Eternit 2022", category: "garancija", fileName: "garancija-krov.pdf", fileSizeBytes: 184_000, mimeType: "application/pdf", documentDate: "2022-08-30", expiresAt: "2032-08-30" },
  { id: 6, buildingId: 2, title: "Ugovor o upravljanju 2023", category: "ugovor", fileName: "ugovor-vs118.pdf", fileSizeBytes: 720_000, mimeType: "application/pdf", documentDate: "2023-05-01", expiresAt: "2026-05-01" },
  { id: 7, buildingId: 2, title: "Polisa osiguranja", category: "polisa", fileName: "polisa-vs118.pdf", fileSizeBytes: 480_000, mimeType: "application/pdf", documentDate: "2025-06-01", expiresAt: "2026-06-01" },
  { id: 8, buildingId: 3, title: "Ugovor o upravljanju", category: "ugovor", fileName: "ugovor-dunavska.pdf", fileSizeBytes: 690_000, mimeType: "application/pdf", documentDate: "2024-09-01", expiresAt: "2027-09-01" },
  { id: 9, buildingId: 3, title: "Fotografije fasade 2025", category: "ostalo", fileName: "fasada.zip", fileSizeBytes: 18_400_000, mimeType: "application/zip", documentDate: "2025-11-10", expiresAt: null },
];

export const events: EventItem[] = [
  { id: 1, buildingId: 1, unitId: 3, eventType: "prijava_kvara", status: "otvoren", title: "Curi voda u kupatilu stana 3", description: "Stanar prijavio curenje sa plafona u kupatilu, verovatno iz stana 5.", priority: "visoka", reportedBy: "Stefan Ilić", assignedContractor: null, resolvedAt: null, createdAt: "2026-04-11T09:14:00Z" },
  { id: 2, buildingId: 1, unitId: null, eventType: "servis", status: "u_toku", title: "Godišnji servis lifta", description: "KONE servis dolazi 14.04. u 10h.", priority: "srednja", reportedBy: null, assignedContractor: "KONE Srbija", resolvedAt: null, createdAt: "2026-04-08T12:00:00Z" },
  { id: 3, buildingId: 1, unitId: null, eventType: "inspekcija", status: "zatvoren", title: "Inspekcija PP aparata", description: "Svi aparati ispravni, 2 baždarena.", priority: "srednja", reportedBy: null, assignedContractor: "Vatrogas 021", resolvedAt: "2026-03-22T15:00:00Z", createdAt: "2026-03-20T08:00:00Z" },
  { id: 4, buildingId: 1, unitId: 4, eventType: "korespondencija", status: "otvoren", title: "Prigovor stanara na buku sa terase lokala", description: "Vlasnik stana 4 dostavio pisani prigovor.", priority: "niska", reportedBy: "Ana Marković", assignedContractor: null, resolvedAt: null, createdAt: "2026-04-05T17:20:00Z" },
  { id: 5, buildingId: 2, unitId: 8, eventType: "prijava_kvara", status: "u_toku", title: "Ne radi interfon stana 2", description: null, priority: "srednja", reportedBy: "Jelena Stanković", assignedContractor: "ElektroFix", resolvedAt: null, createdAt: "2026-04-10T10:00:00Z" },
  { id: 6, buildingId: 2, unitId: null, eventType: "servis", status: "zatvoren", title: "Čišćenje fasade", description: "Završeno u predviđenom roku.", priority: "niska", reportedBy: null, assignedContractor: "CleanPro", resolvedAt: "2026-03-15T14:00:00Z", createdAt: "2026-03-10T09:00:00Z" },
  { id: 7, buildingId: 3, unitId: null, eventType: "prijava_kvara", status: "otvoren", title: "Oštećen ulazni domofon", description: "Potrebna zamena tastature.", priority: "hitna", reportedBy: "Svetlana Radović", assignedContractor: null, resolvedAt: null, createdAt: "2026-04-12T19:30:00Z" },
  { id: 8, buildingId: 3, unitId: null, eventType: "inspekcija", status: "otvoren", title: "Provera gromobrana", description: "Zakazano sa ovlašćenom firmom.", priority: "srednja", reportedBy: null, assignedContractor: "Gromotex", resolvedAt: null, createdAt: "2026-04-01T08:00:00Z" },
  { id: 9, buildingId: 4, unitId: null, eventType: "ostalo", status: "u_toku", title: "Priprema godišnje skupštine", description: "Poslati pozivi stanarima.", priority: "srednja", reportedBy: null, assignedContractor: null, resolvedAt: null, createdAt: "2026-04-07T11:00:00Z" },
];

export const obligations: Obligation[] = [
  { id: 1, buildingId: 1, title: "Godišnji servis lifta", category: "servis", lastCompletedAt: "2025-04-14", nextDueAt: "2026-04-14", intervalMonths: 12, reminderDaysBefore: 30, responsibleSupplier: "KONE Srbija", notes: null, isActive: true },
  { id: 2, buildingId: 1, title: "Baždarenje PP aparata", category: "inspekcija", lastCompletedAt: "2025-09-01", nextDueAt: "2026-09-01", intervalMonths: 12, reminderDaysBefore: 30, responsibleSupplier: "Vatrogas 021", notes: null, isActive: true },
  { id: 3, buildingId: 1, title: "Polisa osiguranja zgrade", category: "polisa", lastCompletedAt: "2025-03-01", nextDueAt: "2026-03-01", intervalMonths: 12, reminderDaysBefore: 60, responsibleSupplier: "Dunav osiguranje", notes: null, isActive: true },
  { id: 4, buildingId: 1, title: "Provera gromobrana", category: "inspekcija", lastCompletedAt: "2024-05-10", nextDueAt: "2026-05-10", intervalMonths: 24, reminderDaysBefore: 30, responsibleSupplier: "Gromotex", notes: null, isActive: true },
  { id: 5, buildingId: 1, title: "Ugovor sa servisom higijene", category: "ugovor", lastCompletedAt: "2024-01-01", nextDueAt: "2026-12-31", intervalMonths: 36, reminderDaysBefore: 60, responsibleSupplier: "CleanPro", notes: null, isActive: true },
  { id: 6, buildingId: 2, title: "Godišnji servis lifta", category: "servis", lastCompletedAt: "2025-06-10", nextDueAt: "2026-06-10", intervalMonths: 12, reminderDaysBefore: 30, responsibleSupplier: "Schindler", notes: null, isActive: true },
  { id: 7, buildingId: 2, title: "Polisa osiguranja", category: "polisa", lastCompletedAt: "2025-06-01", nextDueAt: "2026-06-01", intervalMonths: 12, reminderDaysBefore: 60, responsibleSupplier: "Generali", notes: null, isActive: true },
  { id: 8, buildingId: 2, title: "Registracija stambene zajednice", category: "registracija", lastCompletedAt: "2023-05-01", nextDueAt: "2028-05-01", intervalMonths: 60, reminderDaysBefore: 90, responsibleSupplier: null, notes: null, isActive: true },
  { id: 9, buildingId: 3, title: "Baždarenje PP aparata", category: "inspekcija", lastCompletedAt: "2025-04-20", nextDueAt: "2026-04-20", intervalMonths: 12, reminderDaysBefore: 30, responsibleSupplier: "Vatrogas 021", notes: null, isActive: true },
  { id: 10, buildingId: 3, title: "Polisa osiguranja", category: "polisa", lastCompletedAt: "2025-09-01", nextDueAt: "2026-09-01", intervalMonths: 12, reminderDaysBefore: 60, responsibleSupplier: "Dunav osiguranje", notes: null, isActive: true },
  { id: 11, buildingId: 3, title: "Provera gromobrana", category: "inspekcija", lastCompletedAt: "2024-04-15", nextDueAt: "2026-04-15", intervalMonths: 24, reminderDaysBefore: 30, responsibleSupplier: "Gromotex", notes: null, isActive: true },
  { id: 12, buildingId: 4, title: "Godišnji servis lifta", category: "servis", lastCompletedAt: "2025-10-20", nextDueAt: "2026-10-20", intervalMonths: 12, reminderDaysBefore: 30, responsibleSupplier: "KONE Srbija", notes: null, isActive: true },
  { id: 13, buildingId: 4, title: "Polisa osiguranja", category: "polisa", lastCompletedAt: "2025-11-01", nextDueAt: "2026-11-01", intervalMonths: 12, reminderDaysBefore: 60, responsibleSupplier: "Wiener", notes: null, isActive: true },
];

// Helpers
export const TODAY = new Date("2026-04-13T12:00:00Z");

export function daysUntil(dateIso: string): number {
  const d = new Date(dateIso + (dateIso.length <= 10 ? "T12:00:00Z" : ""));
  return Math.round((d.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24));
}

export function urgencyLevel(days: number): "red" | "yellow" | "green" {
  if (days < 0) return "red";
  if (days <= 7) return "red";
  if (days <= 30) return "yellow";
  return "green";
}

export function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso.length <= 10 ? iso + "T12:00:00Z" : iso);
  return d.toLocaleDateString("sr-RS", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("sr-RS", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getBuilding(id: number) {
  return buildings.find((b) => b.id === id);
}
export function getUnits(buildingId: number) {
  return units.filter((u) => u.buildingId === buildingId);
}
export function getDocuments(buildingId: number) {
  return documents.filter((d) => d.buildingId === buildingId);
}
export function getEvents(buildingId: number) {
  return events.filter((e) => e.buildingId === buildingId);
}
export function getObligations(buildingId: number) {
  return obligations.filter((o) => o.buildingId === buildingId);
}
