import { render, fireEvent } from '@testing-library/react-native'
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider/native'

import { BadgeRecordCategory } from './index'
import { RECORD_ICON_BY_TYPE } from '../../constants/recordIconByType'

jest.mock('../../constants/recordIconByType', () => ({
  RECORD_ICON_BY_TYPE: {
    login: jest.fn().mockReturnValue(null),
    card: jest.fn().mockReturnValue(null),
    note: jest.fn().mockReturnValue(null)
  }
}))

describe('BadgeRecordCategory', () => {
  const mockOnPress = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly with inactive state', () => {
    const item = {
      type: 'login',
      name: 'Logins'
    }

    const { getByText, toJSON } = render(
      <ThemeProvider>
        <BadgeRecordCategory
          item={item}
          isActive={false}
          onPress={mockOnPress}
          quantity={5}
        />
      </ThemeProvider>
    )

    expect(getByText('Logins 5')).toBeTruthy()
    expect(RECORD_ICON_BY_TYPE.login).toHaveBeenCalled()
    expect(toJSON()).toMatchSnapshot()
  })

  it('renders correctly with active state', () => {
    const item = {
      type: 'card',
      name: 'Cards'
    }

    const { getByText, toJSON } = render(
      <ThemeProvider>
        <BadgeRecordCategory
          item={item}
          isActive={true}
          onPress={mockOnPress}
          quantity={3}
        />
      </ThemeProvider>
    )

    expect(getByText('Cards 3')).toBeTruthy()
    expect(RECORD_ICON_BY_TYPE.card).toHaveBeenCalled()
    expect(toJSON()).toMatchSnapshot()
  })

  it('calls onPress when pressed', () => {
    const item = {
      type: 'note',
      name: 'Notes'
    }

    const { getByText } = render(
      <ThemeProvider>
        <BadgeRecordCategory
          item={item}
          isActive={false}
          onPress={mockOnPress}
          quantity={10}
        />
      </ThemeProvider>
    )

    fireEvent.press(getByText('Notes 10').parent)
    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })

  it('applies correct colors based on active state', () => {
    const item = {
      type: 'login',
      name: 'Logins'
    }

    const { rerender, toJSON } = render(
      <ThemeProvider>
        <BadgeRecordCategory
          item={item}
          isActive={false}
          onPress={mockOnPress}
        />
      </ThemeProvider>
    )

    expect(toJSON()).toMatchSnapshot()

    rerender(
      <ThemeProvider>
        <BadgeRecordCategory
          item={item}
          isActive={true}
          onPress={mockOnPress}
        />
      </ThemeProvider>
    )

    expect(toJSON()).toMatchSnapshot()
  })

  it('renders without quantity when not provided', () => {
    const item = {
      type: 'login',
      name: 'Logins'
    }

    const { getByText } = render(
      <ThemeProvider>
        <BadgeRecordCategory
          item={item}
          isActive={false}
          onPress={mockOnPress}
        />
      </ThemeProvider>
    )

    expect(getByText('Logins ')).toBeTruthy()
  })
})
