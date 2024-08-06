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
import { EventSchema } from './validations';


export type EventFormData = {
  startDate: Date;
  endDate: Date;
  title: string;
  notes: string;
};

export const NewEventForm = () => {
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
    console.log( data );
  }

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit( onSubmit ) } className="w-full space-y-6">
        <FormField
          control={ form.control }
          name="startDate"
          render={ ( { field } ) => (
            <FormItem>
              <FormLabel>Start date and hour</FormLabel>
              <FormControl>
                <Input type='date' placeholder="Start date" { ...field } />
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />

        <FormField
          control={ form.control }
          name="endDate"
          render={ ( { field } ) => (
            <FormItem>
              <FormLabel>End date and hour</FormLabel>
              <FormControl>
                <Input type='date' placeholder="End date" { ...field } />
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />

        <hr />

        <FormField
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

{/* <div>
          <form className="container">

            <div className="flex flex-col mb-2">
              <label>Fecha y hora inicio</label>
              <input className="form-control" placeholder="Fecha inicio" />
            </div>

            <div className="flex flex-col mb-2">
              <label>Fecha y hora fin</label>
              <input className="form-control" placeholder="Fecha inicio" />
            </div>

            <hr />

            <div className=" mb-2">
              <label>Titulo y notas</label>
              <input
                type="text"
                className="form-control"
                placeholder="Título del evento"
                name="title"
                autoComplete="off"
              />
              <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
              <textarea
                type="text"
                className="form-control"
                placeholder="Notas"
                rows="5"
                name="notes"
              ></textarea>
              <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
              type="submit"
              className="btn btn-outline-primary btn-block"
            >
              <i className="far fa-save"></i>
              <span> Guardar</span>
            </button>

          </form>
        </div> */}
