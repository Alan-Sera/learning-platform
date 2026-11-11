import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeSearch } from "./home-search";

describe("HomeSearch", () => {
  it.each(["ctrlKey", "metaKey"])("focuses search and prevents the browser shortcut with %s", modifier => {
    render(<HomeSearch />);
    const event = new KeyboardEvent("keydown", { key: "k", [modifier]: true, bubbles: true, cancelable: true });
    fireEvent(window, event);
    expect(screen.getByRole("searchbox", { name: "Search your learning" })).toHaveFocus();
    expect(event.defaultPrevented).toBe(true);
  });

  it("does not steal focus from another editable control", () => {
    render(<><HomeSearch /><textarea aria-label="Notes" /><div contentEditable aria-label="Editor"><span>Editable text</span></div></>);
    const notes = screen.getByRole("textbox", { name: "Notes" });
    notes.focus();
    const event = new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true, cancelable: true });
    fireEvent(notes, event);
    expect(notes).toHaveFocus();
    expect(event.defaultPrevented).toBe(false);
    const editor = screen.getByLabelText("Editor");
    editor.focus();
    fireEvent.keyDown(screen.getByText("Editable text"), { key: "k", metaKey: true });
    expect(editor).toHaveFocus();
  });

  it("ignores composition and unrelated key combinations", () => {
    render(<HomeSearch />);
    fireEvent.keyDown(window, { key: "k", ctrlKey: true, isComposing: true });
    fireEvent.keyDown(window, { key: "k" });
    fireEvent.keyDown(window, { key: "k", ctrlKey: true, altKey: true });
    expect(screen.getByRole("searchbox")).not.toHaveFocus();
  });

  it("keeps typed text without a submit action and removes its shortcut on unmount", () => {
    const { unmount } = render(<HomeSearch />);
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "Docker containers" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(input).toHaveValue("Docker containers");
    expect(input.closest("form")).toBeNull();
    unmount();
    const event = new KeyboardEvent("keydown", { key: "k", ctrlKey: true, cancelable: true });
    fireEvent(window, event);
    expect(event.defaultPrevented).toBe(false);
  });
});
