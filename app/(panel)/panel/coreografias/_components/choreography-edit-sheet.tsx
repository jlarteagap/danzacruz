"use client";

import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useUpdateChoreography } from "../_hooks/use-update-choreography";
import { choreographyEditSchema } from "../_lib/schemas";
// import type {
//   FlattenedChoreography,
//   ChoreographyEditFormValues,
// } from "../_types";

// interface ChoreographyEditSheetProps {
//   choreography: FlattenedChoreography;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const ChoreographyEditSheet = ({
//   choreography,
//   isOpen,
//   onClose,
// }: ChoreographyEditSheetProps) => {
//   const { mutate: updateChoreography, isPending } = useUpdateChoreography();

//   const initialValues: ChoreographyEditFormValues = {
//     choreographyName: choreography.choreographyName,
//     category: choreography.category,
//     division: choreography.division,
//     subdivision: choreography.subdivision,
//     modality: choreography.modality,
//     musicName: choreography.musicName,
//     choreographer: choreography.choreographer,
//     styleDetails: choreography.styleDetails,
//     additionalInfo: choreography.additionalInfo || "",
//   };

//   const handleSubmit = (values: ChoreographyEditFormValues) => {
//     updateChoreography(
//       {
//         participantId: choreography.participantId,
//         choreographyId: choreography.choreographyId,
//         data: values,
//       },
//       {
//         onSuccess: () => {
//           onClose();
//         },
//       }
//     );
//   };

//   return (
//     <Sheet open={isOpen} onOpenChange={onClose}>
//       <SheetContent className='w-full sm:max-w-2xl overflow-y-auto bg-white p-10'>
//         <SheetHeader className='space-y-3 pb-6'>
//           <SheetTitle className='text-2xl font-semibold tracking-tight'>
//             Editar Coreografía
//           </SheetTitle>
//           <SheetDescription className='text-base'>
//             Actualiza la información de la coreografía. Los cambios se guardarán
//             de forma inmediata.
//           </SheetDescription>
//         </SheetHeader>

//         <Formik
//           initialValues={initialValues}
//           validationSchema={choreographyEditSchema}
//           onSubmit={handleSubmit}
//           validateOnChange={true}
//           validateOnBlur={true}
//         >
//           {({ errors, touched, isValid, dirty }) => (
//             <Form className='space-y-6'>
//               {/* Nombre de la coreografía */}
//               <FormField
//                 name='choreographyName'
//                 label='Nombre de la coreografía'
//                 error={errors.choreographyName}
//                 touched={touched.choreographyName}
//                 required
//               >
//                 <Field
//                   as={Input}
//                   name='choreographyName'
//                   placeholder='Ej: Sinfonía del Movimiento'
//                   className={
//                     errors.choreographyName && touched.choreographyName
//                       ? "border-red-500 focus-visible:ring-red-500"
//                       : ""
//                   }
//                 />
//               </FormField>

//               {/* Grid de categorías */}
//               <div className='grid grid-cols-2 gap-4'>
//                 <FormField
//                   name='category'
//                   label='Categoría'
//                   error={errors.category}
//                   touched={touched.category}
//                   required
//                 >
//                   <Field
//                     as={Input}
//                     name='category'
//                     placeholder='Ej: Solo, Duo, Grupo'
//                     className={
//                       errors.category && touched.category
//                         ? "border-red-500 focus-visible:ring-red-500"
//                         : ""
//                     }
//                   />
//                 </FormField>

//                 <FormField
//                   name='division'
//                   label='División'
//                   error={errors.division}
//                   touched={touched.division}
//                   required
//                 >
//                   <Field
//                     as={Input}
//                     name='division'
//                     placeholder='Ej: Senior, Junior'
//                     className={
//                       errors.division && touched.division
//                         ? "border-red-500 focus-visible:ring-red-500"
//                         : ""
//                     }
//                   />
//                 </FormField>

//                 <FormField
//                   name='subdivision'
//                   label='Subdivisión'
//                   error={errors.subdivision}
//                   touched={touched.subdivision}
//                   required
//                 >
//                   <Field
//                     as={Input}
//                     name='subdivision'
//                     placeholder='Ej: A, B, C'
//                     className={
//                       errors.subdivision && touched.subdivision
//                         ? "border-red-500 focus-visible:ring-red-500"
//                         : ""
//                     }
//                   />
//                 </FormField>

//                 <FormField
//                   name='modality'
//                   label='Modalidad'
//                   error={errors.modality}
//                   touched={touched.modality}
//                   required
//                 >
//                   <Field
//                     as={Input}
//                     name='modality'
//                     placeholder='Ej: Contemporáneo, Jazz'
//                     className={
//                       errors.modality && touched.modality
//                         ? "border-red-500 focus-visible:ring-red-500"
//                         : ""
//                     }
//                   />
//                 </FormField>
//               </div>

//               {/* Información musical */}
//               <div className='space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4'>
//                 <h4 className='text-sm font-semibold text-slate-900'>
//                   Información Musical
//                 </h4>

//                 <FormField
//                   name='musicName'
//                   label='Nombre de la música'
//                   error={errors.musicName}
//                   touched={touched.musicName}
//                   required
//                 >
//                   <Field
//                     as={Input}
//                     name='musicName'
//                     placeholder='Ej: Bolero - Maurice Ravel'
//                     className={
//                       errors.musicName && touched.musicName
//                         ? "border-red-500 focus-visible:ring-red-500"
//                         : ""
//                     }
//                   />
//                 </FormField>

//                 <FormField
//                   name='choreographer'
//                   label='Coreógrafo'
//                   error={errors.choreographer}
//                   touched={touched.choreographer}
//                   required
//                 >
//                   <Field
//                     as={Input}
//                     name='choreographer'
//                     placeholder='Ej: María Fernández'
//                     className={
//                       errors.choreographer && touched.choreographer
//                         ? "border-red-500 focus-visible:ring-red-500"
//                         : ""
//                     }
//                   />
//                 </FormField>
//               </div>

//               {/* Detalles del estilo */}
//               <FormField
//                 name='styleDetails'
//                 label='Detalles del estilo'
//                 error={errors.styleDetails}
//                 touched={touched.styleDetails}
//                 required
//                 description='Describe el estilo, técnicas utilizadas y características principales'
//               >
//                 <Field
//                   as={Textarea}
//                   name='styleDetails'
//                   placeholder='Ej: Fusión de contemporáneo y ballet clásico, con énfasis en fluidez de movimiento...'
//                   rows={4}
//                   className={
//                     errors.styleDetails && touched.styleDetails
//                       ? "border-red-500 focus-visible:ring-red-500"
//                       : ""
//                   }
//                 />
//               </FormField>

//               {/* Información adicional */}
//               <FormField
//                 name='additionalInfo'
//                 label='Información adicional'
//                 error={errors.additionalInfo}
//                 touched={touched.additionalInfo}
//                 description='Cualquier información extra relevante (opcional)'
//               >
//                 <Field
//                   as={Textarea}
//                   name='additionalInfo'
//                   placeholder='Ej: Vestuario especial, requisitos técnicos, etc.'
//                   rows={3}
//                   className={
//                     errors.additionalInfo && touched.additionalInfo
//                       ? "border-red-500 focus-visible:ring-red-500"
//                       : ""
//                   }
//                 />
//               </FormField>

//               {/* Footer con botones */}
//               <SheetFooter className='flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2 pt-6 border-t'>
//                 <Button
//                   type='button'
//                   variant='outline'
//                   onClick={onClose}
//                   disabled={isPending}
//                   className='w-full sm:w-auto'
//                 >
//                   Cancelar
//                 </Button>
//                 <Button
//                   type='submit'
//                   disabled={isPending || !isValid || !dirty}
//                   className='w-full sm:w-auto'
//                 >
//                   {isPending ? (
//                     <>
//                       <Loader2 className='mr-2 h-4 w-4 animate-spin' />
//                       Guardando...
//                     </>
//                   ) : (
//                     "Guardar cambios"
//                   )}
//                 </Button>
//               </SheetFooter>
//             </Form>
//           )}
//         </Formik>
//       </SheetContent>
//     </Sheet>
//   );
// };

// // ============================================================================
// // Componente auxiliar para campos de formulario
// // ============================================================================
// interface FormFieldProps {
//   name: string;
//   label: string;
//   error?: string;
//   touched?: boolean;
//   required?: boolean;
//   description?: string;
//   children: React.ReactNode;
// }

const FormField = ({
  name,
  label,
  error,
  touched,
  required,
  description,
  children,
}) => {
  // }: FormFieldProps) => {
  return (
    <div className='space-y-2'>
      <Label htmlFor={name} className='text-sm font-medium text-slate-900'>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </Label>
      {children}
      {description && !error && (
        <p className='text-xs text-slate-500'>{description}</p>
      )}
      {error && touched && (
        <p className='text-xs font-medium text-red-600 flex items-center gap-1'>
          <span className='inline-block w-1 h-1 rounded-full bg-red-600' />
          {error}
        </p>
      )}
    </div>
  );
};
