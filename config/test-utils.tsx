import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

import messages from '../messages/en.json'

function renderWithProviders(ui: React.ReactElement) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <NextIntlClientProvider messages={messages} locale="en">
        {children}
      </NextIntlClientProvider>
    )
  }
  return {
    ...render(ui, { wrapper: Wrapper }),
  }
}

export { renderWithProviders }
