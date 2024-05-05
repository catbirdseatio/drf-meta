import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../../src/components/PrivateRoute';


const mockAuthUser = {
    user: { email: 'test@example.com', id: 1 }, // Mock user object
}


const mocks = vi.hoisted(() => ({useAuth: vi.fn()}))
// Mock AuthProvider to provide a user object

  
  vi.mock('../../src/contexts/AuthContext', () => ({
    useAuth: mocks.useAuth
  }));

describe('PrivateRoute', () => {
    const renderRoutes = () => {
        render(
            <MemoryRouter initialEntries={['/']}>
              {/* <AuthProvider> */}
                <Routes>
                <Route element={<PrivateRoute />}>
                    <Route index element={<p>Hello World!</p>} />
                </Route>
                  <Route path="/login" element={<div>Login Page</div>} />
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
        mocks.useAuth.mockReturnValue({user: undefined})
        renderRoutes()
        screen.debug()
        const message = screen.getByText(/login page/i)
        expect(message).toBeInTheDocument();
    });
})
