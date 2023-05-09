import EventDetail from "../EventDetail"
import { render, screen, cleanup } from "@testing-library/react"
import axiosMock from "axios"

test('mytest', () => {
    render(<EventDetail/>);
    const mytest = screen.getByTestId('1');
    expect(mytest).toHaveTextContent();
})

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};