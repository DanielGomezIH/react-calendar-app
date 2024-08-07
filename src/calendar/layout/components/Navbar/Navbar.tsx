import { MenuMobile, MenuUser, MenuWeb } from './components';

export const Navbar = () => {
  return (
    <header className="sticky top-0 flex justify-between h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">

      <MenuWeb />

      <MenuMobile />

      <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
        <p className="text-foreground text-lg font-semibold md:text-base">Daniel Gómez</p>
        <MenuUser />
      </div>

    </header>
  );
};
