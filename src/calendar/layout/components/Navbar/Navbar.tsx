import { useAuthStore } from '@/hooks';
import { MenuUser, MenuWeb } from './components';

export const Navbar = () => {

  const { user, startLogout } = useAuthStore();

  return (
    <header className="sticky top-0 flex justify-between h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">

      <MenuWeb />

      <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
        <p className="text-foreground text-lg font-semibold md:text-base">
          { user.name! }
        </p>

        <MenuUser
          logout={ startLogout }
          name={ user.name! }
        />
      </div>
    </header>
  );
};
