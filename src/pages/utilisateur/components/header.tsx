import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { LogOut, User } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg transform transition-transform duration-200 hover:scale-110" />
            <span className="font-bold text-xl text-blue-900">DashPro</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/utilisateur" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group">
            Systems
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
          </Link>
          <Link to="/illustrations" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group">
            Illustrations
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
          </Link>
          <Link to="/templates" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group">
            Templates
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
          </Link>
          <Link to="/mockups" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative group">
            Mockups
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-blue-100 transition-colors duration-200"
                aria-label="User menu"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg?height=32&width=32"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

