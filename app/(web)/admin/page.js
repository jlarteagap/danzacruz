import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { UserManagement } from "@/components/user-management";

export default async function AdminPage() {
  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-3xl font-bold mb-6'>Panel de Administración</h1>

      <div className='space-y-6'>
        <div className='bg-white p-6 rounded-lg shadow'>
          <h2 className='text-xl font-semibold mb-4'>
            Bienvenido Administrador
          </h2>
          <p>
            Hola {session.user.name}, desde aquí puedes gestionar usuarios y
            roles.
          </p>
        </div>

        <UserManagement />
      </div>
    </div>
  );
}
