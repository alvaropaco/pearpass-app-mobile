import { render, fireEvent } from '@testing-library/react-native'

import { RadioSelect } from './index'

jest.mock('./styles', () => {
  const { View, Text, TouchableOpacity } = require('react-native')
  return {
    RadioSelectWrapper: (props) => (
      <View testID="radio-select-wrapper" {...props} />
    ),
    RadioTitle: (props) => (
      <Text testID="radio-title" {...props}>
        {props.children}
      </Text>
    ),
    RadioOption: (props) => (
      <TouchableOpacity testID="radio-option" {...props}>
        {props.children}
      </TouchableOpacity>
    ),
    ButtonRadioContainer: (props) => (
      <View
        testID="button-radio-container"
        data-isactive={props.isActive}
        {...props}
      />
    ),
    ButtonRadioInner: (props) => (
      <View
        testID="button-radio-inner"
        data-isactive={props.isActive}
        {...props}
      />
    ),
    RadioOptionText: (props) => (
      <Text testID="radio-option-text" {...props}>
        {props.children}
      </Text>
    )
  }
})

describe('RadioSelect', () => {
  const title = 'Select an option'
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'dark' },
    { label: 'Option 3', value: 'white' }
  ]
  const selectedOption = 'dark'
  const onChangeMock = jest.fn()

  beforeEach(() => {
    onChangeMock.mockClear()
  })

  it('renders correctly with provided props', () => {
    const { getByTestId, getAllByTestId, toJSON } = render(
      <RadioSelect
        title={title}
        options={options}
        selectedOption={selectedOption}
        onChange={onChangeMock}
      />
    )

    expect(getByTestId('radio-title').props.children).toBe(title)
    expect(getAllByTestId('radio-option')).toHaveLength(options.length)
    expect(getAllByTestId('radio-option-text')[0].props.children).toBe(
      'Option 1'
    )
    expect(getAllByTestId('radio-option-text')[1].props.children).toBe(
      'Option 2'
    )
    expect(getAllByTestId('radio-option-text')[2].props.children).toBe(
      'Option 3'
    )

    const radioContainers = getAllByTestId('button-radio-container')
    expect(radioContainers[0].props['data-isactive']).toBe(false)
    expect(radioContainers[1].props['data-isactive']).toBe(true)
    expect(radioContainers[2].props['data-isactive']).toBe(false)

    expect(toJSON()).toMatchSnapshot()
  })

  it('calls onChange when an option is pressed', () => {
    const { getAllByTestId } = render(
      <RadioSelect
        title={title}
        options={options}
        selectedOption={selectedOption}
        onChange={onChangeMock}
      />
    )

    fireEvent.press(getAllByTestId('radio-option')[0])
    expect(onChangeMock).toHaveBeenCalledWith('option1')

    fireEvent.press(getAllByTestId('radio-option')[2])
    expect(onChangeMock).toHaveBeenCalledWith('white')
  })

  it('does not crash when onChange is not provided', () => {
    const { getAllByTestId } = render(
      <RadioSelect
        title={title}
        options={options}
        selectedOption={selectedOption}
      />
    )

    expect(() => {
      fireEvent.press(getAllByTestId('radio-option')[0])
    }).not.toThrow()
  })
})
