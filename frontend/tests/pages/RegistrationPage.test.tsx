import { render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import AuthProvider from '../../src/contexts/AuthContext'
import RegistrationPage from '../../src/pages/RegistrationPage'
import FlashProvider from '../../src/contexts/FlashContext'
import FlashMessage from '../../src/components/FlashMessage'
import { ILogin } from '../../src/@types/auth'
import { server } from '../mocks/server'

describe('RegistrationPage', () => {
    const setup = () => {
        render(
            <MemoryRouter initialEntries={['/register']}>
                <FlashProvider>
                    <AuthProvider>
                        <FlashMessage />
                        <Routes>
                            <Route path="/login" element={<p>login</p>} />
                            <Route path="/register" element={<RegistrationPage />} />
                        </Routes>
                    </AuthProvider>
                </FlashProvider>
            </MemoryRouter>
        );

        const user = userEvent.setup();
        const email = screen.getByTestId("email")
        const password = screen.getByTestId("password")
        const heading = screen.getByRole("heading")
        const submit = screen.getByRole("button")
        return { user, email, password, heading, submit }
    }

    it('should render registration form', () => {
        const { email, password, heading } = setup()

        expect(email).toBeInTheDocument()
        expect(password).toBeInTheDocument()
        expect(heading).toHaveTextContent("Register")
    })

    it('should successfully register', async () => {
        const { email, password, user, submit } = setup()
        await user.type(email, "user@example.com")
        await user.type(password, "testpass111")
        screen.debug()
        await user.click(submit)

        await waitFor(() => {
            const alert = screen.getByRole("alert")
            expect(alert).toHaveTextContent("user@example.com has been successfully registered.")
            
            screen.debug()
        })
    })

    it('should display flash message if registration is unsuccessful', async () => {
        server.use(http.post<{}, ILogin, any, "http://127.0.0.1:8000/api/accounts/users/">(
            "http://127.0.0.1:8000/api/accounts/users/", () => {
            return new HttpResponse(null, {
                status: 400,
                statusText: "The user could not be registered."
            })
        }));

        const { email, password, user, submit, heading  } = setup()
        await user.type(email, "user@example.com")
        await user.type(password, "testpass111")
        await user.click(submit)

        await waitFor(() => {
            const alert = screen.getByRole("alert")
            expect(alert).toHaveTextContent("The user could not be registered.")
            expect(heading).toBeInTheDocument()
        })
    })
})
