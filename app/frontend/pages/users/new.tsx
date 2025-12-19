import { Form, Head } from "@inertiajs/react"

import InputError from "@/components/input-error"
import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import AuthLayout from "@/layouts/auth-layout"
import { signInPath, signUpPath } from "@/routes"

export default function Register() {
  return (
    <AuthLayout
      title="Create account"
      description="Join Library Management and start managing your library"
    >
      <Head title="Create Account" />
      <Form
        method="post"
        action={signUpPath()}
        resetOnSuccess={["password", "password_confirmation"]}
        disableWhileProcessing
        className="flex flex-col gap-6"
      >
        {({ processing, errors }) => (
          <>
            <div className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="name" className="font-semibold">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="name"
                  disabled={processing}
                  placeholder="John Doe"
                  className="border-2 border-foreground"
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  tabIndex={2}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="border-2 border-foreground"
                />
                <InputError message={errors.email} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="font-semibold">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  tabIndex={3}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="border-2 border-foreground"
                />
                <InputError message={errors.password} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password_confirmation" className="font-semibold">Confirm Password</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  name="password_confirmation"
                  required
                  tabIndex={4}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="border-2 border-foreground"
                />
                <InputError message={errors.password_confirmation} />
              </div>

              <div className="grid gap-2">
                <Label className="font-semibold">Account Type</Label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="member"
                      defaultChecked
                      tabIndex={5}
                      className="h-4 w-4 border-2 border-foreground"
                    />
                    <span>Member</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="librarian"
                      tabIndex={6}
                      className="h-4 w-4 border-2 border-foreground"
                    />
                    <span>Librarian</span>
                  </label>
                </div>
              </div>

              <Button type="submit" className="mt-2 w-full border-2 border-foreground font-semibold" tabIndex={7}>
                {processing && <Spinner />}
                Create Account
              </Button>
            </div>

            <div className="text-muted-foreground text-center text-sm">
              Already have an account?{" "}
              <TextLink href={signInPath()} tabIndex={8} className="underline font-medium text-foreground">
                Sign in
              </TextLink>
            </div>
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
