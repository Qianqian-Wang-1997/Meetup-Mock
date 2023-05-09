import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GroupComponent from '../GroupList/GroupComponent';

describe('GroupComponent', () => {
  const mockGroup = {
    id: 1,
    groupName: 'Test Group',
    description: 'Test Description',
    location: 'Test Location',
    members: [
      { id: 1, name: 'Member 1' },
      { id: 2, name: 'Member 2' },
      { id: 3, name: 'Member 3' },
      { id: 4, name: 'Member 4' },
      { id: 5, name: 'Member 5' },
    ],
    logoUrl: 'test_logo_url',
  };

  test('renders group details correctly', () => {
    // Render the GroupComponent with a mock group
    const { getByText } = render(
      <BrowserRouter>
        <GroupComponent group={mockGroup} />
      </BrowserRouter>
    );

    // Assert that group details are rendered correctly
    expect(getByText('Test Group')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
    expect(getByText('Test Location')).toBeInTheDocument();
    expect(getByText('5 members')).toBeInTheDocument();
  });

  test('renders group link correctly', () => {
    // Render the GroupComponent with a mock group
    const { getByRole } = render(
      <BrowserRouter>
        <GroupComponent group={mockGroup} />
      </BrowserRouter>
    );
    const linkElement = getByRole('link'); // Find <a> tag by role
    expect(linkElement).toBeInTheDocument(); // Assert that <a> tag is in the document
    expect(linkElement.href).toBe('http://localhost/groups/1'); // Assert href prop of <a> tag
  });
});

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};