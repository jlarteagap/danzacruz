import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Inicia sesión en tu cuenta
          </h2>
        </div>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button
            type='submit'
            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Iniciar sesión con Google
          </button>
        </form>
      </div>
    </div>
  );
}
