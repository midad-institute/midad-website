import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const generateMetadata = legalMetadata("terms");

export default function Page({ params }: { params: Promise<{ locale: string }> }) {
  return <LegalPage params={params} slug="terms" />;
}
