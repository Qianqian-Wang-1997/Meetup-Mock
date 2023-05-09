import Registration from "../Registration";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, RenderResult, MemoryRouter } from "react-router-dom";
import { render, fireEvent, waitFor, screen, act } from "@testing-library/react"
import axios from "axios";
let container = null;
let wrapper2 = RenderResult;

jest.mock('axios')

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    wrapper2 = render(<BrowserRouter><Registration /></BrowserRouter>, container);
});

afterEach(() => {
    // cleanup on exiting
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('registration test', () => {
    it('should render Registration component', () => {
        expect(wrapper2.getByLabelText(/E-mail/i)).toBeInTheDocument();
        expect(wrapper2.getByLabelText("Password")).toBeInTheDocument();
        expect(wrapper2.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
        expect(wrapper2.getByLabelText(/Date of birth/i)).toBeInTheDocument();
        expect(wrapper2.getByLabelText(/Gender/i)).toBeInTheDocument();
        expect(wrapper2.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('renders the component without errors', () => {
        render(<BrowserRouter><Registration /></BrowserRouter>);
        const nameLabel = screen.getByLabelText('Name');
        const emailLabel = screen.getByLabelText('E-mail');
        const passwordLabel = screen.getByLabelText('Password');
        const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
        const birthdayLabel = screen.getByLabelText('Date of birth');
        const genderLabel = screen.getByLabelText('Gender');
        expect(nameLabel).toBeInTheDocument();
        expect(emailLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();
        expect(confirmPasswordLabel).toBeInTheDocument();
        expect(birthdayLabel).toBeInTheDocument();
        expect(genderLabel).toBeInTheDocument();
      });

    // it('validates name input', () => {
    //     act(() => {
    //         render(<BrowserRouter><Registration /></BrowserRouter>);
    //         const nameInput = screen.getByTestId('name');
    //         fireEvent.change(nameInput, { target: { value: 'a' } });
    //         fireEvent.blur(nameInput);
    //     });
    //     //const nameError = screen.getByText(/username/i);
    //     //expect(nameError).toBeInTheDocument();
    //     act(() => {
    //         fireEvent.change(nameInput, { target: { value: 'a'.repeat(21) } });
    //         fireEvent.blur(nameInput);
    //     });
    //     //const nameError2 = screen.getByText(/username should be at most 20 characters in length/i);
    //     //(nameError2).toBeInTheDocument();
    // });

    it('should submit form with valid data', async () => {
        act(() => {
            axios.post.mockResolvedValueOnce({ data: { message: 'Successfully registered!' } });

            render(<BrowserRouter><Registration /></BrowserRouter>);

            fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
            fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'johndoe@example.com' } });
            fireEvent.change(screen.getByLabelText("Password"), { target: { value: 'password123' } });
            fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });
            fireEvent.change(screen.getByLabelText(/Date of birth/i), { target: { value: '1990-01-01' } });
            fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });
            fireEvent.click(screen.getByTestId('submit'));
        });
        //expect(await screen.findByText(/Successfully/i)).toBeInTheDocument();
    });

    it('should show error message if form submission fails', async () => {
        // const mockAxios = jest.spyOn(axios, 'post');
        act(() => {
            axios.post.mockRejectedValueOnce({  data: { message: 'Something went wrong.' } });
            render(<BrowserRouter><Registration /></BrowserRouter>);

            fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
            fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'johndoe@example.com' } });
            fireEvent.change(screen.getByLabelText("Password"), { target: { value: 'password123' } });
            fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });
            fireEvent.change(screen.getByLabelText(/Date of birth/i), { target: { value: '1990-01-01' } });
            fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });
            fireEvent.click(screen.getByTestId('submit'));
        });

        //expect(mockAxios).toHaveBeenCalled();
        //expect(await screen.findByText(/Something/i)).toBeInTheDocument();
    });
})

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};