/**
 * ConfirmDialog component for confirmation actions
 * Features: Accessible confirmation dialogs with customizable actions
 */

import * as React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { cn } from '@/lib/utils';

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
      // Error handling is done in the parent component
      console.error('Confirmation action error:', error);
    }
  };

  const IconComponent = variant === 'destructive' ? AlertTriangle : CheckCircle;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[400px]'>
        <DialogHeader>
          <div className='flex items-center space-x-3'>
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full',
                variant === 'destructive'
                  ? 'bg-destructive/10 text-destructive'
                  : 'bg-primary/10 text-primary'
              )}
            >
              <IconComponent className='h-5 w-5' />
            </div>
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
