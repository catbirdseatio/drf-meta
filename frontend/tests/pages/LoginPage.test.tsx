import { render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import AuthProvider from '../../src/contexts/AuthContext'
import LoginPage from '../../src/pages/LoginPage'
import FlashProvider from '../../src/contexts/FlashContext'
import FlashMessage from '../../src/components/FlashMessage'
import { ILogin } from '../../src/@types/auth'
import { server } from '../mocks/server'

describe('LoginPage', () => {
    const setup = () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <FlashProvider>
                    <AuthProvider>
                        <FlashMessage />
                        <Routes>
                            <Route index element={<p>Hello World</p>} />
                            <Route path="/login" element={<LoginPage />} />
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

    it('should render login form', () => {
        const { email, password, heading } = setup()

        expect(email).toBeInTheDocument()
        expect(password).toBeInTheDocument()
        expect(heading).toHaveTextContent("Login")
    })

    it('should successfully login', async () => {
        const { email, password, user, submit } = setup()
        await user.type(email, "user@example.com")
        await user.type(password, "testpass111")
        await user.click(submit)

        await waitFor(() => {
            const alert = screen.getByRole("alert")
            expect(alert).toHaveTextContent("user@example.com has been logged in.")
            expect(screen.getByText(/hello world/i)).toBeInTheDocument()
        })
    })

    it('should display flash message if login unsuccessful', async () => {
        server.use(http.post<{}, ILogin, any, "http://127.0.0.1:8000/api/accounts/jwt/create">(
            "http://127.0.0.1:8000/api/accounts/jwt/create", () => {
            return new HttpResponse(null, {
                status: 401,
                statusText: "User could not be authenticated."
            })
        }));

        const { email, password, user, submit, heading  } = setup()
        await user.type(email, "user@example.com")
        await user.type(password, "testpass111")
        await user.click(submit)

        await waitFor(() => {
            const alert = screen.getByRole("alert")
            expect(alert).toHaveTextContent("User could not be authenticated.")
            expect(heading).toBeInTheDocument()
        })
    })
})
