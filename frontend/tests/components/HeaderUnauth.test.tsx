import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../../src/components/Header';


vi.mock('../../src/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: undefined, // Mock user object
    login: vi.fn(), // Mock login function
    logout: vi.fn(), // Mock logout function
  }),
}));


describe('Header unauthenticated', () => {

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks()
  });

  const renderComponent = () => {
    render(<Router>
      <Header />
    </Router>);

    const menu = screen.getByTestId("menu")
    const email = screen.queryByTestId("user-email")

    return { menu, email }
  }


  it('unauthenticated user should have only 2 links', () => {
    const { menu } = renderComponent()
    expect(menu.getElementsByTagName('a')).toHaveLength(2)
  })

  it('unauthenticated user should have login and email in text', () => {
    const { menu } = renderComponent()
    expect(menu).toHaveTextContent(/login/i)
    expect(menu).toHaveTextContent(/register/i)
  })

  it('should not display users email', async () => {
    const { email } = renderComponent()
    expect(email).toBeNull()
  })

});
