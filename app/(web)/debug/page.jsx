"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function DebugUsersPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchUsers();
      ensureCurrentUserRole();
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

  const ensureCurrentUserRole = async () => {
    try {
      const response = await fetch("/api/user/ensure-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id }),
      });

      const result = await response.json();
      console.log("Role check result:", result);
    } catch (error) {
      console.error("Error ensuring role:", error);
    }
  };

  const updateRole = async (userId, newRole) => {
    try {
      const response = await fetch("/api/admin/update-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (response.ok) {
        fetchUsers(); // Refrescar lista
        alert("Rol actualizado correctamente");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Error actualizando rol");
    }
  };

  if (status === "loading" || loading) {
    return <div>Cargando...</div>;
  }

  if (!session) {
    return <div>Debes iniciar sesión</div>;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-4'>Debug - Usuarios</h1>

      <div className='mb-6 p-4 bg-blue-100 rounded'>
        <h2 className='font-bold'>Tu sesión actual:</h2>
        <p>ID: {session.user.id}</p>
        <p>Email: {session.user.email}</p>
        <p>Rol: {session.user.role}</p>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-300'>
          <thead>
            <tr className='bg-gray-50'>
              <th className='px-4 py-2 border'>ID</th>
              <th className='px-4 py-2 border'>Email</th>
              <th className='px-4 py-2 border'>Name</th>
              <th className='px-4 py-2 border'>Rol</th>
              <th className='px-4 py-2 border'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className='px-4 py-2 border text-sm'>{user.id}</td>
                <td className='px-4 py-2 border'>{user.email}</td>
                <td className='px-4 py-2 border'>{user.name}</td>
                <td className='px-4 py-2 border'>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-800"
                        : user.role === "moderator"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role || "SIN ROL"}
                  </span>
                </td>
                <td className='px-4 py-2 border'>
                  <select
                    onChange={(e) => updateRole(user.id, e.target.value)}
                    defaultValue={user.role || "user"}
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
