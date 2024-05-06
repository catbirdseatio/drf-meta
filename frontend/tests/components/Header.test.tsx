import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../../src/components/Header';

const mockUseAuth = {
  user: { email: 'test@example.com', id: 1 }, // Mock user object
  login: vi.fn(), // Mock login function
  logout: vi.fn(), // Mock logout function
}


const mocks = vi.hoisted(() => ({ useAuth: vi.fn() }))


vi.mock('../../src/contexts/AuthContext', () => ({
  useAuth: mocks.useAuth
}));


describe('Header', () => {
  const renderComponent = () => {
    render(<Router>
      <Header />
    </Router>);

    const button = screen.getByRole("button");
    const brand = screen.getByRole("heading")
    const mobileMenu = screen.getByTestId("mobile-menu")
    const menu = screen.getByTestId("menu")
    const email = screen.queryByTestId("user-email")
    const user = userEvent.setup();

    return { button, brand, user, mobileMenu, menu, email }
  }

  it('should render', () => {
    mocks.useAuth.mockReturnValue(mockUseAuth)
    const { button, brand } = renderComponent()
    expect(brand).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(brand).toHaveTextContent(/drf meta/i)
  })

  it('should toggle the menu', async () => {
    mocks.useAuth.mockReturnValue(mockUseAuth)
    const { button, user, mobileMenu } = renderComponent()
    await user.click(button)
    expect(mobileMenu).toHaveClass('open');
  })

  it('authenticated user should have only 1 link', () => {
    mocks.useAuth.mockReturnValue(mockUseAuth)
    const { menu } = renderComponent()
    expect(menu.getElementsByTagName('a')).toHaveLength(1)
  })

  it('should display users email', async () => {
    mocks.useAuth.mockReturnValue(mockUseAuth)
    renderComponent()
    const email = screen.getByTestId("user-email")
    expect(email).toBeInTheDocument()
    expect(email).toHaveTextContent(mockUseAuth.user.email)
  })

  it('should display logout button', () => {
    mocks.useAuth.mockReturnValue(mockUseAuth)
    const { menu } = renderComponent()
    expect(menu).toHaveTextContent(/logout/i)
  })

  it('should run logout function if logout button is clicked', async () => {
    mocks.useAuth.mockReturnValue(mockUseAuth)
    const { user } = renderComponent()
    const logout = screen.getByText(/logout/i)
    await user.click(logout)

    expect(mockUseAuth.logout).toHaveBeenCalledTimes(1);
  })

  it('unauthenticated user should have only 2 links', () => {
    mocks.useAuth.mockReturnValue({ ...mockUseAuth, user: undefined })
    const { menu } = renderComponent()
    expect(menu.getElementsByTagName('a')).toHaveLength(2)
  })

  it('unauthenticated user should have login and register in text', () => {
    mocks.useAuth.mockReturnValue({ ...mockUseAuth, user: undefined })
    const { menu } = renderComponent()
    expect(menu).toHaveTextContent(/login/i)
    expect(menu).toHaveTextContent(/register/i)
  })

  it('unauthenticated user should not display users email', async () => {
    mocks.useAuth.mockReturnValue({ ...mockUseAuth, user: undefined })
    const { email } = renderComponent()
    expect(email).toBeNull()
  })
});
