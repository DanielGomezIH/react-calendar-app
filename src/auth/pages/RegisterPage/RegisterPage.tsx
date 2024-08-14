import { AuthLayout } from '@/auth/layout';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { useAuthStore } from '@/hooks';
import { toastErrorStyles } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { RegisterSchema } from './validations/registerSchema';

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export function RegisterPage() {

  const { status, errorMessage, startRegister } = useAuthStore();

  const isCheckingStatus = useMemo( () => status === 'checking', [ status ] );

  const form = useForm<RegisterFormData>( {
    resolver: zodResolver( RegisterSchema ),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  } );

  const onSubmit = ( data: RegisterFormData ) => {
    startRegister( {
      name: data.name,
      email: data.email,
      password: data.password
    } );
  };

  useEffect( () => {

    if ( errorMessage !== null ) {
      toast.error( errorMessage, {
        style: toastErrorStyles,
        duration: 1000
      } );
    }

  }, [ errorMessage ] );

  return (
    <AuthLayout
      title='Register'
      description=' Enter your information to create an account'
    >

      <Form { ...form }>
        <form
          onSubmit={ form.handleSubmit( onSubmit ) }
          className="flex flex-col gap-4"
        >

          <FormField
            control={ form.control }
            name='name'
            render={ ( { field } ) => (
              <FormItem>
                <FormLabel>Name</FormLabel>

                <FormControl>
                  <Input
                    type='text'
                    placeholder='Will'
                    required
                    { ...field }
                    disabled={ isCheckingStatus }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            ) }
          />

          <FormField
            control={ form.control }
            name='email'
            render={ ( { field } ) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    required
                    { ...field }
                    disabled={ isCheckingStatus }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            ) }
          />

          <FormField
            control={ form.control }
            name='password'
            render={ ( { field } ) => (
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    required
                    { ...field }
                    disabled={ isCheckingStatus }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            ) }
          />

          <Button
            type="submit"
            className="w-full"
            disabled={ isCheckingStatus }
          >
            Create an account
          </Button>

        </form>
      </Form>

      <div className="mt-4 text-center text-sm">
        Already have an account?{ " " }
        <Link to="/auth/login" className="underline">
          Login
        </Link>
      </div>

    </AuthLayout>
  );
}
