import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Calendar, Menu } from 'lucide-react';

export const MenuMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menú de usuario</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Calendar className="h-6 w-6" />
            <span className="sr-only">Calendar App</span>
          </Link>

          <Link to="/" className="hover:text-foreground">
            Dashboard
          </Link>

          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground"
          >
            Orders
          </Link>

          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground"
          >
            Products
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};