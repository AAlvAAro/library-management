import { Form, Head } from "@inertiajs/react"

import InputError from "@/components/input-error"
import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import AuthLayout from "@/layouts/auth-layout"
import { identityPasswordResetPath, signInPath } from "@/routes"

export default function ForgotPassword() {
  return (
    <AuthLayout
      title="Reset password"
      description="Enter your email and we'll send you a reset link"
    >
      <Head title="Reset Password" />

      <div className="space-y-6">
        <Form method="post" action={identityPasswordResetPath()}>
          {({ processing, errors }) => (
            <>
              <div className="grid gap-2">
                <Label htmlFor="email" className="font-semibold">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="off"
                  autoFocus
                  placeholder="you@example.com"
                  className="border-2 border-foreground"
                />
                <InputError message={errors.email} />
              </div>

              <div className="my-6 flex items-center justify-start">
                <Button className="w-full border-2 border-foreground font-semibold" disabled={processing}>
                  {processing && <Spinner />}
                  Send Reset Link
                </Button>
              </div>
            </>
          )}
        </Form>
        <div className="text-muted-foreground text-center text-sm">
          Remember your password?{" "}
          <TextLink href={signInPath()} className="underline font-medium text-foreground">Sign in</TextLink>
        </div>
      </div>
    </AuthLayout>
  )
}
