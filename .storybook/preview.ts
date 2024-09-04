import type { Preview } from '@storybook/react'
import '../src/app/globals.css'
import '!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css'

import en from '../messages/en.json'
import ua from '../messages/ua.json'

const messagesByLocale: Record<string, any> = {
  en,
  ua,
}
const nextIntl = {
  defaultLocale: 'en',
  messagesByLocale,
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextIntl,
  },
  globals: {
    locale: 'en',
  },
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Мова інтерфейсу',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'uk', title: 'Українська' },
        ],
      },
    },
  },
}

export default preview
