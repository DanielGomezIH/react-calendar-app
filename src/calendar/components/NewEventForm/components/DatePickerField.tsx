import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { DateTimePicker } from '@/components/ui/datetime-picker';

import { Event } from '@/models';
import { UseFormReturn } from 'react-hook-form';

interface DatePickerFieldProps {
  form: UseFormReturn<Event, any, undefined>;
  label: string;
  placeHolder: string;
  name: "start" | "end";
  isDisabled: boolean;
}

export const DatePickerField = ( { form, label, placeHolder, name, isDisabled }: DatePickerFieldProps ) => {

  return (
    <FormField
      control={ form.control }
      name={ name }
      render={ ( { field } ) => (
        <FormItem className="flex flex-col">
          <FormLabel>{ label }</FormLabel>
          <DateTimePicker
            hourCycle={ 12 }
            value={ field.value }
            onChange={ field.onChange }
            placeholder={ placeHolder }
            disabled={ isDisabled }
          />
          <FormMessage />
        </FormItem>
      ) }
    />
  );
};



