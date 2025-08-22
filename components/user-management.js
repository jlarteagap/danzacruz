"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function UserManagement() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.role === "admin") {
      fetchUsers();
    }
  }, [session]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        fetchUsers(); // Recargar lista
        alert("Rol actualizado correctamente");
      } else {
        alert("Error al actualizar el rol");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Error al actualizar el rol");
    }
  };

  if (session?.user?.role !== "admin") {
    return <div>No tienes permisos para ver esta sección</div>;
  }

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  return (
    <div className='bg-white p-6 rounded-lg shadow'>
      <h3 className='text-xl font-semibold mb-4'>Gestión de Usuarios</h3>

      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto'>
          <thead>
            <tr className='bg-gray-50'>
              <th className='px-4 py-2 text-left'>Nombre</th>
              <th className='px-4 py-2 text-left'>Email</th>
              <th className='px-4 py-2 text-left'>Rol Actual</th>
              <th className='px-4 py-2 text-left'>Cambiar Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className='border-t'>
                <td className='px-4 py-2'>{user.name}</td>
                <td className='px-4 py-2'>{user.email}</td>
                <td className='px-4 py-2'>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-800"
                        : user.role === "moderator"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>
                <td className='px-4 py-2'>
                  <select
                    value={user.role || "user"}
                    onChange={(e) => updateUserRole(user.id, e.target.value)}
                    className='border rounded px-2 py-1'
                  >
                    <option value='user'>User</option>
                    <option value='moderator'>Moderator</option>
                    <option value='admin'>Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
