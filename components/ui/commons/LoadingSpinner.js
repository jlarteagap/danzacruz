export default function LoadingSpinner({ size = "medium" }) {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  return (
    <div
      className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}
      role='status'
      aria-label='Cargando...'
    >
      <span className='sr-only'>Cargando...</span>
    </div>
  );
}
