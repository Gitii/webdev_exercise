import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { SWRConfig } from 'swr';

const LOCATION_DISPLAY_TEST_ID = 'location-display';

/**
 * Displays the location for testing purposes only.
 * See https://testing-library.com/docs/example-react-router/ for details.
 */
function LocationDisplay() {
  const location = useLocation();

  return <div data-testid={LOCATION_DISPLAY_TEST_ID}>{location.pathname}</div>;
}

type Options = {
  pathName?: string;
};

const customRender = (
  ui: React.ReactElement,
  { pathName, ...options }: Omit<RenderOptions, 'wrapper'> & Options = {},
) => {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <SWRConfig
        value={{ provider: () => new Map(), revalidateIfStale: false }}
      >
        <MemoryRouter initialEntries={pathName ? [pathName] : undefined}>
          {children}
          <LocationDisplay />
        </MemoryRouter>
      </SWRConfig>
    );
  };

  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: AllTheProviders as unknown as React.FunctionComponent,
      ...options,
    }),
  };
};

// override render method
export { customRender as render, LOCATION_DISPLAY_TEST_ID };
export { server } from './server';
