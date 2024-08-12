import { AuthLayout } from '@/auth/layout';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { LoginSchema } from './validations/loginSchema';
import { useState } from 'react';

export interface LoginFormData {
  email: string,
  password: string;
}

export function LoginPage() {

  const [ isFormSubmitted, setIsFormSubmitted ] = useState<boolean>( false );

  const form = useForm<LoginFormData>( {
    resolver: zodResolver( LoginSchema ),
    defaultValues: {
      email: '',
      password: ''
    }
  } );

  const onSubmit = ( data: LoginFormData ) => {
    setIsFormSubmitted( true );
    console.log( data );
  };

  return (
    <AuthLayout
      title='Login'
      description='Enter your email below to login to your account'
    >
      <Form { ...form }>
        <form
          onSubmit={ form.handleSubmit( onSubmit ) }
          className="flex flex-col gap-4"
        >

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
                    disabled={ isFormSubmitted }
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

                <div className="flex justify-between items-center w-full">
                  <FormLabel>Password</FormLabel>

                  <Link to="#" className="text-sm underline">
                    Forgot your password?
                  </Link>
                </div>

                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    required
                    { ...field }
                    disabled={ isFormSubmitted }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            ) }
          />

          <Button
            type="submit"
            className="w-full"
            disabled={ isFormSubmitted }>
            Login
          </Button>

        </form>
      </Form>

      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{ " " }
        <Link to="/auth/register" className="underline">
          Sign up
        </Link>
      </div>

    </AuthLayout >
  );
}
