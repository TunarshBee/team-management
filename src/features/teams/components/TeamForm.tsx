/**
 * TeamForm component for creating and editing teams
 * Features: Sliding side panel, React Hook Form + Zod validation, real-time validation
 */

import { createTeamSchema, updateTeamSchema } from '@/lib/validations';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Select } from '@/shared/components/ui/select';
import SlidingPanel from '@/shared/components/ui/sliding-panel';
import { Textarea } from '@/shared/components/ui/textarea';
import { ETeamStatus, ITeam, ITeamFormData } from '@/types/global';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import * as React from 'react';
import { useForm } from 'react-hook-form';

export interface ITeamFormProps {
  team?: ITeam;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ITeamFormData) => Promise<void>;
  loading: boolean;
  entityOptions: Array<{ value: string; label: string }>;
  managerOptions: Array<{ value: string; label: string }>;
}

const TeamForm: React.FC<ITeamFormProps> = ({
  team,
  isOpen,
  onClose,
  onSubmit,
  loading,
  entityOptions,
  managerOptions,
}) => {
  const isEdit = !!team;
  const schema = isEdit ? updateTeamSchema : createTeamSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
    clearErrors,
  } = useForm<ITeamFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: team?.name || '',
      description: team?.description || '',
      code: team?.code || '',
      email: team?.email || '',
      entity: team?.entity || '',
      manager: team?.manager || '',
      status: team?.status || ETeamStatus.ACTIVE,
    },
    mode: 'onBlur',
  });

  React.useEffect(() => {
    if (isOpen) {
      reset({
        name: team?.name || '',
        description: team?.description || '',
        code: team?.code || '',
        email: team?.email || '',
        entity: team?.entity || '',
        manager: team?.manager || '',
        status: team?.status || ETeamStatus.ACTIVE,
      });
    }
  }, [isOpen, team, reset]);

  const statusOptions = [
    { value: ETeamStatus.ACTIVE, label: ETeamStatus.ACTIVE },
    { value: ETeamStatus.INACTIVE, label: ETeamStatus.INACTIVE },
  ];

  const handleFormSubmit = async (data: ITeamFormData) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleClose = () => {
    reset();
    clearErrors();
    onClose();
  };

  const watchedValues = watch();

  const isNameValid = watchedValues.name && !errors.name;
  const isCodeValid = watchedValues.code && !errors.code;
  const isEmailValid = watchedValues.email && !errors.email;

  return (
    <SlidingPanel
      isOpen={isOpen}
      onClose={handleClose}
      title={isEdit ? 'Edit Team' : 'New Team'}
      width='w-[400px]'
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6'>
        <div>
          <label className='block text-sm font-medium text-bazara-gray mb-2'>
            Entity <span className='text-red-500'>*</span>
          </label>
          <Select
            options={entityOptions}
            value={watchedValues.entity}
            onValueChange={(value) => setValue('entity', value, { shouldValidate: true })}
            placeholder='Access Bank Nigeria'
            error={errors.entity?.message}
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-bazara-gray mb-2'>
            Team Name <span className='text-red-500'>*</span>
          </label>
          <div className='relative'>
            <Input
              {...register('name')}
              placeholder='Enter team name'
              error={errors.name?.message}
              className='pr-10'
            />
            {isNameValid && (
              <Image
                src='/icons/input-check.svg'
                alt='Check Icon'
                width={16}
                height={16}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500'
              />
            )}
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-bazara-gray mb-2'>
            Code <span className='text-red-500'>*</span>
          </label>
          <div className='relative'>
            <Input
              {...register('code')}
              placeholder='Enter team code here'
              error={errors.code?.message}
              maxLength={5}
              style={{ textTransform: 'uppercase' }}
              className='pr-10'
            />
            {isCodeValid && (
              <Image
                src='/icons/input-check.svg'
                alt='Check Icon'
                width={16}
                height={16}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500'
              />
            )}
          </div>
          <p className='text-xs text-bazara-gray-light mt-1'>Min.: 3 and Max.: 5 characters</p>
        </div>

        <div>
          <label className='block text-sm font-medium text-bazara-gray mb-2'>
            Description <span className='text-red-500'>*</span>
          </label>
          <Textarea
            {...register('description')}
            placeholder='Enter the description of this Team'
            error={errors.description?.message}
            rows={4}
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-bazara-gray mb-2'>
            Team Email Address <span className='text-red-500'>*</span>
          </label>
          <div className='relative'>
            <Input
              {...register('email')}
              type='email'
              placeholder='ngit@accessbankplc.com'
              error={errors.email?.message}
              className='pr-10'
            />
            {isEmailValid && (
              <Image
                src='/icons/input-check.svg'
                alt='Check Icon'
                width={16}
                height={16}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500'
              />
            )}
          </div>
          <p className='text-xs text-bazara-gray-light mt-1'>
            Everyone in this Team receives an email whenever a message is sent to this email
            address.
          </p>
        </div>

        <div>
          <label className='block text-sm font-medium text-bazara-gray mb-2'>
            Team Manager <span className='text-red-500'>*</span>
          </label>
          <Select
            options={managerOptions}
            value={watchedValues.manager}
            onValueChange={(value) => setValue('manager', value, { shouldValidate: true })}
            placeholder='Joshua Gladness'
            error={errors.manager?.message}
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-bazara-gray mb-2'>
            Status <span className='text-red-500'>*</span>
          </label>
          <Select
            options={statusOptions}
            value={watchedValues.status}
            onValueChange={(value) =>
              setValue('status', value as ETeamStatus, { shouldValidate: true })
            }
            placeholder='Select status'
            error={errors.status?.message}
          />
        </div>

        <div className='flex space-x-3 pt-6 border-t border-bazara-gray-light'>
          <Button
            type='button'
            variant='outline'
            onClick={handleClose}
            disabled={loading}
            className='flex-1'
          >
            Cancel
          </Button>
          <Button
            type='submit'
            loading={loading}
            disabled={!isValid || loading}
            className='flex-1 bg-bazara-blue hover:bg-bazara-blue/90'
          >
            {isEdit ? 'Update Team' : 'Create Team'}
          </Button>
        </div>
      </form>
    </SlidingPanel>
  );
};

export default TeamForm;
