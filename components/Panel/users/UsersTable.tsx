// app/dashboard/usuarios/components/UsersTable.tsx
"use client";

import { useState } from "react";
import { User } from "@/types/user.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreVertical, Mail, Phone, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRoleCell } from "./UserRoleCell";
import { RoleChangeDialog } from "./RoleChangeDialog";
import { EmptyUsersState } from "./EmptyUsersState";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  users: User[];
}

export function UsersTable({ users }: Props) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChangeRole = (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  if (users.length === 0) {
    return <EmptyUsersState />;
  }

  return (
    <>
      <div className='rounded-lg border bg-card overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow className='bg-muted/50'>
              <TableHead className='w-[300px]'>Usuario</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead className='w-[70px]'>
                <span className='sr-only'>Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className='hover:bg-muted/30 transition-colors'
              >
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-10 w-10'>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium'>
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col min-w-0'>
                      <span className='font-medium text-sm truncate'>
                        {user.name}
                      </span>
                      <span className='text-xs text-muted-foreground flex items-center gap-1'>
                        <Mail className='h-3 w-3' />
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {user.phone ? (
                    <span className='text-sm flex items-center gap-1.5 text-muted-foreground'>
                      <Phone className='h-3.5 w-3.5' />
                      {user.phone}
                    </span>
                  ) : (
                    <span className='text-xs text-muted-foreground'>
                      Sin teléfono
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <UserRoleCell role={user.role ?? "user"} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8'
                        aria-label='Abrir menú de acciones'
                      >
                        <MoreVertical className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='bg-white'>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleChangeRole(user)}>
                        Cambiar rol
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <RoleChangeDialog
        user={selectedUser}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
