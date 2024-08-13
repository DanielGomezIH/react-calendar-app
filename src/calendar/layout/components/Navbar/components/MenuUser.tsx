import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAvatar } from '@/hooks';
import { CircleUser } from 'lucide-react';

interface MenuUserProps {
  logout: () => void,
  name: string;
}

export const MenuUser = ( { logout, name }: MenuUserProps ) => {

  const { avatar } = useAvatar( name );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>

        <Button variant="secondary" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage
              src={ `data:image/svg+xml;utf8,${ encodeURIComponent( avatar ) }` } />
            <AvatarFallback>
              <CircleUser className="h-8 w-8" />
              <span className="sr-only">Toogle user menu</span>
            </AvatarFallback>
          </Avatar>
        </Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={ logout }>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};