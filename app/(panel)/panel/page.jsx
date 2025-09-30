// app/panel/page.js
import AuthRedirectHandler from "@/components/AuthRedirectHandler";
import DashboardClient from "@/components/Panel/DashboardClient";

export default async function PanelPage() {
  const res = await fetch(`${process.env.API_BASE_URL}/dashboard-data`, {
    cache: "no-store", // Siempre datos frescos
  });
  const data = await res.json();

  return (
    <AuthRedirectHandler>
      <DashboardClient initialData={data} />
    </AuthRedirectHandler>
  );
}
