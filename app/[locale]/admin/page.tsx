import type { Metadata } from "next";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "لوحة الإدارة — معهد مِداد",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <section className="container" style={{ paddingBlock: "40px 88px" }} dir="rtl" lang="ar">
      <AdminDashboard />
    </section>
  );
}
