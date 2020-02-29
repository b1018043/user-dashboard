import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from "react-router-dom";

test('exist label', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={["/add"]}>
      <App />
    </MemoryRouter>
  );
  const linkElement = getByText(/Name/i);
  expect(linkElement).toBeInTheDocument();
});
