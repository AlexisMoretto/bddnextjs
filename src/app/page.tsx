'use client'
import { useRouter } from 'next/navigation';
import Home from "./home/page";
import Login from "./login/page";
import Register from "./register/page";

export default function Page() {
  const router = useRouter();
  // Par défaut, affiche "register" s'il n'y a pas de paramètre
  const view = router.query?.view || 'register'; 
  return (
    <div>
      {view === "register" && <Register />}
      {view === "home" && <Home />}
      {view === "login" && <Login />}
    </div>
  );
}
