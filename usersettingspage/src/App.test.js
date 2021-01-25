import { render, screen } from '@testing-library/react';
import App from './App';
import { createMemoryHistory } from 'history'
import UserCard from './components/UserCard';
import Home from './components/Home';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import Settings from './components/Settings';

test('render home page correctly', () => {
  const { queryByTestId } = render(<Home />)
  expect(queryByTestId("home-page")).toBeTruthy()
});
test('render loading page correctly', () => {
  const history = createMemoryHistory()
  const route = '/customerdata/82742524-1ca0-4d60-abab-c875925269e4'
  history.push(route)
  render(
    <Router history={history}>
      <Settings />
    </Router>
  )
  expect(screen.getByTestId('loading')).toBeTruthy()

});
test('full app rendering/navigating', () => {
  const history = createMemoryHistory()
  render(
    <Router history={history}>
      <App />
    </Router>
  )
  // verify page content for expected route
  // often you'd use a data-testid or role query, but this is also possible
  expect(screen.getByText(/Our Customers/i)).toBeInTheDocument()

  const leftClick = { button: 0 }
  const { container } = render(
    <Router history={history}>
      <UserCard />
    </Router>
  )
  userEvent.click(screen.getByText(/SETTINGS/i), leftClick)

  // check that the content changed to the new page
  expect(screen.getByText(/SETTINGS/i)).toBeInTheDocument()
})
