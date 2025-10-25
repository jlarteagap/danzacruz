// components/layout/Header.tsx
"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Menu } from "lucide-react";

export function PanelHeader() {
  return (
    <header className='h-16 w-full border-b bg-white px-4 flex items-center justify-between shadow-sm'>
      {/* Left Section */}
      <div className='flex items-center gap-4'>
        {/* Burger for mobile */}
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu className='h-5 w-5' />
        </Button>
        <Link href='/dashboard' className='text-lg font-bold text-primary'>
          Danzacruz
        </Link>
      </div>
    </header>
  );
}
