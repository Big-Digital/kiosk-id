import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import KioskId from '../KioskId';

const renderWithRouter = (initialEntry: string) => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/k/:kioskId" element={<KioskId />} />
        <Route path="/" element={<div data-testid="home">Home</div>} />
      </Routes>
    </MemoryRouter>,
  );
};

describe('KioskId', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('stores the kiosk ID in localStorage and navigates to /', () => {
    const { getByTestId } = renderWithRouter('/k/abc123');
    expect(localStorage.getItem('kiosk-id')).toBe('abc123');
    expect(getByTestId('home')).toBeInTheDocument();
  });

  it('overwrites an existing kiosk ID in localStorage', () => {
    localStorage.setItem('kiosk-id', 'old-id');
    renderWithRouter('/k/new-id');
    expect(localStorage.getItem('kiosk-id')).toBe('new-id');
  });

  it('logs info when kiosk ID is set', () => {
    const consoleSpy = vi.spyOn(console, 'info');
    renderWithRouter('/k/test-kiosk');
    expect(consoleSpy).toHaveBeenCalledWith('kiosk ID set', 'test-kiosk');
  });

  it('does not log "No kiosk ID provided" when a valid kioskId is in params', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    renderWithRouter('/k/abc123');
    expect(consoleSpy).not.toHaveBeenCalledWith('No kiosk ID provided');
  });
});

