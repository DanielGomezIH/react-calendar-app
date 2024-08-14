import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUiStore } from '@/hooks';
import { NewEventForm } from '../NewEventForm';

export const NewEventModal = () => {

  const { isDateModalOpen, closeDateModal } = useUiStore();

  return (
    <Dialog open={ isDateModalOpen }>

      <DialogContent
        onCloseClick={ closeDateModal }
        className='max-h-full sm:max-h-[90%] overflow-y-auto'>

        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
          <DialogDescription>
            This modal enables you to create new calendar events. You can input the event title, date and notes. Once saved, the event appears in the calendar.
          </DialogDescription>
        </DialogHeader>

        <NewEventForm />

      </DialogContent>


    </Dialog>
  );
};
