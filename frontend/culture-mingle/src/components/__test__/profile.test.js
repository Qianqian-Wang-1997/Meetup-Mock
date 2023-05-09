import { render, fireEvent, waitFor, screen, act } from "@testing-library/react"
import Profile from '../Profile';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
jest.mock('axios');
describe('Profile component', () => {
    const mockEventData = [
        {
            id: 1,
            name: 'Event 1',
            description: 'Description for event 1',
        },
        {
            id: 2,
            name: 'Event 2',
            description: 'Description for event 2',
        },
    ];

    const mockGroupData = [
        {
            id: 1,
            name: 'Group 1',
            description: 'Description for group 1',
        },
        {
            id: 2,
            name: 'Group 2',
            description: 'Description for group 2',
        },
    ];

    beforeEach(() => {
        localStorage.setItem('userId', '1');
        localStorage.setItem('userEmail', 'test@example.com');
        localStorage.setItem('userName', 'Test User');
    });

    afterEach(() => {
        localStorage.clear();
        jest.resetAllMocks();
    });

    it('should render the user information', () => {
        render(<BrowserRouter>
            <Profile />
        </BrowserRouter>);
        const emailElement = screen.getByText(/test@example.com/i);
        expect(emailElement).toBeInTheDocument();
    });

    it('should render the user information', async () => {
        axios.get.mockResolvedValueOnce({ data: {} });
        render(
            <BrowserRouter>
                <Profile />
            </BrowserRouter>
        );
        await waitFor(() => {
            const usernameElement = screen.getByText('Test User');
            const emailElement = screen.getByText(/test@example.com/i);
            expect(usernameElement).toBeInTheDocument();
            expect(emailElement).toBeInTheDocument();
        });
    });

    it('should render event data if the user has event history', async () => {
        axios.get.mockResolvedValueOnce({ data: { eventHistory: [1, 2] } });
        axios.get.mockResolvedValueOnce({ data: mockEventData[0] });
        axios.get.mockResolvedValueOnce({ data: mockEventData[1] });
        render(
            <BrowserRouter>
                <Profile />
            </BrowserRouter>
        );
        await waitFor(() => {
            const eventDataElement = screen.getByText('My Events');
            expect(eventDataElement).toBeInTheDocument();
            const event1Element = screen.getByText(/Event/i);
            //const event2Element = screen.getByText('Event 2');
            expect(event1Element).toBeInTheDocument();
            //expect(event2Element).toBeInTheDocument();
        });
    });

    it('should render group data if the user is a member of at least one group', async () => {
        axios.get.mockResolvedValueOnce({ data: { groups: [1, 2] } });
        axios.get.mockResolvedValueOnce({ data: mockGroupData[0] });
        axios.get.mockResolvedValueOnce({ data: mockGroupData[1] });
        render(
            <BrowserRouter>
                <Profile />
            </BrowserRouter>
        );
        await waitFor(() => {
            const groupDataElement = screen.getByText('My Groups');
            expect(groupDataElement).toBeInTheDocument();
            const group1Element = screen.getByText(/Group/i);
            //const group2Element = screen.getByText('Group 2');
            expect(group1Element).toBeInTheDocument();
            //expect(group2Element).toBeInTheDocument();
        });
    });

    it('should display a message when the user has no event history', async () => {
        act(() => {
            axios.get.mockResolvedValueOnce({ data: { eventHistory: [] } });
            render(
                <BrowserRouter>
                    <Profile />
                </BrowserRouter>
            );
        });
        await waitFor(() => {
            const noEventElement = screen.getByText(
                /Currently No Event/i
            );
            expect(noEventElement).toBeInTheDocument();
        });
    });

    it('should display a message when the user has no group history', async () => {
        act(() => {
            axios.get.mockResolvedValueOnce({ data: { groups: [] } });
            render(
                <BrowserRouter>
                    <Profile />
                </BrowserRouter>
            );
        });
        await waitFor(() => {
            const noEventElement = screen.getByText(
                /Currently No Group/i
            );
            expect(noEventElement).toBeInTheDocument();
        });
    });

    it('should render event data if the user has event history', () => {
        render(<BrowserRouter>
            <Profile />
        </BrowserRouter>);
        const eventDataElement = screen.getByText('My Events');
        expect(eventDataElement).toBeInTheDocument();
    });

    it('should render group data if the user is a member of at least one group', () => {
        render(<BrowserRouter>
            <Profile />
        </BrowserRouter>);
        const groupDataElement = screen.getByText('My Groups');
        expect(groupDataElement).toBeInTheDocument();
    });
});

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};