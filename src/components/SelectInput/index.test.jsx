import { render, fireEvent } from '@testing-library/react-native'

import { SelectInput } from './index'

jest.mock('./styles', () => {
  const { View, Text, TouchableOpacity } = require('react-native')
  return {
    Dropdown: (props) => <View testID="dropdown" {...props} />,
    DropdownItem: (props) => (
      <TouchableOpacity testID="select-option" {...props}>
        {props.children}
      </TouchableOpacity>
    ),
    DropdownText: (props) => (
      <Text testID="select-option-text" {...props}>
        {props.children}
      </Text>
    ),
    SelectBox: (props) => (
      <TouchableOpacity testID="select-box" {...props}>
        {props.children}
      </TouchableOpacity>
    ),
    SelectedText: (props) => (
      <Text testID="selected-value" {...props}>
        {props.children}
      </Text>
    )
  }
})

describe('SelectInput', () => {
  const options = [
    { label: 'Item 1', value: 'item1' },
    { label: 'Item 2', value: 'item2' },
    { label: 'Item 3', value: 'item3' }
  ]
  const selectedValue = 'item2'
  const onChangeMock = jest.fn()

  beforeEach(() => {
    onChangeMock.mockClear()
  })

  it('renders correctly with provided props', () => {
    const { getByTestId, getAllByTestId, toJSON } = render(
      <SelectInput
        options={options}
        value={selectedValue}
        onChange={onChangeMock}
      />
    )

    fireEvent.press(getByTestId('select-box'))

    expect(getAllByTestId('select-option')).toHaveLength(options.length)
    expect(getAllByTestId('select-option-text')[0].props.children).toBe(
      'Item 1'
    )
    expect(getAllByTestId('select-option-text')[1].props.children).toBe(
      'Item 2'
    )
    expect(getAllByTestId('select-option-text')[2].props.children).toBe(
      'Item 3'
    )

    expect(toJSON()).toMatchSnapshot()
  })

  it('calls onChange when an option is pressed', () => {
    const { getByTestId, getAllByTestId } = render(
      <SelectInput
        options={options}
        value={selectedValue}
        onChange={onChangeMock}
      />
    )

    fireEvent.press(getByTestId('select-box'))
    fireEvent.press(getAllByTestId('select-option')[0])
    expect(onChangeMock).toHaveBeenCalledWith('item1')

    fireEvent.press(getByTestId('select-box'))
    fireEvent.press(getAllByTestId('select-option')[2])
    expect(onChangeMock).toHaveBeenCalledWith('item3')
  })

  it('does not crash when onChange is not provided', () => {
    const { getByTestId, getAllByTestId } = render(
      <SelectInput options={options} value={selectedValue} />
    )

    fireEvent.press(getByTestId('select-box'))
    expect(() => {
      fireEvent.press(getAllByTestId('select-option')[0])
    }).not.toThrow()
  })
})
