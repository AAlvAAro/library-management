import { Form, Head } from "@inertiajs/react"

import InputError from "@/components/input-error"
import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import AuthLayout from "@/layouts/auth-layout"
import { newIdentityPasswordResetPath, signInPath, signUpPath } from "@/routes"

export default function Login() {
  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to your Library Management account"
    >
      <Head title="Sign In" />
      <Form
        method="post"
        action={signInPath()}
        resetOnSuccess={["password"]}
        className="flex flex-col gap-6"
      >
        {({ processing, errors }) => (
          <>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="font-semibold">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="border-2 border-foreground"
                />
                <InputError message={errors.email} />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="font-semibold">Password</Label>
                  <TextLink
                    href={newIdentityPasswordResetPath()}
                    className="ml-auto text-sm underline"
                    tabIndex={5}
                  >
                    Forgot password?
                  </TextLink>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  tabIndex={2}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="border-2 border-foreground"
                />
                <InputError message={errors.password} />
              </div>

              <Button
                type="submit"
                className="mt-2 w-full border-2 border-foreground font-semibold"
                tabIndex={4}
                disabled={processing}
              >
                {processing && <Spinner />}
                Sign In
              </Button>
            </div>

            <div className="text-muted-foreground text-center text-sm">
              Don&apos;t have an account?{" "}
              <TextLink href={signUpPath()} tabIndex={5} className="underline font-medium text-foreground">
                Sign up
              </TextLink>
            </div>

            {/* Demo Credentials */}
            <div className="border-2 border-dashed border-foreground p-4 text-sm">
              <p className="font-semibold mb-2">Demo Credentials:</p>
              <p className="text-muted-foreground">Librarian: librarian@demo.com / password123</p>
              <p className="text-muted-foreground">Member: member@demo.com / password123</p>
            </div>
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
