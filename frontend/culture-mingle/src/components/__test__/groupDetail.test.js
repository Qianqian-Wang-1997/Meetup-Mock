import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import GroupDetail from '../GroupDetail/index';

jest.mock('axios'); // Mock axios for API calls

describe('GroupDetail component', () => {
  beforeEach(() => {
    // Mock axios get request for group data
    axios.get.mockResolvedValueOnce({
      data: {
        groupId: '123',
        groupName: 'Test Group',
        logoUrl: 'test_logo.png',
        location: 'Test Location',
        organizer: 'Test Organizer',
        description: 'Test Description',
        events: ['event1', 'event2'],
        members: ['member1', 'member2'],
      },
    });
  });

  test('renders group detail correctly', async () => {
    // Render GroupDetail component
    render(<GroupDetail />);

    // Wait for axios get request to resolve and component to render
    await screen.findByText('Test Group');

    // Assert that group detail elements are rendered correctly
    expect(screen.getByText('Test Group')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('renders no content for empty events and members', async () => {
    // Mock empty events and members data
    axios.get.mockResolvedValueOnce({
      data: {
        groupId: '123',
        groupName: 'Test Group',
        logoUrl: 'test_logo.png',
        location: 'Test Location',
        organizer: 'Test Organizer',
        description: 'Test Description',
        events: [],
        members: [],
      },
    });

    // Render GroupDetail component
    render(<GroupDetail />);

    // Wait for axios get request to resolve and component to render
    await screen.findByText('Test Group');

    // Assert that no content elements are rendered correctly
    expect(screen.getByText('Test Group')).toBeInTheDocument();
  });
});


window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};