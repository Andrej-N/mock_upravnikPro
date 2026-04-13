import { buildings } from "@/lib/mock-data";
import BuildingDetailClient from "./BuildingDetailClient";

export function generateStaticParams() {
  return buildings.map((b) => ({ id: String(b.id) }));
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <BuildingDetailClient params={params} />;
}
