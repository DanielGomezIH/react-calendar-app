import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from 'react';
import { NewEventForm } from '../NewEventForm';

export const NewEventModal = ( { triggerTitle } ) => {

  const [ isOpen, setIsOpen ] = useState( true );

  return (
    <Dialog open={ isOpen } onOpenChange={ setIsOpen }>

      <DialogTrigger>{ triggerTitle }</DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
          <DialogDescription>
            This modal enables you to create new calendar events. You can input the event title, date and notes. Once saved, the event appears in the calendar.
          </DialogDescription>
        </DialogHeader>

        <div>
          <NewEventForm />
        </div>

      </DialogContent>

    </Dialog>
  );
};
