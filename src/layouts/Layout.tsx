import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  Building2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type LayoutProps = {
  children?: React.ReactNode; // 'children' reste optionnel ici si vous utilisez 'Outlet'
};

const Sidebar: React.FC<{ collapsed: boolean; toggleSidebar: () => void }> = ({
  collapsed,
  toggleSidebar,
}) => (
  <TooltipProvider>
    <div
      className={`bg-blue-800 text-white h-screen p-4 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex justify-between items-center mb-8">
        {!collapsed && <h1 className="text-2xl font-bold">Dental</h1>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <nav>
        <ul className="space-y-2">
          {[
            {
              icon: LayoutDashboard,
              label: "Dashboard",
              path: "/admin/dashboard",
            },
            { icon: UserCircle, label: "Dentistes", path: "/admin/dentistes" },
            { icon: Users, label: "Utilisateurs", path: "/admin/utilisateurs" },
            { icon: Users, label: "Comités", path: "/admin/comites" },
            {
              icon: Building2,
              label: "Départements",
              path: "/admin/departements",
            },
          ].map(({ icon: Icon, label, path }) => (
            <li key={label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={path}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        collapsed ? "px-2" : ""
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${collapsed ? "mr-0" : "mr-2"}`}
                      />
                      {!collapsed && label}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">{label}</TooltipContent>
                )}
              </Tooltip>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-start ${collapsed ? "px-2" : ""}`}
            >
              <LogOut className={`h-4 w-4 ${collapsed ? "mr-0" : "mr-2"}`} />
              {!collapsed && "Déconnexion"}
            </Button>
          </TooltipTrigger>
          {collapsed && (
            <TooltipContent side="right">Déconnexion</TooltipContent>
          )}
        </Tooltip>
      </div>
    </div>
  </TooltipProvider>
);

const Navbar = () => (
  <div className="bg-white shadow-md p-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-blue-800">Dashboard</h1>
    <div className="flex items-center space-x-4">
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="@user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-xs leading-none text-muted-foreground">
                john@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profil</DropdownMenuItem>
          <DropdownMenuItem>Déconnexion</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);

const Layout: React.FC<LayoutProps> = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-auto p-8">
          <Outlet /> {/* Outlet pour afficher les routes imbriquées */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
