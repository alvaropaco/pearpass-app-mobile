import { render, fireEvent } from '@testing-library/react-native'

import { BackDrop } from './index'

describe('BackDrop component', () => {
  test('renders correctly when visible is true', () => {
    const onPress = jest.fn()
    const { getByTestId, toJSON } = render(
      <BackDrop visible={true} onPress={onPress} testID="backdrop" />
    )

    const backdrop = getByTestId('backdrop')
    expect(backdrop).toBeTruthy()
    expect(toJSON()).toMatchSnapshot()
  })

  test('renders correctly when visible is false', () => {
    const onPress = jest.fn()
    const { queryByTestId } = render(
      <BackDrop visible={false} onPress={onPress} testID="backdrop" />
    )

    const backdrop = queryByTestId('backdrop')
    expect(backdrop).toBeNull()
  })

  test('calls onPress when pressed', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <BackDrop visible={true} onPress={onPress} testID="backdrop" />
    )

    fireEvent.press(getByTestId('backdrop'))
    expect(onPress).toHaveBeenCalled()
    expect(onPress).toHaveBeenCalledTimes(1)
  })
})
