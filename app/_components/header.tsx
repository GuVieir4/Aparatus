"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const Header = () => {
  const { data: session } = authClient.useSession();

  async function handleLogin() {
    await authClient.signIn.social({
      provider: "google",
    });
  }
  async function handleLogout() {
    await authClient.signOut();
  }

  return (
    <header className="flex items-center justify-between bg-white px-5 py-6">
      <Image src="/logo.svg" alt="Aparatus" width={100} height={26.09} />
      <div className="flex items-center gap-2">
        {session ? (
          <Button variant="outline" onClick={handleLogout}>
            <LogOutIcon className="mr-2" />
            Sair
          </Button>
        ) : (
          <Button variant="outline" onClick={handleLogin}>
            <LogInIcon className="mr-2" />
            Entrar
          </Button>
        )}
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </div>
    </header>
  );
};

export default Header;
