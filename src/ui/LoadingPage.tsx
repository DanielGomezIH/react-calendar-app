import { Loader } from 'lucide-react';

export const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen magicpattern">
      <Loader className="h-7 w-7 animate-spin" />
    </div>
  );
};
