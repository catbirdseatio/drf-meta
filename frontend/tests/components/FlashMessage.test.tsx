import { render, screen } from "@testing-library/react";
import FlashProvider from "../../src/contexts/FlashContext";
import { useFlash } from "../../src/contexts/FlashContext";
import FlashMessage from "../../src/components/FlashMessage";
import { useEffect } from "react";
import { act } from "react-dom/test-utils";

describe("FlashMessage", () => {
  it("should flash a message", async () => {
    const Test = () => {
      const { flash } = useFlash();
      useEffect(() => {
        flash("foo", "danger");
      }, []);
      return null;
    };

    render(
      <FlashProvider>
        <FlashMessage />
        <Test />
      </FlashProvider>
    );

    const alert = screen.getByRole("alert")
    expect(alert).toHaveTextContent('foo')
    expect(alert).toHaveClass('alert-danger')

    act(()=> vi.runAllTimers())
    expect(alert).not.toBeInTheDocument()
  });
});
