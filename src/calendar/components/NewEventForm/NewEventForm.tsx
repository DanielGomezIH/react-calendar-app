import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { useState } from 'react';
import { DatePickerField } from './components';
import { EventSchema } from './validations';


export type EventFormData = {
  startDate: Date;
  endDate: Date;
  title: string;
  notes: string;
};

export const NewEventForm = () => {

  const [ isFormSubmitted, setIsFormSubmitted ] = useState<boolean>( false );

  const form = useForm<EventFormData>( {
    resolver: zodResolver( EventSchema ),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      title: "",
      notes: "",
    },
  } );

  function onSubmit( data: EventFormData ) {
    setIsFormSubmitted( true );
    console.log( data );
  }


  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit( onSubmit ) } className="w-full space-y-6">

        <DatePickerField
          isDisabled={ isFormSubmitted }
          form={ form }
          name="startDate"
          label='Start date and hour'
          triggerTitle='Pick a date'
        />

        <DatePickerField
          isDisabled={ isFormSubmitted }
          form={ form }
          name="endDate"
          label='End date and hour'
          triggerTitle='Pick a date'
        />

        <hr />

        <FormField
          disabled={ isFormSubmitted }
          control={ form.control }
          name="title"
          render={ ( { field } ) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type='text' placeholder="Event title" { ...field } />
              </FormControl>
              <FormDescription>
                Write a short description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          ) }
        />

        <FormField
          disabled={ isFormSubmitted }
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
                />
              </FormControl>
              <FormDescription>
                You can add aditional information.
              </FormDescription>
              <FormMessage />
            </FormItem>
          ) }
        />

        <Button disabled={ isFormSubmitted } type="submit">Create</Button>
      </form>
    </Form>
  );
};

