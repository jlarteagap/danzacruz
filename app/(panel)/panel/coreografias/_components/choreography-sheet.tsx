"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Music,
  Users,
  Layers,
  Grid,
  Sparkles,
  FileText,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";
import type { FlattenedChoreography } from "../_types";

interface ChoreographySheetProps {
  choreography: FlattenedChoreography & {
    dancers?: { fullName: string; document: string }[];
  };
  isOpen: boolean;
  onClose: () => void;
}

export const ChoreographySheet = ({
  choreography,
  isOpen,
  onClose,
}: ChoreographySheetProps) => {
  console.log("Choreography data in Sheet:", choreography);
  const dancerCount = choreography.dancers?.length ?? 0;
  const shareLink = `${
    process.env.NEXT_PUBLIC_APP_URL
  }/coreografias/${encodeURIComponent(choreography.choreographyId)}`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareLink);
    toast.success("Coreografía copiada al portapapeles");
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='w-full sm:max-w-xl overflow-y-auto bg-white p-10'>
        <SheetHeader className='space-y-3 pb-6'>
          <SheetTitle className='text-2xl font-semibold tracking-tight'>
            Detalles de la Coreografía
          </SheetTitle>
          <SheetDescription className='text-base'>
            Información completa del participante y su coreografía registrada.
          </SheetDescription>
        </SheetHeader>

        <div className='space-y-8'>
          {/* Información del Participante */}
          <section className='space-y-4'>
            <h3 className='flex items-center gap-2 text-lg font-semibold text-slate-900'>
              <User className='h-5 w-5 text-blue-600' />
              Información del Participante
            </h3>

            <div className='space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4'>
              <DetailRow
                icon={<User className='h-4 w-4' />}
                label='Nombre completo'
                value={choreography.participantName}
              />
              <DetailRow
                icon={<Mail className='h-4 w-4' />}
                label='Correo electrónico'
                value={choreography.participantEmail}
                copyable
              />
              <DetailRow
                icon={<Phone className='h-4 w-4' />}
                label='Teléfono'
                value={choreography.participantPhone}
                copyable
              />
              <DetailRow
                icon={<MapPin className='h-4 w-4' />}
                label='Ubicación'
                value={`${choreography.participantCity}, ${choreography.participantCountry}`}
              />
            </div>
          </section>

          <Separator />

          {/* Información de la Coreografía */}
          <section className='space-y-4'>
            <h3 className='flex items-center gap-2 text-lg font-semibold text-slate-900'>
              <Sparkles className='h-5 w-5 text-purple-600' />
              Detalles de la Coreografía
            </h3>

            <div className='space-y-4'>
              {/* Nombre de la coreografía */}
              <div className='rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4'>
                <p className='text-sm font-medium text-slate-500 mb-1'>
                  Nombre de la coreografía
                </p>
                <p className='text-lg font-semibold text-slate-900'>
                  {choreography.choreographyName}
                </p>
              </div>

              {/* Categorías en grid */}
              <div className='grid grid-cols-2 gap-3'>
                <CategoryCard
                  icon={<Layers className='h-4 w-4' />}
                  label='Categoría'
                  value={choreography.category}
                  color='blue'
                />
                <CategoryCard
                  icon={<Grid className='h-4 w-4' />}
                  label='División'
                  value={choreography.division}
                  color='purple'
                />
                <CategoryCard
                  icon={<Users className='h-4 w-4' />}
                  label='Subdivisión'
                  value={choreography.subdivision}
                  color='emerald'
                />
                <CategoryCard
                  icon={<Sparkles className='h-4 w-4' />}
                  label='Modalidad'
                  value={choreography.modality}
                  color='orange'
                />
              </div>

              {/* Información musical */}
              <div className='space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4'>
                <DetailRow
                  icon={<Music className='h-4 w-4' />}
                  label='Nombre de la música'
                  value={choreography.musicName}
                />
                <DetailRow
                  icon={<User className='h-4 w-4' />}
                  label='Coreógrafo'
                  value={choreography.choreographer}
                />
              </div>
              <div className='rounded-lg border border-slate-200 bg-slate-50 p-4 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-md bg-white text-slate-600'>
                    <Users className='h-4 w-4' />
                  </div>
                  <div>
                    <p className='text-xs font-medium text-slate-500 mb-0.5'>
                      Cantidad de bailarines
                    </p>
                    <p className='text-sm font-semibold text-slate-900'>
                      {dancerCount}
                    </p>
                  </div>
                </div>
              </div>

              {/* 🔗 Enlace público */}
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
                <div className='flex items-start gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-md bg-white text-blue-600'>
                    <LinkIcon className='h-4 w-4' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs font-medium text-blue-700 mb-1'>
                      Enlace público de la coreografía
                    </p>
                    <a
                      href={shareLink}
                      target='_blank'
                      className='text-sm text-blue-800 break-all'
                    >
                      {shareLink}
                    </a>
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className='ml-2 text-xs font-medium text-blue-700 hover:text-blue-800 transition-colors cursor-pointer'
                    aria-label='Copiar enlace'
                  >
                    Copiar
                  </button>
                </div>
              </div>
              {/* Detalles del estilo */}
              <div className='rounded-lg border border-slate-200 bg-white p-4'>
                <p className='text-sm font-medium text-slate-500 mb-2'>
                  Detalles del estilo
                </p>
                <p className='text-sm text-slate-700 leading-relaxed'>
                  {choreography.styleDetails}
                </p>
              </div>

              {/* Información adicional */}
              {choreography.additionalInfo && (
                <div className='rounded-lg border border-amber-200 bg-amber-50 p-4'>
                  <div className='flex items-start gap-2'>
                    <FileText className='h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0' />
                    <div>
                      <p className='text-sm font-medium text-amber-900 mb-1'>
                        Información adicional
                      </p>
                      <p className='text-sm text-amber-800 leading-relaxed'>
                        {choreography.additionalInfo}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  copyable?: boolean;
}

const DetailRow = ({ icon, label, value, copyable }: DetailRowProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success("Copiado al portapapeles");
  };

  return (
    <div className='flex items-start gap-3'>
      <div className='flex h-8 w-8 items-center justify-center rounded-md bg-white text-slate-600'>
        {icon}
      </div>
      <div className='flex-1 min-w-0'>
        <p className='text-xs font-medium text-slate-500 mb-0.5'>{label}</p>
        <div className='flex items-center gap-2'>
          <p className='text-sm font-medium text-slate-900 break-words'>
            {value}
          </p>
          {copyable && (
            <button
              onClick={handleCopy}
              className='text-xs text-blue-600 hover:text-blue-700 font-medium'
            >
              Copiar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface CategoryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: "blue" | "purple" | "emerald" | "orange";
}

const CategoryCard = ({ icon, label, value, color }: CategoryCardProps) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
    orange: "bg-orange-50 border-orange-200 text-orange-700",
  };

  return (
    <div
      className={`rounded-lg border p-3 ${colorClasses[color]} transition-all hover:shadow-sm`}
    >
      <div className='flex items-center gap-2 mb-1'>
        {icon}
        <p className='text-xs font-medium opacity-80'>{label}</p>
      </div>
      <p className='text-sm font-semibold'>{value}</p>
    </div>
  );
};
