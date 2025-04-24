import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminPanel from './adminPanel'; // Adjust the import path as needed

// Mock localStorage to avoid errors in test environment
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = String(value);
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('AdminPanel Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test to ensure isolation
    localStorage.clear();
  });

  test('renders the component without crashing', () => {
    render(<AdminPanel />);
    expect(screen.getByText('Admin Panel - Placement Management System')).toBeInTheDocument();
  });
});