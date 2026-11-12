import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Suspense } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./auth.module.css";

export function AuthControls() {
  return (
    <div className={styles.controls}>
      <Suspense fallback={<span className={styles.placeholder} aria-hidden="true" />}>
        <Show when="signed-out">
          <SignInButton>
            <Button variant="text" size="md" className={styles.button}>Sign in</Button>
          </SignInButton>
          <SignUpButton>
            <Button size="md" className={styles.button}>Sign up</Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <div className={styles.account}>
            <Bell aria-hidden="true" size={24} strokeWidth={1.5} />
            <UserButton appearance={{ elements: { avatarBox: styles.avatar } }} />
          </div>
        </Show>
      </Suspense>
    </div>
  );
}
