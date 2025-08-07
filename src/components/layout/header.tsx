"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Menu, 
  Sparkles, 
  User, 
  Settings, 
  LogOut, 
  CreditCard, 
  Image as ImageIcon,
  Bell
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "Générer", href: "/generate" },
  { name: "Galerie", href: "/gallery" },
  { name: "Tarifs", href: "/pricing" },
  { name: "À propos", href: "/about" },
];

export const Header = () => {   
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  console.log(session);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Déconnexion réussie");
    } catch (e) {
      void e
      toast.error("Erreur lors de la déconnexion");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg primary-gradient group-hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                PixelMint
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:bg-accent hover:text-accent-foreground ${
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {session ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                    3
                  </Badge>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {session.user?.name ? getInitials(session.user.name) : "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session.user?.name || "Utilisateur"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Tableau de bord</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/gallery" className="cursor-pointer">
                        <ImageIcon className="mr-2 h-4 w-4" />
                        <span>Mes images</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/pricing" className="cursor-pointer">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Abonnement</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Paramètres</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-600 focus:text-red-600"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Se déconnecter</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="hover:bg-accent">
                    Connexion
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="primary-gradient hover:scale-105 transition-transform">
                    Commencer
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col space-y-2 mt-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-3 py-2 text-lg font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${
                        pathname === item.href
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile User Section */}
                <div className="flex-1 flex flex-col justify-end pb-6">
                  {session ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent/50">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {session.user?.name ? getInitials(session.user.name) : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {session.user?.name || "Utilisateur"}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {session.user?.email}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full justify-start">
                            <User className="mr-2 h-4 w-4" />
                            Tableau de bord
                          </Button>
                        </Link>
                        <Link href="/gallery" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full justify-start">
                            <ImageIcon className="mr-2 h-4 w-4" />
                            Mes images
                          </Button>
                        </Link>
                        <Link href="/settings" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full justify-start">
                            <Settings className="mr-2 h-4 w-4" />
                            Paramètres
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => {
                            handleSignOut();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Se déconnecter
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3 pt-6 border-t">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Connexion
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        <Button className="w-full primary-gradient">
                          Commencer
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};