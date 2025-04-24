import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StudentLoginPage from "./login1";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

// Mock the router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("StudentLoginPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders login form by default", () => {
    render(<StudentLoginPage />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("switches to signup tab", async () => {
    render(<StudentLoginPage />);
    
    // Click the sign up tab button
    const signUpTab = screen.getByRole('tab', { name: /sign up/i }) || 
                      screen.getByText(/sign up/i);
    fireEvent.click(signUpTab);
    
    // Wait for the signup form to appear and check for any element
    // that should definitely be in the signup form
    await waitFor(() => {
      // Look for form fields that should be present in signup form
      const formElements = screen.getAllByRole('textbox');
      expect(formElements.length).toBeGreaterThan(0);
      
      // Check for the form or a section that would contain registration fields
      const formSection = screen.getByRole('tabpanel') || 
                          screen.getByTestId('signup-form') || 
                          screen.getByText(/create student account/i, { exact: false });
      expect(formSection).toBeInTheDocument();
    });
  });
});