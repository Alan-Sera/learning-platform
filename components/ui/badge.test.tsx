import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders the provided children", () => {
    render(<Badge variant="lesson">Lesson 01</Badge>);

    expect(screen.getByText("Lesson 01")).toBeInTheDocument();
  });

  it("uses the variant as fallback content", () => {
    render(<Badge variant="video" />);

    expect(screen.getByText("video")).toBeInTheDocument();
  });

  it("applies lesson variant styles", () => {
    render(<Badge variant="lesson">Lesson</Badge>);

    expect(screen.getByText("Lesson")).toHaveClass(
      "bg-lesson-bg",
      "text-lesson-text",
    );
  });

  it("preserves additional HTML attributes", () => {
    render(
      <Badge
        variant="popular"
        className="custom-badge"
        title="Popular course"
      >
        Popular
      </Badge>,
    );

    const badge = screen.getByText("Popular");

    expect(badge).toHaveClass("custom-badge");
    expect(badge).toHaveAttribute("title", "Popular course");
  });
});