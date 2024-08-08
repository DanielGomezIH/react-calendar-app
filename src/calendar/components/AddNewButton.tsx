import { Button } from '@/components/ui/button';
import { useCalendarStore, useUiStore } from '@/hooks';
import { addHours } from 'date-fns';
import { Plus } from 'lucide-react';

export const AddNewButton = () => {

  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const onClickNew = () => {
    setActiveEvent( {
      _id: null,
      start: new Date(),
      end: addHours( new Date(), 2 ),
      title: '',
      notes: '',
      bgColor: '#fafafa',
      user: {
        _id: 123,
        name: 'Daniel',
      },
    } );
    openDateModal();
  };

  return (
    <Button
      className="fixed rounded-full bottom-6 right-6 h-auto w-auto p-2"
      onClick={ onClickNew }
    >
      <Plus size={ 20 } />
    </Button>
  );
};