import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../../src/components/Header';

const mockUseAuth = {
  user: { email: 'test@example.com', id: 1 }, // Mock user object
  login: vi.fn(), // Mock login function
  logout: vi.fn(), // Mock logout function
}


vi.mock('../../src/contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth,
}));


describe('Header', () => {

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks()
  });

  const renderComponent = () => {
    render(<Router>
      <Header />
    </Router>);

    const button = screen.getByRole("button");
    const brand = screen.getByText(/drf meta/i);
    const mobileMenu = screen.getByTestId("mobile-menu")
    const menu = screen.getByTestId("menu")
    const user = userEvent.setup();

    return { button, brand, user, mobileMenu, menu }
  }

  it('should render', () => {
    const { button, brand } = renderComponent()
    expect(brand).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should toggle the menu', async () => {
    const { button, user, mobileMenu } = renderComponent()
    await user.click(button)
    expect(mobileMenu).toHaveClass('open');
  })

  it('authenticated user should have only 1 link', () => {
    const { menu } = renderComponent()
    expect(menu.getElementsByTagName('a')).toHaveLength(1)
  })

  it('should display users email', async () => {
    renderComponent()
    const email = screen.getByTestId("user-email")
    expect(email).toBeInTheDocument()
    expect(email).toHaveTextContent("test@example.com")
  })
  
  it('should display logout button', () => {
    const { menu } = renderComponent()
    expect(menu).toHaveTextContent(/logout/i)
  })

  it('should run logout function if logout button is clicked',async () => {
    const { user } = renderComponent()
    const logout = screen.getByText(/logout/i)
    await user.click(logout)

    expect(mockUseAuth.logout).toHaveBeenCalledTimes(1);
  })
});
