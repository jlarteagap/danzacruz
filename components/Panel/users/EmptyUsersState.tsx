// app/dashboard/usuarios/components/EmptyUsersState.tsx
import { Users } from "lucide-react";

export function EmptyUsersState() {
  return (
    <div className='flex flex-col items-center justify-center py-16 px-4 text-center'>
      <div className='rounded-full bg-muted p-6 mb-4'>
        <Users className='h-12 w-12 text-muted-foreground' />
      </div>
      <h3 className='text-lg font-semibold mb-2'>
        No hay usuarios registrados
      </h3>
      <p className='text-sm text-muted-foreground max-w-sm'>
        Cuando los usuarios se registren en la plataforma, aparecerán aquí.
      </p>
    </div>
  );
}
