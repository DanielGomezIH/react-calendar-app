import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MenuWeb = () => {
  return (
    <nav className="font-medium flex items-center gap-4 md:gap-2 text-sm lg:gap-4">
      <Link
        to="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Calendar className="h-6 w-6" />
        <span className="sr-only">Calendar App</span>
      </Link>

      <Link
        to="/"
        className="hidden md:flex text-foreground transition-colors hover:text-foreground"
      >
        Calendar
      </Link>
    </nav>
  );
};