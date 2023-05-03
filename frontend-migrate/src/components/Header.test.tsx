import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('navigates to a list of posts when clicking on "Posts"', () => {
    const history = createMemoryHistory();
    render(<Router history={history}><Header /></Router>);
    expect(history.location.pathname).toBe("/");
    const postsLink = screen.getByRole('link', { name: /posts/i });
    userEvent.click(postsLink);
    expect(history.location.pathname).toBe("/posts");
})

test('shows "Login with Google" when user is not logged in', () => {
    const history = createMemoryHistory();
    render(<Router history={history}><Header /></Router>);
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
})

test('shows "Logout" when user is logged in', () => {
    const history = createMemoryHistory();
    render(<Router history={history}><Header /></Router>);
    expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
})