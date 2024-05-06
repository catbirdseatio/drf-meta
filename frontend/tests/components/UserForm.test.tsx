import { render, screen, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import UserForm from '../../src/components/UserForm';



describe('UserForm', () => {
    const renderComponent = (formType: "Login" | "Register") => {
        const onSubmit = vi.fn()

        render(<UserForm onSubmit={onSubmit} formType={formType} />);
        const user = userEvent.setup();
        const email = screen.getByTestId("email")
        const password = screen.getByTestId("password")
        const heading = screen.getByRole("heading")
        const submit = screen.getByRole("button")
        return {user, email, password, heading, onSubmit, submit}
    }

    it('should render', () => {
        const {email, password, heading } = renderComponent("Login");
        expect(email).toBeInTheDocument()
        expect(password).toBeInTheDocument()
        expect(heading).toHaveTextContent("Login")
    })

    it('should call onSubmit handler on submitting valid form',async () => {
        const { email, password, user, onSubmit, submit} = renderComponent("Login")
        await user.type(email, "user@example.com")
        await user.type(password, "testpass111")
        await user.click(submit)

        expect(onSubmit).toHaveBeenCalledOnce()
    })

    it('should show error message if no email is entered',async () => {
        const { password, user } = renderComponent("Login")
        const errorMessage = "You must enter a valid email."
        await user.type(password, "testpass111")
        await user.click(screen.getByRole("button")) // Submitting without entering email

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    })

    it('should show error message if invalid email is entered',async () => {
        const { password, email, user } = renderComponent("Login")
        const errorMessage = "You must enter a valid email."
        await user.type(email, "green")
        await user.type(password, "testpass111")
        await user.click(screen.getByRole("button")) // Submitting without entering email

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    })

    it('should show error message if no password is entered',async () => {
        const { user, email } = renderComponent("Login")
        const errorMessage = "The password must be a minimum of 5 characters."
        await user.type(email, "user@example.com")
        await user.click(screen.getByRole("button")) // Submitting without entering email

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    })

    it('should show error message if small password is entered',async () => {
        const { user, email, password, submit } = renderComponent("Login")
        const errorMessage = "The password must be a minimum of 5 characters."
        await user.type(email, "user@example.com")
        await user.type(password, "x")
        await user.click(submit) // Submitting without entering email

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    })
})
