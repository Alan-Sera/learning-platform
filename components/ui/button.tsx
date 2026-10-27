import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "text";
export type ButtonSize = "md" | "lg";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary-500 text-white hover:bg-primary-600 disabled:bg-primary-100 disabled:text-primary-300",
  secondary: "border border-primary-500 bg-white text-primary-500 hover:bg-primary-100 disabled:border-primary-200 disabled:bg-white disabled:text-primary-300",
  tertiary: "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 disabled:border-neutral-200 disabled:bg-neutral-50 disabled:text-neutral-300",
  text: "bg-transparent text-primary-500 hover:text-primary-600 disabled:bg-transparent disabled:text-primary-300",
};

export function Button({ variant = "primary", size = "lg", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn("inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md text-body font-medium transition-colors disabled:cursor-not-allowed", size === "lg" ? "px-4" : "px-3", variants[variant], className)} {...props} />;
}
