# Componentes de Formulario Compartidos

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Componentes Disponibles](#componentes-disponibles)
- [Instalación y Uso](#instalación-y-uso)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [API Reference](#api-reference)
- [Migración desde Código Anterior](#migración-desde-código-anterior)
- [Mejores Prácticas](#mejores-prácticas)

---

## 📖 Descripción General

Los componentes de formulario compartidos son una colección de componentes reutilizables diseñados para mantener consistencia en todos los formularios de la aplicación, específicamente para el registro y edición de coreografías.

### 🎯 Objetivos

- **DRY (Don't Repeat Yourself)**: Eliminar duplicación de código entre formularios
- **Consistencia**: UI y UX uniforme en toda la aplicación
- **Mantenibilidad**: Cambios centralizados se propagan automáticamente
- **Accesibilidad**: Labels, errores y validaciones estandarizadas
- **Escalabilidad**: Fácil de extender para nuevos formularios

### 📦 Ubicación

```
src/
  components/
    forms/
      shared/
        ├── FormFieldWrapper.tsx       # Wrapper para campos con label y errores
        ├── CategorySelect.tsx          # Select de categorías
        ├── DivisionSelect.tsx          # Select de divisiones (cascada)
        ├── SubdivisionSelect.tsx       # Select de subdivisiones
        ├── ModalitySelect.tsx          # Select de modalidades
        └── index.ts                    # Barrel export
```

---

## 🧩 Componentes Disponibles

### 1. FormFieldWrapper

Wrapper universal para campos de formulario que proporciona:

- Label con icono opcional
- Indicador de campo requerido (\*)
- Mensajes de error con validación
- Descripción de ayuda opcional

**Props:**

```typescript
interface FormFieldWrapperProps {
  name: string; // ID del campo
  label: string; // Texto del label
  error?: string; // Mensaje de error
  touched?: boolean; // Si el campo ha sido tocado
  required?: boolean; // Si es requerido (muestra *)
  description?: string; // Texto de ayuda
  icon?: ReactNode; // Icono a mostrar junto al label
  children: ReactNode; // Campo de input/select/textarea
}
```

---

### 2. CategorySelect

Select especializado para categorías de coreografía.

**Características:**

- Integrado con Formik
- Opciones cargadas desde `CATEGORY_OPTIONS`
- Callback `onValueChange` para cascadas

**Props:**

```typescript
interface CategorySelectProps {
  name: string; // Nombre del campo en Formik
  value?: string; // Valor controlado (opcional)
  onValueChange?: (value: string) => void; // Callback al cambiar
  disabled?: boolean; // Deshabilitar select
  error?: boolean; // Mostrar estilo de error
  placeholder?: string; // Texto placeholder
}
```

---

### 3. DivisionSelect

Select especializado para divisiones con dependencia de categoría.

**Características:**

- Depende de `categoryValue` para cargar opciones
- Se deshabilita automáticamente si no hay categoría seleccionada
- Muestra mensaje cuando no hay categoría

**Props:**

```typescript
interface DivisionSelectProps {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
  categoryValue: string; // ⚠️ REQUERIDO: valor de categoría
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
}
```

---

### 4. SubdivisionSelect

Select especializado para subdivisiones.

**Características:**

- Opciones cargadas desde `SUBDIVISION_OPTIONS`
- Sin dependencias de otros campos

**Props:**

```typescript
interface SubdivisionSelectProps {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
}
```

---

### 5. ModalitySelect

Select especializado para modalidades de coreografía.

**Características:**

- Opciones cargadas desde `MODALITIES`
- Sin dependencias de otros campos

**Props:**

```typescript
interface ModalitySelectProps {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
}
```

---

## 🚀 Instalación y Uso

### Importación

```typescript
import {
  FormFieldWrapper,
  CategorySelect,
  DivisionSelect,
  SubdivisionSelect,
  ModalitySelect,
} from "@/components/forms/shared";
```

### Uso Básico

```typescript
import { Field } from "formik";
import { Input } from "@/components/ui/input";
import { FormFieldWrapper } from "@/components/forms/shared";

<FormFieldWrapper
  name='choreographyName'
  label='Nombre de la coreografía'
  error={errors.choreographyName}
  touched={touched.choreographyName}
  required
>
  <Field
    as={Input}
    name='choreographyName'
    placeholder='Ej: Sinfonía del Movimiento'
  />
</FormFieldWrapper>;
```

---

## 💡 Ejemplos de Uso

### Ejemplo 1: Campo de Texto Simple

```typescript
<FormFieldWrapper
  name='musicName'
  label='Nombre de la música'
  error={errors.musicName}
  touched={touched.musicName}
  required
  icon={<Music className='h-4 w-4 text-brand-teal' />}
>
  <Field as={Input} name='musicName' placeholder='Ej: Bolero - Maurice Ravel' />
</FormFieldWrapper>
```

### Ejemplo 2: Textarea con Descripción

```typescript
<FormFieldWrapper
  name='styleDetails'
  label='Detalles del estilo'
  error={errors.styleDetails}
  touched={touched.styleDetails}
  required
  description='Describe el estilo, técnicas utilizadas y características principales'
  icon={<FileText className='h-4 w-4 text-brand-teal' />}
>
  <Field
    as={Textarea}
    name='styleDetails'
    placeholder='Ej: Fusión de contemporáneo y ballet clásico...'
    rows={4}
  />
</FormFieldWrapper>
```

### Ejemplo 3: Cascada de Selects (Categoría → División)

```typescript
const [selectedCategory, setSelectedCategory] = useState("");

// Categoría
<FormFieldWrapper
  name="category"
  label="Categoría"
  error={errors.category}
  touched={touched.category}
  required
>
  <CategorySelect
    name="category"
    error={!!(errors.category && touched.category)}
    onValueChange={(value) => {
      setSelectedCategory(value);
      // Reset campos dependientes
      setFieldValue('division', '');
      setFieldValue('subdivision', '');
    }}
  />
</FormFieldWrapper>

// División (depende de categoría)
<FormFieldWrapper
  name="division"
  label="División"
  error={errors.division}
  touched={touched.division}
  required
>
  <DivisionSelect
    name="division"
    categoryValue={selectedCategory}  // ⚠️ Importante
    error={!!(errors.division && touched.division)}
    onValueChange={(value) => {
      // Reset subdivision al cambiar división
      setFieldValue('subdivision', '');
    }}
  />
</FormFieldWrapper>
```

### Ejemplo 4: Formulario con Arrays (ChoreographySection)

```typescript
// Para arrays de Formik, usar prefix
const prefix = `choreographies[${index}]`;

<Field name={`${prefix}.choreographyName`}>
  {({ field, meta }: any) => (
    <FormFieldWrapper
      name={`${prefix}.choreographyName`}
      label='Nombre de la coreografía'
      error={meta.error}
      touched={meta.touched}
      required
    >
      <Input
        {...field}
        value={field.value || ""}
        placeholder='Ej: Tradición Viva'
      />
    </FormFieldWrapper>
  )}
</Field>;
```

---

## 📚 API Reference

### FormFieldWrapper

| Prop          | Tipo        | Requerido | Default     | Descripción            |
| ------------- | ----------- | --------- | ----------- | ---------------------- |
| `name`        | `string`    | ✅        | -           | ID único del campo     |
| `label`       | `string`    | ✅        | -           | Texto del label        |
| `children`    | `ReactNode` | ✅        | -           | Campo de input         |
| `error`       | `string`    | ❌        | `undefined` | Mensaje de error       |
| `touched`     | `boolean`   | ❌        | `undefined` | Si el campo fue tocado |
| `required`    | `boolean`   | ❌        | `false`     | Muestra asterisco (\*) |
| `description` | `string`    | ❌        | `undefined` | Texto de ayuda         |
| `icon`        | `ReactNode` | ❌        | `undefined` | Icono junto al label   |

### CategorySelect / DivisionSelect / SubdivisionSelect / ModalitySelect

| Prop            | Tipo                      | Requerido | Default     | Descripción             |
| --------------- | ------------------------- | --------- | ----------- | ----------------------- |
| `name`          | `string`                  | ✅        | -           | Nombre del campo Formik |
| `value`         | `string`                  | ❌        | `undefined` | Valor controlado        |
| `onValueChange` | `(value: string) => void` | ❌        | `undefined` | Callback al cambiar     |
| `disabled`      | `boolean`                 | ❌        | `false`     | Deshabilitar select     |
| `error`         | `boolean`                 | ❌        | `false`     | Mostrar estilo error    |
| `placeholder`   | `string`                  | ❌        | Predefinido | Texto placeholder       |
| `categoryValue` | `string`                  | ✅\*      | -           | \*Solo DivisionSelect   |

---

## 🔄 Migración desde Código Anterior

### Antes (código duplicado)

```typescript
// Código duplicado en cada formulario
<div className='space-y-2'>
  <Label htmlFor='name'>
    Nombre <span className='text-red-500'>*</span>
  </Label>
  <Field as={Input} name='name' />
  {errors.name && touched.name && <p className='text-red-600'>{errors.name}</p>}
</div>
```

### Después (usando FormFieldWrapper)

```typescript
<FormFieldWrapper
  name='name'
  label='Nombre'
  error={errors.name}
  touched={touched.name}
  required
>
  <Field as={Input} name='name' />
</FormFieldWrapper>
```

### Checklist de Migración

- [ ] Reemplazar bloques de `<div> + <Label> + error handling` con `FormFieldWrapper`
- [ ] Reemplazar selects de categoría con `CategorySelect`
- [ ] Reemplazar selects de división con `DivisionSelect`
- [ ] Reemplazar selects de subdivisión con `SubdivisionSelect`
- [ ] Reemplazar selects de modalidad con `ModalitySelect`
- [ ] Actualizar estado local para manejar cascadas
- [ ] Verificar que callbacks `onValueChange` resetean campos dependientes

---

## ✅ Mejores Prácticas

### 1. Manejo de Cascadas

Siempre resetea campos dependientes cuando cambia un campo padre:

```typescript
<CategorySelect
  name='category'
  onValueChange={(value) => {
    setSelectedCategory(value);
    // ✅ Reset campos dependientes
    setFieldValue("division", "");
    setFieldValue("subdivision", "");
  }}
/>
```

### 2. Errores de Validación

Convierte errores de Formik a booleanos para los selects:

```typescript
// ✅ Correcto
<CategorySelect
  name="category"
  error={!!(errors.category && touched.category)}
/>

// ❌ Incorrecto
<CategorySelect
  name="category"
  error={errors.category}  // Pasa string, no boolean
/>
```

### 3. Arrays de Formik

Usa prefijos consistentes para arrays:

```typescript
const prefix = `choreographies[${index}]`;

<FormFieldWrapper
  name={`${prefix}.choreographyName`}
  // ...
>
```

### 4. Estado Inicial

Inicializa estado para cascadas desde valores existentes:

```typescript
// ✅ Para edición
const [selectedCategory, setSelectedCategory] = useState(
  choreography.category // Valor existente
);

// ✅ Para creación
const [selectedCategory, setSelectedCategory] = useState("");
```

### 5. Accesibilidad

Siempre usa el prop `required` para campos obligatorios:

```typescript
<FormFieldWrapper
  name="choreographyName"
  label="Nombre de la coreografía"
  required  // ✅ Muestra * y mejora accesibilidad
>
```

### 6. Iconos Consistentes

Usa los mismos iconos en contextos similares:

```typescript
import { Music, User, FileText, Info, Theater } from "lucide-react";

// ✅ Consistente en toda la app
<FormFieldWrapper
  icon={<Music className='h-4 w-4 text-brand-teal' />}
  // ...
/>;
```

---

## 🐛 Troubleshooting

### Problema: DivisionSelect no muestra opciones

**Solución:** Verifica que `categoryValue` esté correctamente asignado:

```typescript
// ❌ Incorrecto
<DivisionSelect name="division" />

// ✅ Correcto
<DivisionSelect
  name="division"
  categoryValue={selectedCategory}  // Debe estar definido
/>
```

### Problema: Errores no se muestran

**Solución:** Verifica que `touched` y `error` estén correctamente pasados:

```typescript
<FormFieldWrapper
  name="name"
  label="Nombre"
  error={errors.name}        // ✅ Debe venir de Formik
  touched={touched.name}     // ✅ Debe venir de Formik
>
```

### Problema: Estado no se resetea en cascadas

**Solución:** Usa `setFieldValue` de Formik, no solo setState:

```typescript
onValueChange={(value) => {
  setSelectedCategory(value);
  // ✅ Resetea en Formik
  setFieldValue('division', '');
  setFieldValue('subdivision', '');
}
```

---

## 📝 Notas de Versión

### v1.0.0 (Actual)

- ✨ Componentes iniciales creados
- 🔧 Soporte para Formik integrado
- 🎨 Estilos consistentes con shadcn/ui
- ♿ Accesibilidad mejorada
- 📱 Responsive por defecto

### Roadmap Futuro

- [ ] Tests unitarios para cada componente
- [ ] Storybook para documentación visual
- [ ] Más variantes de selects (multi-select, autocomplete)
- [ ] Soporte para React Hook Form (además de Formik)
- [ ] Temas personalizables

---

## 🤝 Contribuir

Si necesitas extender o modificar estos componentes:

1. **Discute cambios grandes** con el equipo primero
2. **Mantén la API consistente** - no rompas interfaces existentes
3. **Actualiza esta documentación** con tus cambios
4. **Prueba en múltiples contextos** - tanto creación como edición
5. **Considera retrocompatibilidad** cuando sea posible

---

## 📞 Soporte

Para preguntas o problemas:

- Revisa los [ejemplos de uso](#ejemplos-de-uso)
- Consulta el [troubleshooting](#troubleshooting)
- Contacta al equipo de desarrollo

---

**Última actualización:** Octubre 2025  
**Mantenedor:** Equipo de Desarrollo  
**Licencia:** Interno
