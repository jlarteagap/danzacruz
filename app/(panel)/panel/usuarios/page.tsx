// app/dashboard/usuarios/page.tsx
"use client";

import { useUsers } from "@/hooks/useUser";
import { UsersTable } from "@/components/Panel/users/UsersTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function UsersPage() {
  const { data: users, isLoading, isError, error } = useUsers();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <Loader2 className='h-6 w-6 animate-spin text-primary' />
        <span className='ml-2'>Cargando usuarios...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className='max-w-md mx-auto mt-10'>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-red-500'>{error.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Usuarios</h1>
      <UsersTable users={users ?? []} />
    </section>
  );
}
