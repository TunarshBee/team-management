'use client';

import { Button } from '@/shared/components/ui/button';
import { SearchInput } from '@/shared/components/ui/search-input';
import { PRIMARY_NAV_ITEMS } from '@/shared/constants/navigation';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className='border-b border-[#EBEBEB] px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between relative'
      role='banner'
    >
      <div className='flex items-center gap-4 lg:gap-10 flex-1 min-w-0'>
        <div className='flex items-center gap-1 flex-shrink-0'>
          <Image src='/images/logo.png' alt='Bazara logo' width={22} height={22} />
          <span className='text-bazara-blue font-semibold text-sm sm:text-base lg:text-[17.06px] leading-[21.18px] font-montserrat'>
            Bazara
          </span>
        </div>
        <div className='hidden md:flex flex-1 max-w-md mx-4'>
          <SearchInput
            placeholder='Search for anything'
            className='border-bazara-gray-light rounded-md focus:ring-2 focus:ring-bazara-blue focus:border-transparent'
            ariaLabel='Search the application'
            id='main-search'
          />
        </div>
      </div>

      <nav
        className='hidden lg:flex items-center gap-6'
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
      <div
        className='hidden lg:flex items-center space-x-6 ml-6'
        role='toolbar'
        aria-label='User actions'
      >
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

      <Button
        variant='ghost'
        size='icon'
        className='lg:hidden'
        onClick={toggleMobileMenu}
        aria-label='Toggle mobile menu'
        aria-expanded={isMobileMenuOpen}
        aria-controls='mobile-menu'
      >
        {isMobileMenuOpen ? (
          <X className='h-6 w-6' aria-hidden='true' />
        ) : (
          <Menu className='h-6 w-6' aria-hidden='true' />
        )}
      </Button>

      {isMobileMenuOpen && (
        <div
          id='mobile-menu'
          className='absolute top-full left-0 right-0 bg-white border-b border-[#EBEBEB] shadow-lg z-50 lg:hidden'
          role='navigation'
          aria-label='Mobile navigation'
        >
          <div className='p-4 border-b border-[#EBEBEB]'>
            <SearchInput
              placeholder='Search for anything'
              className='border-bazara-gray-light rounded-md focus:ring-2 focus:ring-bazara-blue focus:border-transparent'
              ariaLabel='Search the application'
              id='mobile-search'
            />
          </div>

          <div className='p-4'>
            <nav className='flex flex-col space-y-2'>
              {PRIMARY_NAV_ITEMS.map((item) => (
                <Button
                  key={item.id}
                  variant='ghost'
                  className={`justify-start px-3 py-2 rounded-md text-sm ${
                    item.isActive
                      ? 'bg-bazara-blue-light text-bazara-blue'
                      : 'text-bazara-gray hover:bg-bazara-blue-light'
                  }`}
                  aria-current={item.isActive ? 'page' : undefined}
                  aria-label={`Navigate to ${item.label}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>

          <div className='p-4 border-t border-[#EBEBEB] flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Button
                variant='ghost'
                size='icon'
                aria-label='View notifications'
                aria-haspopup='menu'
              >
                <Image
                  src='/icons/notification.svg'
                  alt=''
                  width={24}
                  height={24}
                  aria-hidden='true'
                />
              </Button>
              <Button variant='ghost' size='icon' aria-label='More options' aria-haspopup='menu'>
                <Image src='/icons/more.svg' alt='' width={24} height={24} aria-hidden='true' />
              </Button>
            </div>
            <Button variant='ghost' size='icon' aria-label='User profile' aria-haspopup='menu'>
              <Image src='/images/user.png' alt='' width={32} height={32} aria-hidden='true' />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
