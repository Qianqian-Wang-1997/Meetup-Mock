import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import CreateEvent from '../CreateEvent';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

describe('CreateEvent', () => {
    beforeEach(() => {
        // Mock axios get request for group data
        axios.get.mockResolvedValueOnce({
          data: {
            groupIds:'1'
          },
        });
    });

    test('renders title input field', () => {
        render(<CreateEvent />);
        const titleInput = screen.getByLabelText('Title');
        expect(titleInput).toBeInTheDocument();
      });
    
      test('renders location input field', () => {
        render(<CreateEvent />);
        const locationInput = screen.getByLabelText('Location');
        expect(locationInput).toBeInTheDocument();
      });
    
      test('renders time input field', () => {
        render(<CreateEvent />);
        const timeInput = screen.getByLabelText('Time');
        expect(timeInput).toBeInTheDocument();
      });
    
      test('renders group select field', () => {
        render(<CreateEvent />);
        const groupSelect = screen.getByLabelText('Group');
        expect(groupSelect).toBeInTheDocument();
      });
    
      test('renders description input field', () => {
        render(<CreateEvent />);
        const descriptionInput = screen.getByLabelText('Description');
        expect(descriptionInput).toBeInTheDocument();
      });

      test('should create an event when the form is submitted', async () => {
        const mockedMessage = jest.fn();
        window.alert = mockedMessage;
        
        const mockPost = jest.spyOn(axios, 'post').mockResolvedValueOnce({
          data: {
            title: 'Mock Event',
            venue: 'Mock Venue',
            time: '2023-04-15T08:00:00.000Z',
            group: 'Mock Group',
            description: 'Mock Description',
            imageUrls: ['Mock Image Url'],
            host: 'Mock User Id'
          }
        });
    
        render(<CreateEvent />);
    
        const titleInput = screen.getByLabelText(/title/i);
        fireEvent.change(titleInput, { target: { value: 'Mock Event' } });
    
        const locationInput = screen.getByLabelText(/location/i);
        fireEvent.change(locationInput, { target: { value: 'Mock Venue' } });
    
        const timeInput = screen.getByLabelText(/time/i);
        fireEvent.change(timeInput, { target: { value: '2023-04-15 08:00 AM' } });
    
        const groupSelect = screen.getByLabelText(/group/i);
        fireEvent.change(groupSelect, { target: { value: 'Mock Group' } });
    
        const descriptionInput = screen.getByLabelText(/description/i);
        fireEvent.change(descriptionInput, { target: { value: 'Mock Description' } });
    
        const submitButton = screen.getByText(/create an event/i);
        fireEvent.click(submitButton);
    
        expect(axios.post).toHaveBeenCalledTimes(0);
      });

})

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};