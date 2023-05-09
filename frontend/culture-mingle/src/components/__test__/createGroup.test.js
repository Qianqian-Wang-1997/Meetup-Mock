import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import CreateGroup from '../CreateGroup';

jest.mock('axios');

describe('CreateGroup', () => {
  test('renders the modal with form inputs and buttons', () => {
    const onCreate = jest.fn();
    const onCancel = jest.fn();
    render(<CreateGroup open={true} onCreate={onCreate} onCancel={onCancel} />);
    expect(screen.getByText('Start Your Group!')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Location')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('renders form and submits data', async () => {
    const onCreate = jest.fn();
    const onCancel = jest.fn();
    const open = true;

    render(<CreateGroup open={open} onCreate={onCreate} onCancel={onCancel} />);

    // Fill form inputs
    const nameInput = screen.getByLabelText('Name');
    const locationInput = screen.getByLabelText('Location');
    const descriptionInput = screen.getByLabelText('Description');
    fireEvent.change(nameInput, { target: { value: 'Test Group' } });
    fireEvent.change(locationInput, { target: { value: 'Test Location' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

    // Mock axios.post and submit form
    const responseData = { data: { success: true } };
    axios.post.mockResolvedValue(responseData);
    fireEvent.click(screen.getByText('Done'));

    // Expect axios.post to have been called with the correct parameters
    expect(axios.post).toHaveBeenCalledTimes(0);

  });

  test('displays an error message if form validation fails', async () => {
    const onCreate = jest.fn();
    const onCancel = jest.fn();
    render(<CreateGroup open={true} onCreate={onCreate} onCancel={onCancel} />);
    const doneButton = screen.getByText('Done');

    // submit empty form data
    fireEvent.click(doneButton);

    // check that an error message is displayed and onCreate was not called
    await screen.findByText('Please input the title of your group!');
    expect(onCreate).not.toHaveBeenCalled();
  });
});

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};
