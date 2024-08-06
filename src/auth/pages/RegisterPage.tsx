import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';
import { AuthLayout } from '../layout';

export function RegisterPage() {
  return (
    <AuthLayout
      title='Register'
      description=' Enter your information to create an account'
    >
      <div className="grid gap-4">

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" placeholder="Will" required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" placeholder="Robinson" required />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>

        <Button type="submit" className="w-full">
          Create an account
        </Button>
      </div>

      <div className="mt-4 text-center text-sm">
        Already have an account?{ " " }
        <Link to="/auth/login" className="underline">
          Login
        </Link>
      </div>
    </AuthLayout>

  );
}
