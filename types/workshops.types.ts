export interface workshops {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
  time: string;
  judge: string;
}
export interface WorkshopFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  image?: string;
  location: string;
  status?: boolean;
  judge: string;
}
