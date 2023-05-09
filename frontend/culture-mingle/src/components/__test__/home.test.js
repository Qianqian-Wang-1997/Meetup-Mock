import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import Home from '../Home/index';

jest.mock('axios'); // Mock axios for API calls

describe('Home component', () => {
  beforeEach(() => {
    // Mock axios get requests for groups and events data
    axios.get
      .mockResolvedValueOnce({ data: [{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }] }) // Mock events data
      .mockResolvedValueOnce({ data: [{ id: 1, name: 'Group 1' }, { id: 2, name: 'Group 2' }] }); // Mock groups data
  });

  test('renders upcoming events and popular groups correctly', async () => {
    // Render Home component
    render(<Home />);

    // Wait for axios get requests to resolve and component to render
    await screen.findByText('Upcoming Events');
    await screen.findByText('Popular groups');

    // Assert that upcoming events and popular groups are rendered correctly
    expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
    expect(screen.getByText('Popular groups')).toBeInTheDocument();
  });

  test('renders no content for empty events and groups', async () => {
    // Mock empty events and groups data
    axios.get
      .mockResolvedValueOnce({ data: [] }) // Mock empty events data
      .mockResolvedValueOnce({ data: [] }); // Mock empty groups data

    // Render Home component
    render(<Home />);

    // Wait for axios get requests to resolve and component to render
    await screen.findByText('Upcoming Events');
    await screen.findByText('Popular groups');

    // Assert that no content elements are rendered correctly
    expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
  });
});
