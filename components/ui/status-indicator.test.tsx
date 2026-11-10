import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusIndicator } from "./status-indicator";

describe("StatusIndicator", () => {
  it("renders the completed status", () => {
    render(<StatusIndicator status="completed" />);

    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("renders the locked status", () => {
    render(<StatusIndicator status="locked" />);

    expect(screen.getByText("Locked")).toBeInTheDocument();
  });

  it("allows overriding the default label", () => {
    render(
      <StatusIndicator
        status="in-progress"
        label="Processing"
      />,
    );

    expect(screen.getByText("Processing")).toBeInTheDocument();
    expect(screen.queryByText("In Progress")).not.toBeInTheDocument();
  });

  it("applies additional CSS classes", () => {
    render(
      <StatusIndicator
        status="now-playing"
        className="custom-status"
      />,
    );

    expect(screen.getByText("Now Playing")).toHaveClass(
      "custom-status",
    );
  });
});