import type { FlattenedChoreography } from "../_types";
/**
 * Exporta las coreografías a CSV (compatible con Excel)
 * Nota: Para XLSX real, considera usar 'xlsx' library
 */
export const exportToCSV = (choreographies: FlattenedChoreography[]) => {
  // Headers
  const headers = [
    "Participante",
    "Email",
    "Teléfono",
    "Ciudad",
    "País",
    "Coreografía",
    "Categoría",
    "División",
    "Subdivisión",
    "Modalidad",
    "Música",
    "Coreógrafo",
    "Detalles de Estilo",
    "Información Adicional",
  ];

  // Rows
  const rows = choreographies.map((c) => [
    c.participantName,
    c.participantEmail,
    c.participantPhone,
    c.participantCity,
    c.participantCountry,
    c.choreographyName,
    c.category,
    c.division,
    c.subdivision,
    c.modality,
    c.musicName,
    c.choreographer,
    c.styleDetails,
    c.additionalInfo || "",
  ]);

  // Construir CSV
  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  // Crear blob y descargar
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `coreografias_${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
