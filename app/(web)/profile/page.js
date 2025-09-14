import CompleteProfileContainer from "@/components/profile/CompleteProfileContainer";
import AuthRedirectHandler from "@/components/AuthRedirectHandler";
import UserPanel from "@/components/UserPanel";

export const metadata = {
  title: "Completar Perfil | DanzaCruz",
  description:
    "Completa tu perfil para personalizar tu experiencia en nuestra plataforma",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CompleteProfilePage() {
  return (
    <AuthRedirectHandler>
      <CompleteProfileContainer />
    </AuthRedirectHandler>
  );
}
