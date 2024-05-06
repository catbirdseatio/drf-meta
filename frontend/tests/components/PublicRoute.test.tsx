import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PublicRoute from '../../src/components/PublicRoute';


const mockAuthUser = {
    user: { email: 'test@example.com', id: 1 }, // Mock user object
}


const mocks = vi.hoisted(() => ({ useAuth: vi.fn() }))


vi.mock('../../src/contexts/AuthContext', () => ({
    useAuth: mocks.useAuth
}));

describe('PrivateRoute', () => {
    const renderRoutes = () => {
        render(
            <MemoryRouter initialEntries={['/register']}>
                {/* <AuthProvider> */}
                <Routes>
                    <Route element={<PublicRoute />}>
                        <Route path="/register" element={<div>Registration Page</div>} />
                    </Route>
                    <Route index element={<p>Hello World!</p>} />
                </Routes>
                {/* </AuthProvider> */}
            </MemoryRouter>
        )
    }

    it('renders index route when user is authenticated', () => {
        mocks.useAuth.mockReturnValue(mockAuthUser)
        renderRoutes()
        const message = screen.getByText(/hello world!/i)
        expect(message).toBeInTheDocument();
    });

    it('renders login route when user is authenticated', () => {
        mocks.useAuth.mockReturnValue({ user: undefined })

        renderRoutes()
        const message = screen.getByText(/registration page/i)
        expect(message).toBeInTheDocument();
    });
})
