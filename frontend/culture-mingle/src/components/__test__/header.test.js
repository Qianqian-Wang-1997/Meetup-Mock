import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CMHeader from '../CMHeader/index';

// Helper function to reload the page
const reloadPage = () => {
    window.location.reload();
  };
  
describe('CMHeader', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders login and sign up buttons when user is not logged in', () => {
    render(
      <Router>
        <CMHeader />
      </Router>
    );

    const loginButton = screen.getByText('login');
    const signUpButton = screen.getByText('sign up');

    expect(loginButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  test('renders profile and logout buttons when user is logged in', () => {
    localStorage.setItem('userId', '1');

    render(
      <Router>
        <CMHeader />
      </Router>
    );

    const profileButton = screen.getByText('my profile');
    const logoutButton = screen.getByText('Log out');

    expect(profileButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
  test('clicking Start a New Group button opens CreateGroup modal', () => {
    localStorage.setItem('userId', '1');

    render(
      <Router>
        <CMHeader />
      </Router>
    );

    const startGroupButton = screen.getByText('Start a New Group');
    fireEvent.click(startGroupButton);

    const createGroupModal = screen.getByText('Start Your Group!');
    expect(createGroupModal).toBeInTheDocument();
  });
});

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};
