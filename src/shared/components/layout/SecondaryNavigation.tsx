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
            <Image src='/icons/home-2.svg' alt='Home' width={32} height={32} />
            <div className='bg-secondary-background px-6 py-[6px] rounded-t-lg flex items-center gap-6'>
              {SECONDARY_NAV_ITEMS.map((item) => (
                <React.Fragment key={item.id}>
                  <span
                    className={`font-medium ${item.isActive ? 'text-foreground' : 'text-bazara-gray-light'}`}
                  >
                    {item.label}
                  </span>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='w-4 h-4 p-0 hover:bg-bazara-gray-light rounded-full'
                  >
                    <CircleX className='w-4 h-4 text-bazara-gray' color='#808080' />
                  </Button>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className='flex items-center space-x-2'></div>
        </div>
      </div>
      <div className='flex items-center space-x-3 px-10 bg-secondary-background py-6 mt-[40px]'>
        <button className='w-6 h-6 border border-bazara-gray-light rounded-full flex items-center justify-center hover:bg-bazara-gray-light transition-colors'>
          <ArrowLeft className='w-3 h-3 text-bazara-gray-light' />
        </button>

        <div className='flex items-center space-x-2'>
          {BREADCRUMB_ITEMS.map((item, index) => (
            <React.Fragment key={`breadcrumb-${item.id}`}>
              <span
                className={`text-sm ${item.isActive ? 'text-foreground font-semibold' : 'text-bazara-gray-light'}`}
              >
                {item.label}
              </span>
              {index < BREADCRUMB_ITEMS.length - 1 && (
                <span className='text-bazara-gray-light text-sm'>/</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondaryNavigation;
