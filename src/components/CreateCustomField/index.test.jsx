import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { render, fireEvent } from '@testing-library/react-native'
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider/native'

import { CreateCustomField } from './index'
import messages from '../../locales/en/messages'

i18n.load('en', messages)
i18n.activate('en')

jest.mock('@lingui/react/macro', () => ({
  useLingui: () => ({
    t: (strings) => strings[0]
  })
}))

const renderWithProviders = (ui) =>
  render(
    <I18nProvider i18n={i18n}>
      <ThemeProvider>{ui}</ThemeProvider>
    </I18nProvider>
  )

describe('CreateCustomField', () => {
  const mockOnCreateCustom = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly in closed state', () => {
    const { getByText, queryByText, toJSON } = renderWithProviders(
      <CreateCustomField onCreateCustom={mockOnCreateCustom} />
    )

    expect(getByText('Create Custom')).toBeTruthy()
    expect(queryByText('Note')).toBeFalsy()
    expect(toJSON()).toMatchSnapshot()
  })

  it('opens dropdown when label is clicked', () => {
    const { getByText } = renderWithProviders(
      <CreateCustomField onCreateCustom={mockOnCreateCustom} />
    )

    fireEvent.press(getByText('Create Custom').parent)

    expect(getByText('Note')).toBeTruthy()
  })

  it('calls onCreateCustom with correct type when option is selected', () => {
    const { getByText } = renderWithProviders(
      <CreateCustomField onCreateCustom={mockOnCreateCustom} />
    )

    fireEvent.press(getByText('Create Custom').parent)

    fireEvent.press(getByText('Note').parent)

    expect(mockOnCreateCustom).toHaveBeenCalledWith('note')
  })

  it('closes dropdown after selecting an option', () => {
    const { getByText, queryByText } = renderWithProviders(
      <CreateCustomField onCreateCustom={mockOnCreateCustom} />
    )

    fireEvent.press(getByText('Create Custom').parent)

    expect(queryByText('Note')).toBeTruthy()

    fireEvent.press(getByText('Note').parent)

    expect(queryByText('Note')).toBeFalsy()
  })

  it('toggles dropdown state when label is clicked multiple times', () => {
    const { getByText, queryByText } = renderWithProviders(
      <CreateCustomField onCreateCustom={mockOnCreateCustom} />
    )

    expect(queryByText('Note')).toBeFalsy()

    fireEvent.press(getByText('Create Custom').parent)
    expect(queryByText('Note')).toBeTruthy()

    fireEvent.press(getByText('Create Custom').parent)
    expect(queryByText('Note')).toBeFalsy()
  })

  it('displays the correct icon based on dropdown state', () => {
    const { getByText, toJSON } = renderWithProviders(
      <CreateCustomField onCreateCustom={mockOnCreateCustom} />
    )

    expect(toJSON()).toMatchSnapshot()

    fireEvent.press(getByText('Create Custom').parent)

    expect(toJSON()).toMatchSnapshot()
  })
})
