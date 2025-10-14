export async function apiSave(collection: string, data: any) {
  const res = await fetch(`/api/${collection}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Error al guardar en ${collection}`);
  }

  return res.json(); // devuelve { id, ...data }
}

export async function apiUpdate(collection: string, id: string, data: any) {
  const res = await fetch(`/api/${collection}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Error al actualizar en ${collection}`);
  }

  return res.json();
}

export async function apiDelete(collection: string, id: string) {
  const res = await fetch(`/api/${collection}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Error al eliminar en ${collection}`);
  }

  return res.json(); // devuelve { success: true }
}

export async function apiGet(collection: string, userId?: string) {
  const url = userId
    ? `/api/${collection}?userId=${userId}`
    : `/api/${collection}`;
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Error al obtener datos de ${collection}`);
  }

  return res.json();
}
