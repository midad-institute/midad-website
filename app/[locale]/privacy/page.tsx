import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const generateMetadata = legalMetadata("privacy");

export default function Page({ params }: { params: Promise<{ locale: string }> }) {
  return <LegalPage params={params} slug="privacy" />;
}
