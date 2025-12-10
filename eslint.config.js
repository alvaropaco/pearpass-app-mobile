import eslintConfigExpo from 'eslint-config-expo'
import { eslintConfig } from 'tether-dev-docs'

export default [
  {
    plugins: {
      expo: eslintConfigExpo
    }
  },
  ...eslintConfig
]
