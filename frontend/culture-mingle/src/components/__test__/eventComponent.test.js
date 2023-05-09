import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EventComponent from "../EventList/EventComponent";

describe("EventComponent", () => {
  const mockEvent = {
    id: 1,
    title: "Test Event",
    time: "2023-04-08T14:00:00Z",
    location: "Test Location",
    attendees: [
      "1", "2", "3","4","5"
    ]
  };

  test("renders event details correctly", () => {
    // Render the EventComponent with a mock event
    const { getByText } = render(
      <BrowserRouter>
        <EventComponent event={mockEvent} />
      </BrowserRouter>
    );

    // Assert that event details are rendered correctly
    expect(getByText("Test Event")).toBeInTheDocument();
    expect(getByText("Test Location")).toBeInTheDocument();
    expect(getByText("5 attendees")).toBeInTheDocument();
  });

  test("renders event link correctly", () => {
    // Render the EventComponent with a mock event
    const { getByRole } = render(
      <BrowserRouter>
        <EventComponent event={mockEvent} />
      </BrowserRouter>
    );
    const linkElement = getByRole("link"); // Find <a> tag by role
    expect(linkElement).toBeInTheDocument(); // Assert that <a> tag is in the document
    expect(linkElement.href).toBe("http://localhost/events/1"); // Assert href prop of <a> tag
  });

  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };
});
