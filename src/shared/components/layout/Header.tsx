'use client';

import { Button } from '@/shared/components/ui/button';
import { SearchInput } from '@/shared/components/ui/search-input';
import { PRIMARY_NAV_ITEMS } from '@/shared/constants/navigation';
import Image from 'next/image';
import * as React from 'react';

const Header: React.FC = () => {
  return (
    <header
      className='border-b border-[#EBEBEB] px-10 py-4 flex items-center justify-between'
      role='banner'
    >
      <div className='flex items-center gap-10'>
        <div className='flex items-center gap-1'>
          <Image src='/images/logo.png' alt='Bazara logo' width={22} height={22} />
          <span className='text-bazara-blue font-semibold text-[17.06px] leading-[21.18px] font-montserrat'>
            Bazara
          </span>
        </div>
        <div className='flex-1 mr-6'>
          <SearchInput
            placeholder='Search for anything'
            className='border-bazara-gray-light rounded-md focus:ring-2 focus:ring-bazara-blue focus:border-transparent'
            ariaLabel='Search the application'
            id='main-search'
          />
        </div>
      </div>

      <nav
        className='flex items-center gap-6'
        role='navigation'
        aria-label='Main navigation'
        id='main-navigation'
      >
        {PRIMARY_NAV_ITEMS.map((item) => (
          <Button
            key={item.id}
            variant='ghost'
            className={`px-2 py-1 rounded-md text-sm leading-[18px] ${
              item.isActive
                ? 'bg-bazara-blue-light text-bazara-blue hover:bg-bazara-blue hover:text-background'
                : 'text-bazara-gray hover:bg-bazara-blue hover:text-background'
            }`}
            aria-current={item.isActive ? 'page' : undefined}
            aria-label={`Navigate to ${item.label}`}
          >
            {item.label}
          </Button>
        ))}
      </nav>
      <div className='flex items-center space-x-6 ml-6' role='toolbar' aria-label='User actions'>
        <div className='w-px h-6 bg-bazara-gray-light' aria-hidden='true'></div>
        <Button variant='ghost' size='icon' aria-label='View notifications' aria-haspopup='menu'>
          <Image src='/icons/notification.svg' alt='' width={32} height={32} aria-hidden='true' />
        </Button>
        <Button variant='ghost' size='icon' aria-label='More options' aria-haspopup='menu'>
          <Image src='/icons/more.svg' alt='' width={32} height={32} aria-hidden='true' />
        </Button>
        <Button variant='ghost' size='icon' aria-label='User profile' aria-haspopup='menu'>
          <Image src='/images/user.png' alt='' width={36} height={36} aria-hidden='true' />
        </Button>
      </div>
    </header>
  );
};

export default Header;
