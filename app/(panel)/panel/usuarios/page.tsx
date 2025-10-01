// app/dashboard/usuarios/page.tsx
"use client";

import { useUsers } from "@/hooks/useUser";
import { UsersTable } from "@/components/Panel/users/UsersTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Users } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

function LoadingSkeleton() {
  return (
    <div className='space-y-3'>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className='flex items-center gap-4 p-4'>
          <Skeleton className='h-10 w-10 rounded-full' />
          <div className='space-y-2 flex-1'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-3 w-[200px]' />
          </div>
          <Skeleton className='h-6 w-20' />
        </div>
      ))}
    </div>
  );
}

export default function UsersPage() {
  const { data: users, isLoading, isError, error, refetch } = useUsers();

  return (
    <div className='container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-2'>
          <div className='p-2 rounded-lg bg-primary/10'>
            <Users className='h-6 w-6 text-primary' />
          </div>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              Gestión de Usuarios
            </h1>
            <p className='text-muted-foreground mt-1'>
              Administra roles y permisos de los usuarios del sistema
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className='border-b bg-muted/30'>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>
            {users?.length
              ? `${users.length} usuarios registrados`
              : "Cargando..."}
          </CardDescription>
        </CardHeader>
        <CardContent className='p-0'>
          {isLoading && (
            <div className='p-6'>
              <LoadingSkeleton />
            </div>
          )}

          {isError && (
            <div className='p-6'>
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Error al cargar usuarios</AlertTitle>
                <AlertDescription className='mt-2 flex flex-col gap-3'>
                  <p>{error.message}</p>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => refetch()}
                    className='w-fit'
                  >
                    Reintentar
                  </Button>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {!isLoading && !isError && users && <UsersTable users={users} />}
        </CardContent>
      </Card>
    </div>
  );
}
