import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { useCalendarStore, useUiStore } from '@/hooks';
import { Event } from '@/models';
import { zodResolver } from "@hookform/resolvers/zod";
import { addHours } from 'date-fns';
import { useForm } from "react-hook-form";
import { DatePickerField } from './components';
import { EventSchema } from './validations';

export const NewEventForm = () => {
  const { closeDateModal } = useUiStore();

  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [ isFormSubmitted, setIsFormSubmitted ] = useState<boolean>( false );

  const buttonMessage = activeEvent?.id === null ? 'Create' : 'Update';

  const form = useForm<Event>( {
    resolver: zodResolver( EventSchema ),
    defaultValues: {
      id: null,
      start: new Date(),
      end: addHours( new Date(), 2 ),
      title: "",
      notes: "",
      user: {
        _id: null,
        name: null,
      },
    },
  } );

  const onSubmit = async ( data: Event ) => {

    setIsFormSubmitted( true );

    if ( data.notes === '' ) {
      delete data.notes;
    }

    await startSavingEvent( data );

    closeDateModal();

    setIsFormSubmitted( false );
  };

  useEffect( () => {
    if ( activeEvent !== null ) {

      if ( activeEvent.notes ) {
        form.setValue( 'notes', activeEvent.notes );
      }

      form.setValue( 'id', activeEvent.id );
      form.setValue( 'start', activeEvent.start );
      form.setValue( 'end', activeEvent.end );
      form.setValue( 'title', activeEvent.title );
      form.setValue( 'user', activeEvent.user );
    }
  }, [ activeEvent ] );

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit( onSubmit ) } className="w-full space-y-6">

        <DatePickerField
          isDisabled={ isFormSubmitted }
          form={ form }
          name="start"
          label='Start date and hour'
          placeHolder='Pick a date'
        />

        <DatePickerField
          isDisabled={ isFormSubmitted }
          form={ form }
          name="end"
          label='End date and hour'
          placeHolder='Pick a date'
        />

        <hr />

        <FormField
          control={ form.control }
          name="title"
          render={ ( { field } ) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder="Event title"
                  { ...field }
                  disabled={ isFormSubmitted }
                />
              </FormControl>
              <FormDescription>
                Write a short description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          ) }
        />

        <FormField
          control={ form.control }
          name="notes"
          render={ ( { field } ) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What do you want to write today?"
                  className="resize-none"
                  { ...field }
                  disabled={ isFormSubmitted }
                />
              </FormControl>
              <FormDescription>
                You can add additional information.
              </FormDescription>
              <FormMessage />
            </FormItem>
          ) }
        />

        <Button
          type="submit"
          disabled={ isFormSubmitted }
        >
          { buttonMessage }
        </Button>
      </form>
    </Form>
  );
};
