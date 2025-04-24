import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApplyDialog } from './apply'; // Adjust the import path as needed

// Mock the formatProgramName function
jest.mock('./apply', () => {
  const originalModule = jest.requireActual('./apply');
  return {
    ...originalModule,
    formatProgramName: jest.fn((programCode) => {
      switch (programCode) {
        case 'cs': return 'Computer Science';
        case 'it': return 'Information Technology';
        default: return 'my field';
      }
    }),
  };
});

const mockSelectedJob = {
  id: '1',
  title: 'Software Engineer',
  company: 'Tech Innovations Inc.',
};

const mockStudentProfile = {
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
  program: 'cs',
  skills: 'JavaScript, React',
  bio: 'Enthusiastic student',
};

const mockOnApplicationSubmit = jest.fn();
const mockOnOpenChange = jest.fn();

const renderComponent = (open = true, selectedJob = mockSelectedJob, studentProfile = null, initialResumeFile = null, initialResumeName = '') => {
  render(
    <ApplyDialog
      open={open}
      onOpenChange={mockOnOpenChange}
      selectedJob={selectedJob}
      studentProfile={studentProfile}
      initialResumeFile={initialResumeFile}
      initialResumeName={initialResumeName}
      onApplicationSubmit={mockOnApplicationSubmit}
    />
  );
};

describe('ApplyDialog Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the dialog with the job title when open and selectedJob is provided', () => {
    renderComponent();
    expect(screen.getByText(`Apply for ${mockSelectedJob.title}`)).toBeInTheDocument();
  });

  test('updates input values when the user types', () => {
    renderComponent();
    const nameInput = screen.getByLabelText('Full Name *');
    fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });
    expect(screen.getByDisplayValue('Jane Smith')).toBeInTheDocument();
  });

  test('calls onOpenChange when the cancel button is clicked', () => {
    renderComponent();
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(mockOnOpenChange).toHaveBeenCalledTimes(1);
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  test('does not render if selectedJob is null', () => {
    renderComponent(true, null);
    expect(screen.queryByText(/Apply for/)).toBeNull();
  });

  test('displays the initial resume name if provided', () => {
    const initialName = 'existing-resume.pdf';
    renderComponent(true, mockSelectedJob, null, null, initialName);
    expect(screen.getByText(initialName)).toBeInTheDocument();
    expect(screen.queryByText(/Upload Resume \*/)).toBeNull();
  });
});