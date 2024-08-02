import { MenuWeb, MenuMobile, MenuUser } from './';

export const Navbar = () => {
  return (
    <header className="sticky top-0 flex justify-between h-16 items-center gap-4 border-b bg-background px-4 md:px-6">

      <MenuWeb />

      <MenuMobile />

      <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
        <MenuUser />
      </div>

    </header>
  );
};
