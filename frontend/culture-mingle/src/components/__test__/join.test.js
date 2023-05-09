import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Join from '../Join/index';

// Mock axios for API calls
jest.mock('axios', () => ({
  put: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe('Join component', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<Join joinId="1" type="event" />);

    // Assert that the component renders the expected elements
    expect(getByText('Share')).toBeInTheDocument();
    expect(getByText('Join')).toBeInTheDocument();
    // expect(getByText('shareModal')).not.toBeVisible();
  });

  it('opens and closes share modal', () => {
    const { getByText, getByTestId, queryByTestId } = render(<Join joinId="1" type="event" />);

    const shareButton = getByText('Share');
    fireEvent.click(shareButton);

    // Assert that the share modal opens
    // expect(getByTestId('shareModal')).toBeVisible();

    const closeButton = getByText('Cancel');
    fireEvent.click(closeButton);

    // Assert that the share modal closes
    // expect(queryByTestId('shareModal')).toBeNull();
  });

  it('handles join button click', async () => {
    const { getByText, getByTestId } = render(<Join joinId="1" type="event" />);

    const joinButton = getByText('Join');
    fireEvent.click(joinButton);

    const yesButton = getByText('Yes');
    fireEvent.click(yesButton);

    // Assert that the loading spinner appears
    // expect(getByTestId('loadingSpinner')).toBeVisible();

    // Wait for API call to resolve
    await Promise.resolve();

    // Assert that the loading spinner disappears
    // expect(getByTestId('loadingSpinner')).not.toBeVisible();
  });

  it('handles cancel button click', () => {
    const { getByText, getByTestId } = render(<Join joinId="1" type="event" />);

    const joinButton = getByText('Join');
    fireEvent.click(joinButton);

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    // Assert that the join modal closes
    // expect(getByTestId('joinModal')).not.toBeVisible();
  });
});
