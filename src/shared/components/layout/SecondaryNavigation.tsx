'use client';

import { Button } from '@/shared/components/ui/button';
import { BREADCRUMB_ITEMS, SECONDARY_NAV_ITEMS } from '@/shared/constants/navigation';
import { ArrowLeft, CircleX } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

const SecondaryNavigation: React.FC = () => {
  return (
    <div className=''>
      <div className='bg-bazara-blue fixed top-[68px] left-0 right-0 z-10 pt-[6px] px-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-[26px]'>
            <Image
              src='/icons/home-2.svg'
              alt='Home icon'
              width={32}
              height={32}
              aria-hidden='true'
            />
            <div className='bg-secondary-background px-6 py-[6px] rounded-t-lg flex items-center gap-6'>
              {SECONDARY_NAV_ITEMS.map((item) => (
                <React.Fragment key={item.id}>
                  <span
                    className={`font-medium ${item.isActive ? 'text-foreground' : 'text-bazara-gray-light'}`}
                    aria-current={item.isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='w-4 h-4 p-0 hover:bg-bazara-gray-light rounded-full'
                    aria-label={`Close ${item.label} tab`}
                  >
                    <CircleX
                      className='w-4 h-4 text-bazara-gray'
                      color='#808080'
                      aria-hidden='true'
                    />
                  </Button>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className='flex items-center space-x-2'></div>
        </div>
      </div>
      <nav
        className='flex items-center space-x-3 px-10 bg-secondary-background py-6 mt-[40px]'
        aria-label='Breadcrumb navigation'
      >
        <button
          className='w-6 h-6 border border-bazara-gray-light rounded-full flex items-center justify-center hover:bg-bazara-gray-light transition-colors'
          aria-label='Go back'
        >
          <ArrowLeft className='w-3 h-3 text-bazara-gray-light' aria-hidden='true' />
        </button>

        <ol className='flex items-center space-x-2' role='list'>
          {BREADCRUMB_ITEMS.map((item, index) => (
            <React.Fragment key={`breadcrumb-${item.id}`}>
              <li role='listitem'>
                <span
                  className={`text-sm ${item.isActive ? 'text-foreground font-semibold' : 'text-bazara-gray-light'}`}
                  aria-current={item.isActive ? 'page' : undefined}
                >
                  {item.label}
                </span>
              </li>
              {index < BREADCRUMB_ITEMS.length - 1 && (
                <li role='separator' aria-hidden='true'>
                  <span className='text-bazara-gray-light text-sm'>/</span>
                </li>
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default SecondaryNavigation;
