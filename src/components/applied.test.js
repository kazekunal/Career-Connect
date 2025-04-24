// AppliedJobs.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppliedJobs from './applied'; // Adjust the import path as needed

// --- Mocks ---

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
    Clock: (props) => <svg data-testid="clock-icon" {...props} />,
    // Mock other icons if they were used in the render output
    // Calendar: (props) => <svg data-testid="calendar-icon" {...props} />,
    // CheckCircle: (props) => <svg data-testid="check-icon" {...props} />,
}));

// Mock UI components
jest.mock('@/components/ui/card', () => ({
    Card: ({ children, className, onClick }) => (
        // Add role="button" for easier selection if it behaves like one
        <div data-testid="card" className={className} onClick={onClick} role="button">
            {children}
        </div>
    ),
    CardContent: ({ children, className }) => <div data-testid="card-content" className={className}>{children}</div>,
}));

jest.mock('@/components/ui/badge', () => ({
    Badge: ({ children, className }) => <span data-testid="badge" className={className}>{children}</span>,
}));

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        removeItem: jest.fn((key) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// --- Test Data ---
// (Keeping test data definition in case it's needed for remaining/future tests, though not strictly required for the current ones)
const mockJobPostings = [
    {
        id: 'job1',
        title: 'Software Engineer',
        company: 'Tech Corp',
        location: 'Remote',
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
        eligibility: '3+ years experience\nBSc in Computer Science',
        postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        description: 'Develop amazing software.\nWork in a team.\nFull-time role.',
        salary: '$100,000',
    },
    {
        id: 'job2',
        title: 'UX Designer',
        company: 'Design Hub',
        location: 'New York, NY',
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days from now
        eligibility: 'Entry level\nPortfolio required',
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        description: 'Design user interfaces.\nPart-time contract.',
        salary: 'Competitive',
    },
];

const mockJobApplicants = {
    job1: [
        { name: 'Alice', email: 'alice@test.com', resume: 'resume.pdf', appliedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), status: 'Submitted' },
    ],
    job2: [
         { name: 'Bob', email: 'bob@test.com', resume: 'bob_cv.pdf', appliedDate: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString(), status: 'Under Review' },
    ],
};


// --- Tests ---

describe('AppliedJobs Component', () => {
    let mockOnJobSelect;

    beforeEach(() => {
        // Reset mocks before each test
        localStorageMock.clear();
        jest.clearAllMocks();
        mockOnJobSelect = jest.fn();

        // Set default localStorage values (can be overridden in specific tests)
        // No need to set defaults if only testing empty states
        // localStorageMock.setItem('appliedJobs', JSON.stringify(['job1', 'job2']));
        localStorageMock.setItem('jobPostings', JSON.stringify(mockJobPostings)); // Keep this to test the other empty case
        // localStorageMock.setItem('jobApplicants', JSON.stringify(mockJobApplicants));
    });

    // Test kept: Verifies behavior when the user has not applied to any jobs
    test('should display "no jobs" message when no jobs have been applied for', async () => {
        localStorageMock.setItem('appliedJobs', JSON.stringify([])); // Ensure no applied jobs are listed

        render(<AppliedJobs onJobSelect={mockOnJobSelect} />);

        // Wait for the useEffect hook to process and update state
        await waitFor(() => {
            // Check that the loading message is gone (implicitly confirms useEffect ran)
             expect(screen.queryByText(/Loading your applications.../i)).not.toBeInTheDocument();
        });

        // Assert the specific message for no applied jobs is shown
        expect(screen.getByText(/You haven't applied to any jobs yet./i)).toBeInTheDocument();
         // Ensure no job cards were rendered
        expect(screen.queryByTestId('card')).not.toBeInTheDocument();
         // Ensure the callback wasn't called as no job could be selected
        expect(mockOnJobSelect).not.toHaveBeenCalled();
    });

    // Test kept: Verifies behavior when job data itself is missing, leading to no displayed jobs
     test('should display "no jobs" message when jobPostings data is missing', async () => {
        localStorageMock.setItem('appliedJobs', JSON.stringify(['job1'])); // Simulate having applied
        localStorageMock.removeItem('jobPostings'); // Remove job data source

        render(<AppliedJobs onJobSelect={mockOnJobSelect} />);

        // Wait for the useEffect hook to process and update state
        await waitFor(() => {
             expect(screen.queryByText(/Loading your applications.../i)).not.toBeInTheDocument();
        });

        // It shows this message because matchedAppliedJobs will be empty if jobPostings is null/empty
        expect(screen.getByText(/You haven't applied to any jobs yet./i)).toBeInTheDocument();
        expect(screen.queryByTestId('card')).not.toBeInTheDocument();
        expect(mockOnJobSelect).not.toHaveBeenCalled();
    });

    // --- Removed Tests Placeholder ---
    // The following tests were removed as per the request:
    // - should display loading state initially
    // - should render applied jobs from localStorage
    // - should select the first job by default and call onJobSelect
    // - should handle job selection on click
    // - should handle missing jobApplicants data gracefully

});