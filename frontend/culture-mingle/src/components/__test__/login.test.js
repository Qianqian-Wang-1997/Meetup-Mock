import Login from "../Login"
import {render, fireEvent, waitFor, screen, act} from "@testing-library/react"
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes , RenderResult, MemoryRouter} from "react-router-dom";
import axios from 'axios';
import { async } from "q";

jest.mock('axios')
let container = null;
let wrapper = RenderResult;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    wrapper = render(<BrowserRouter><Login/></BrowserRouter>,container);
});

afterEach(() => {
    // cleanup on exiting
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('login test', () => {
    it('should render Login component', () => {
        const app = wrapper.getByTestId('content');
        expect(app).toBeInTheDocument();
    });
    
    it('should render error message on failed login', async () => {
        act(() => {
            axios.post.mockRejectedValueOnce({ response: { data: { message: 'Invalid credentials' } } });
            render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
            );
            fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'test' } });
            fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'test' } });
            fireEvent.click(screen.getByTestId('submit'));
        });
        await waitFor(() => expect(screen.getByText('Invalid account or password!')).toBeInTheDocument());
      });

      it('should render error message on failed login', async () => {
        const userId = '1234567890';
        const userName = 'test';
        const userEmail = 'test@test.com';
        act(() => {
            axios.post.mockResolvedValueOnce({ data: { id: userId, username: userName, email: userEmail } });
            render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
            );

            fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'test' } });
            fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'test' } });
            fireEvent.click(screen.getByTestId('submit'));
        });
        await waitFor(() => {
            expect(localStorage.getItem('userId')).toEqual(userId);
            expect(localStorage.getItem('userName')).toEqual(userName);
            expect(localStorage.getItem('userEmail')).toEqual(userEmail);
            expect(window.location.pathname).toEqual('/');
        });
      });
});

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};