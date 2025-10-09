'use client';

import { Button } from '@/shared/components/ui/button';
import { SearchInput } from '@/shared/components/ui/search-input';
import { PRIMARY_NAV_ITEMS } from '@/shared/constants/navigation';
import Image from 'next/image';
import * as React from 'react';

const Header: React.FC = () => {
  return (
    <header className='border-b border-[#EBEBEB] px-10 py-4 flex items-center justify-between'>
      <div className='flex items-center gap-10'>
        <div className='flex items-center gap-1'>
          <Image src='/images/logo.png' alt='Bazara' width={22} height={22} />
          <span className='text-bazara-blue font-semibold text-[17.06px] leading-[21.18px] font-montserrat'>
            Bazara
          </span>
        </div>
        <div className='flex-1 mr-6'>
          <SearchInput
            placeholder='Search for anything'
            className='border-bazara-gray-light rounded-md focus:ring-2 focus:ring-bazara-blue focus:border-transparent'
          />
        </div>
      </div>

      <div className='flex items-center gap-6'>
        {PRIMARY_NAV_ITEMS.map((item) => (
          <Button
            key={item.id}
            variant='ghost'
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
      <div className='flex items-center space-x-6 ml-6'>
        <div className='w-px h-6 bg-bazara-gray-light'></div>
        <Button variant='ghost' size='icon'>
          <Image src='/icons/notification.svg' alt='Bell' width={32} height={32} />
        </Button>
        <Button variant='ghost' size='icon'>
          <Image src='/icons/more.svg' alt='Grid' width={32} height={32} />
        </Button>
        <Button variant='ghost' size='icon'>
          <Image src='/images/user.png' alt='User' width={36} height={36} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
