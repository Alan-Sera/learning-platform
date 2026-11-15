import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { AuthControls } from "./auth-controls";

const authState = vi.hoisted(() => ({
  signedIn: false,
}));

vi.mock("@clerk/nextjs", () => ({
  Show: ({
    when,
    children,
  }: {
    when: "signed-in" | "signed-out";
    children: ReactNode;
  }) => {
    const visible =
      when === "signed-in"
        ? authState.signedIn
        : !authState.signedIn;

    return visible ? children : null;
  },

  SignInButton: ({ children }: { children: ReactNode }) =>
    <>{children}</>,

  SignUpButton: ({ children }: { children: ReactNode }) =>
    <>{children}</>,

  UserButton: () => (
    <button type="button" aria-label="User profile">
      Profile
    </button>
  ),
}));

describe("AuthControls", () => {
  beforeEach(() => {
    authState.signedIn = false;
  });

  it("shows sign-in for visitors", () => {
    render(<AuthControls />);

    expect(
      screen.getByRole("button", { name: "Sign in" })
    ).toBeInTheDocument();
  });

  it("shows sign-up for visitors", () => {
    render(<AuthControls />);

    expect(
      screen.getByRole("button", { name: "Sign up" })
    ).toBeInTheDocument();
  });

  it("hides profile controls for visitors", () => {
    render(<AuthControls />);

    expect(
      screen.queryByRole("button", { name: "User profile" })
    ).not.toBeInTheDocument();
  });

  it("shows profile controls when signed in", () => {
    authState.signedIn = true;

    render(<AuthControls />);

    expect(
      screen.getByRole("button", { name: "User profile" })
    ).toBeInTheDocument();
  });

  it("hides sign-in and sign-up when signed in", () => {
    authState.signedIn = true;

    render(<AuthControls />);

    expect(
      screen.queryByRole("button", { name: "Sign in" })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Sign up" })
    ).not.toBeInTheDocument();
  });
});
