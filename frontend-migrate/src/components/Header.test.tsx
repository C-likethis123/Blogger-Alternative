import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { AuthProvider } from '../contexts/AuthContext';
import axios from "axios";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

test('shows "Logout" when user is logged in', async () => {
    jest.spyOn(document, 'cookie', 'get').mockImplementation(() => "connect.sid=test");
    const mockLogout = jest.fn((url) => {
        return Promise.resolve(jest.spyOn(document, 'cookie', 'get').mockImplementation(() => ""))
    });
    mockedAxios.post.mockImplementation(mockLogout);
    const history = createMemoryHistory();
    render(<Router history={history}>
        <AuthProvider>
            <Header />
        </AuthProvider>
    </Router>);

    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /logout/i }));
    await waitFor(() => expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument())
})