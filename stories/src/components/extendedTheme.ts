// 1. import `extendTheme` function
import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { PARAGRAPH_SPACING } from '../constants'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config, styles: {
  global: {
    'p': {
      paddingBottom: PARAGRAPH_SPACING,
    },
    'ul': {
      paddingLeft: 50,
      paddingBottom: PARAGRAPH_SPACING,
    },
  },
}, })

export default theme