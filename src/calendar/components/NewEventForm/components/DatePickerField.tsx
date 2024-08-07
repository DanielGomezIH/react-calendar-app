import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { DateTimePicker } from '@/components/ui/datetime-picker';

import { UseFormReturn } from 'react-hook-form';
import { EventFormData } from '../NewEventForm';

interface DatePickerFieldProps {
  form: UseFormReturn<EventFormData, any, undefined>;
  label: string;
  triggerTitle: string;
  name: "startDate" | "endDate";
  isDisabled: boolean;
}

export const DatePickerField = ( { form, label, triggerTitle, name, isDisabled }: DatePickerFieldProps ) => {

  return (
    <FormField
      disabled={ isDisabled }
      control={ form.control }
      name={ name }
      render={ ( { field } ) => (
        <FormItem className="flex flex-col">
          <FormLabel>{ label }</FormLabel>
          <DateTimePicker
            hourCycle={ 12 }
            value={ field.value }
            onChange={ field.onChange }
            placeholder={ triggerTitle }
            disabled={ isDisabled }
          />
          <FormMessage />
        </FormItem>
      ) }
    />
  );
};



