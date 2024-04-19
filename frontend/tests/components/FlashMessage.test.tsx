import { render, screen } from "@testing-library/react";
import FlashProvider from "../../src/contexts/FlashContext";
import { useFlash } from "../../src/contexts/FlashContext";
import FlashMessage from "../../src/components/FlashMessage";
import { useEffect } from "react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("FlashMessage", () => {
  const Test = () => {
    const { flash } = useFlash();
    useEffect(() => {
      flash("foo", "danger");
    }, []);
    return null;
  };

  const renderComponent = () => {
    render(
      <FlashProvider>
        <FlashMessage />
        <Test />
      </FlashProvider>
    );

    const alert = screen.getByRole("alert");
    const button = screen.getByRole("button", { name: "x" });
    const user = userEvent.setup();

    return { alert, button, user };
  };

  it("should flash a message",async () => {
    // NOTE: vi timer functions are not in setup.ts in beforeEach and afterEach as
    //    userEvent does not play nice with them for some reason.
    vi.useFakeTimers();

    const { alert } = renderComponent();
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("foo");
    expect(alert).toHaveClass("alert-danger");

    act(() => {vi.runAllTimers()
    });
   
    expect(alert).not.toBeInTheDocument()

    vi.useRealTimers();
  });

  it("should close when the close button is clicked", async () => {
    const { alert, button, user } = renderComponent();
    expect(alert).toBeInTheDocument();
    
    await user.click(button);
    expect(alert).not.toBeInTheDocument()
  });
});
