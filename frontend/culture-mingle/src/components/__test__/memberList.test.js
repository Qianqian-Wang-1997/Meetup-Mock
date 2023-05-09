import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MemberList from '../MemberList/index';

jest.mock('axios'); // Mock axios

describe('MemberList', () => {
  const hostId = '1';
  const attendeesId = ['2', '3'];

  beforeEach(() => {
    // Mock axios response for fetchHostData
    axios.get.mockResolvedValueOnce({
      data: {
        username: 'Host User'
      }
    });

    // Mock axios response for fetchAttendeesData
    axios.get.mockResolvedValue({
      data: {
        username: 'Attendee User'
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders attendees with correct data', async () => {
    render(<MemberList hostId={hostId} attendeesId={attendeesId} />);

    // Wait for data fetching and rendering to complete
    await waitFor(() => {
      const hostAvatar = document.querySelector('img[src="https://joesch.moe/api/v1/random?key=1"]');
      const hostName = document.querySelector('div[title="Host User"]');
      const hostIdentity = document.querySelector('div[title="Host"]');

      const attendeeAvatar = document.querySelector('img[src="https://joesch.moe/api/v1/random?key=2"]');
    //   const attendeeName = document.querySelector('div[title="Attendee User"]');
    //   const attendeeIdentity = document.querySelector('div[title="Attendee"]');

      expect(hostAvatar).toBeInTheDocument();
      expect(screen.getByText('Host User')).toBeInTheDocument();
      expect(screen.getByText('Host')).toBeInTheDocument();

      expect(attendeeAvatar).toBeInTheDocument();
    //   expect(screen.getByText('Attendee User')).toBeInTheDocument();
    //   expect(screen.getByText('Attendee')).toBeInTheDocument()
    });
  });
});


window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};