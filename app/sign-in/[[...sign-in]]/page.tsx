import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import styles from "@/components/auth/auth.module.css";

export const metadata: Metadata = { title: "Sign in | Vertex" };

export default function SignInPage() {
  return (
    <main className={styles.screen}>
      <Link href="/" aria-label="Vertex home"><Logo /></Link>
      <h1 className="sr-only">Sign in to Vertex</h1>
      <Suspense fallback={<p role="status" className={styles.loading}>Loading sign in…</p>}>
        <SignIn appearance={{ elements: { rootBox: styles.root, cardBox: styles.card } }} />
      </Suspense>
    </main>
  );
}
