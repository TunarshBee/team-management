import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import Image from 'next/image';
import * as React from 'react';

export interface IConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  loading?: boolean;
}

const ConfirmDialog: React.FC<IConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  loading = false,
}) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Confirmation action error:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[400px]'>
        <DialogHeader>
          <div className='flex items-center space-x-3'>
            {variant === 'destructive' ? (
              <div className='flex h-10 w-10 items-center justify-center'>
                <Image src='/icons/warning-icon.svg' alt='Warning Icon' width={64} height={64} />
              </div>
            ) : (
              <div className='flex h-10 w-10 items-center justify-center'>
                <Image src='/icons/info-icon.svg' alt='Info Icon' width={64} height={64} />
              </div>
            )}
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription className='pt-2'>{message}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant='outline' onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant={variant === 'destructive' ? 'destructive' : 'default'}
            onClick={handleConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
