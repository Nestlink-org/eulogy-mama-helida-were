import EulogyViewer from "@/components/EulogyViewer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eulogy - Mama Helida Were Oduor",
  description: "Celebrating the life of Mama Helida Were Oduor (1936-2025)",
};

export default function Home() {
  return <EulogyViewer />;
}
