/**
 * Header component matching the Bazara design
 * Features: Logo, search bar, navigation tabs, user icons
 */

"use client";

import * as React from "react";
import { Search, User } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import Image from "next/image";
import { PRIMARY_NAV_ITEMS } from "@/shared/constants/navigation";

const Header: React.FC = () => {
  return (
    <header className="border-b border-[#EBEBEB] px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-1">
            <Image src="/images/logo.png" alt="Bazara" width={22} height={22} />
            <span className="text-bazara-blue font-semibold text-[17.06px] leading-[21.18px] font-montserrat">Bazara</span>
          </div>
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bazara-gray w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for anything"
                className="pl-10 pr-4 py-2 w-full border-bazara-gray-light rounded-md focus:ring-2 focus:ring-bazara-blue focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Center-Right - Primary Navigation Links */}
        <div className="flex items-center gap-6">
          {PRIMARY_NAV_ITEMS.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`px-2 py-1 rounded-md text-sm leading-[18px] ${
                item.isActive
                  ? 'bg-bazara-blue-light text-bazara-blue hover:bg-bazara-blue hover:text-background'
                  : 'text-bazara-gray hover:bg-bazara-blue hover:text-background'
              }`}
            >
              {item.label}
            </Button>
          ))}
        </div>
        {/* <Button
            variant="ghost"
            className="bg-bazara-blue-light text-bazara-blue hover:bg-bazara-blue hover:text-background px-2 py-1 rounded-md text-sm leading-[18px]"
          >
            Home
          </Button> */}
        {/* Right Side - User/App Icons */}
        <div className="flex items-center space-x-6 ml-6">
          <div className="w-px h-6 bg-bazara-gray-light"></div>
          <Button
            variant="ghost"
            size="icon"
            className="text-bazara-gray-light hover:bg-bazara-gray-light"
          >
            <Image src="/icons/notification.svg" alt="Bell" width={32} height={32} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
          >
            <Image src="/icons/more.svg" alt="Grid" width={32} height={32} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-bazara-blue hover:bg-bazara-blue/90 rounded-full"
          >
            <User className="w-5 h-5 text-background" />
          </Button>
        </div>
    </header>
  );
};

export default Header;
