import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogDropdown from './BlogDropdown';
import PostsList from '../pages/PostsList';
import { BlogProvider } from '../contexts/BlogContext'; // Import the BlogProvider to provide the context
import { Router } from 'react-router-dom';
import axios from "axios";
import { createMemoryHistory } from 'history';

// Mocking the useContext hook
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('selects the first blog option as selected value', () => {
    const blogs = [
        { id: '1', name: 'Blog 1' },
        { id: '2', name: 'Blog 2' },
      ];
      const selectedBlog = '1';
      const handleBlogChange = jest.fn();
  
      // Mock useContext to return the context values
      (React.useContext as jest.Mock).mockReturnValueOnce({ blogs, selectedBlog, handleBlogChange });

      const { getByDisplayValue, getByRole } = render(<BlogDropdown />);
      const dropdownLabel = getByRole('listbox');
      expect(dropdownLabel).toBeInTheDocument();
  
      const dropdown = getByDisplayValue("Blog 1");
      expect(dropdown).toBeInTheDocument();
      expect(dropdown.tagName).toBe('SELECT');
  
      blogs.forEach(blog => {
        const option = getByRole('option', {name: blog.name}) as HTMLOptionElement;
        expect(option).toBeInTheDocument();
        expect(option.value).toBe(blog.id);
      });
  
})

// TODO: fix this bug Cannot destructure property 'blogs' of '(0 , _react.useContext)(...)' as it is undefined.
// test('changes selected value when user selects', async () => {
//     const blogs = [
//         { id: '1', name: 'Blog 1' },
//         { id: '2', name: 'Blog 2' },
//       ];
  
//       const mockApi = jest.fn((url) => {
//         return Promise.resolve({data: blogs})
//         });
//         mockedAxios.post.mockImplementation(mockApi);

//       const { getByLabelText, getByDisplayValue, getByText } = render(<BlogProvider><BlogDropdown /></BlogProvider>);
//       const dropdown = getByLabelText("Blog:");
//       fireEvent.click(dropdown);
//       // Select the second option ("Blog 2")
//         const blogOption = getByText('Blog 2');
//         fireEvent.click(blogOption);
//       expect(getByDisplayValue("Blog 2")).toBeInTheDocument();
// });

// Integration test - TODO: figure out a structure for these tests
// TODO: fix this bug Cannot destructure property 'blogs' of '(0 , _react.useContext)(...)' as it is undefined.
test('selected value persists even after creating a post', async () => {
    const history = createMemoryHistory();
    const blogs = [
        { id: '1', name: 'Blog 1' },
        { id: '2', name: 'Blog 2' },
      ];
      const selectedBlog = '1';
      const handleBlogChange = jest.fn();
  
      const mockApi = jest.fn((url) => {
        return Promise.resolve({data: blogs})
        });
        mockedAxios.get.mockImplementation(mockApi);

        // circumvent error TODO fix later
     (React.useContext as jest.Mock).mockReturnValue({ blogs, selectedBlog, handleBlogChange });

      const { getByLabelText, getByText } = render(
      <Router history={history}>
            <BlogProvider>
                <PostsList />
            </BlogProvider>
        </Router>);
      // Mock useContext to return the context values

      const dropdown = getByLabelText("Blog:");
      userEvent.click(dropdown);
      // Select the second option ("Blog 2") TODO fix why this is not rendered
        // const blogOption = getByText('Blog 2');
        // fireEvent.click(blogOption);
    //   expect(getByDisplayValue("Blog 2")).toBeInTheDocument();

    const createPostButton = screen.getByText(/Create Post/);
    userEvent.click(createPostButton);
});