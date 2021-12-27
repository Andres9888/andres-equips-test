import React from 'react';

import { render, screen } from '@testing-library/react';

import App from './App';

describe('Home', () => {
  it('Renders no data text when search bar is empty and no current favorites set', () => {
    render(<App />);

    const noDataText = screen.getByText(/No Data/i);
    expect(noDataText).toBeInTheDocument();
  });
});
