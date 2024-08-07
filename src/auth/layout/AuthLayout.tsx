import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

type AuthLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export const AuthLayout = ( { title, description, children }: AuthLayoutProps ) => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen magicpattern">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">{ title }</CardTitle>
          <CardDescription>
            { description }
          </CardDescription>
        </CardHeader>

        <CardContent>
          { children }
        </CardContent>
      </Card>
    </div>
  );
};