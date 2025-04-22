'use client'
import { useState } from "react";
import Link from "next/link";
import { Building2, GraduationCap, Search, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b bg-white relative">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-[#1e3a8a] flex items-center justify-center">
              <span className="text-white font-bold">SNU</span>
            </div>
            <span className="font-bold text-xl text-[#1e3a8a]">CareerConnect</span>
          </Link>

          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input className="w-[300px] pl-10 rounded-full border-gray-300" placeholder="Search Opportunities" />
          </div>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="#internships" className={navigationMenuTriggerStyle()}>
                  Internships
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#jobs" className={navigationMenuTriggerStyle()}>
                  Jobs
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#competitions" className={navigationMenuTriggerStyle()}>
                  Competitions
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link className="cursor-pointer" href="/studentLogin">
            <Button size="lg" className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90">
              <GraduationCap className="mr-2 h-5 w-5" /> Student Sign Up
            </Button>
          </Link>
          <Link className="cursor-pointer" href="/companyLogin">
            <Button
              size="lg"
              variant="outline"
              className="border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b]/10 hover:text-[#f59e0b]"
            >
              <Building2 className="mr-2 h-5 w-5" /> For Business
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-600" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input className="w-full pl-10 rounded-full border-gray-300" placeholder="Search Opportunities" />
            </div>
            
            <div className="flex flex-col gap-2">
              <Link href="#internships" className="py-2 px-4 hover:bg-gray-100 rounded-md">
                Internships
              </Link>
              <Link href="#jobs" className="py-2 px-4 hover:bg-gray-100 rounded-md">
                Jobs
              </Link>
              <Link href="#competitions" className="py-2 px-4 hover:bg-gray-100 rounded-md">
                Competitions
              </Link>
            </div>

            <div className="flex flex-col gap-3 pt-2 border-t border-gray-200">
              <Link className="w-full" href="/studentLogin">
                <Button size="lg" className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90">
                  <GraduationCap className="mr-2 h-5 w-5" /> Student Sign Up
                </Button>
              </Link>
              <Link className="w-full" href="/companyLogin">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b]/10 hover:text-[#f59e0b]"
                >
                  <Building2 className="mr-2 h-5 w-5" /> For Business
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}