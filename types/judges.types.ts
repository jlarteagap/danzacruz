export interface Judge {
  id: number;
  nombre: string;
  apellido: string;
  nacionalidad: string;
  trayectoria: string;
  fotoPerfil: string;
  habilitado: boolean;
}

export interface JudgesFormData {
  nombre: string;
  apellido: string;
  nacionalidad: string;
  trayectoria: string;
  fotoPerfil: string;
}
