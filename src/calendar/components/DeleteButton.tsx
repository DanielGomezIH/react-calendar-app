import { Button } from '@/components/ui/button';
import { useCalendarStore, useUiStore } from '@/hooks';
import { Trash } from 'lucide-react';

export const DeleteButton = () => {

  const { isDateModalOpen } = useUiStore();
  const { activeEvent, startDeletingEvent } = useCalendarStore();

  const showDeleteButton = activeEvent !== null && activeEvent.id !== null && isDateModalOpen === false;

  const onClickNew = () => {
    startDeletingEvent( activeEvent! );
  };

  return (
    <>
      { showDeleteButton && (
        <Button
          variant='destructive'
          className="fixed rounded-full bottom-[70px] right-6 h-auto w-auto p-2"
          onClick={ onClickNew }
        >
          <Trash size={ 20 } />
        </Button>
      ) }
    </>
  );
};