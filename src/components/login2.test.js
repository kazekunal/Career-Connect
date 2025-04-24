import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CompanyLoginPage from "./login2";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

// Mock the router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the next/link component
jest.mock("next/link", () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

describe("CompanyLoginPage", () => {
  beforeEach(() => {
    // Reset mocks between tests
    jest.clearAllMocks();
  });

  it("renders login form by default", () => {
    render(<CompanyLoginPage />);
    
    // Check that the login form elements are present
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
  });

  it("shows loading state when logging in", async () => {
    // Mock setTimeout
    jest.useFakeTimers();
    
    render(<CompanyLoginPage />);
    
    // Fill in login form
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    
    // Submit the form
    fireEvent.click(screen.getByText(/sign in/i));
    
    // Check loading state
    expect(screen.getByText(/logging in/i)).toBeInTheDocument();
    
    // Fast-forward timers
    jest.advanceTimersByTime(1500);
    
    // Reset timers
    jest.useRealTimers();
  });

  it("renders the correct footer", () => {
    render(<CompanyLoginPage />);
    
    // Check footer content
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} PlaceConnect`, "i"))).toBeInTheDocument();
  });
});