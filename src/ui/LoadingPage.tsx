import { Loader } from 'lucide-react';

export const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen magicpattern">
      <Loader className="h-8 w-8 animate-spin text-navy-600" aria-label='Loader'/>
    </div>
  );
};
