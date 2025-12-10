import { render, fireEvent } from '@testing-library/react-native'

import { ListItemRecordCategory } from './index'

jest.mock('./styles', () => {
  const { View, Text, TouchableOpacity } = require('react-native')
  return {
    ItemCategoryWrapper: (props) => (
      <View testID="item-category-wrapper" {...props} />
    ),
    CategoryContainer: (props) => (
      <TouchableOpacity {...props}>{props.children}</TouchableOpacity>
    ),
    CategoryContent: (props) => <View testID="category-content" {...props} />,
    CategoryIConContainer: (props) => (
      <View testID="category-icon-container" {...props}>
        {props.children}
      </View>
    ),
    CategoryDescription: (props) => (
      <Text testID="category-description" {...props}>
        {props.children}
      </Text>
    ),
    CategoryName: (props) => (
      <Text testID="category-name" {...props}>
        {props.children}
      </Text>
    )
  }
})

jest.mock('../../constants/recordColorByType', () => ({
  RECORD_COLOR_BY_TYPE: {
    expense: 'red',
    income: 'green'
  }
}))

jest.mock('../../constants/recordIconByType', () => {
  const { Text } = require('react-native')
  return {
    RECORD_ICON_BY_TYPE: {
      expense: (props) => (
        <Text testID="expense-icon" {...props}>
          ExpenseIcon
        </Text>
      ),
      income: (props) => (
        <Text testID="income-icon" {...props}>
          IncomeIcon
        </Text>
      )
    }
  }
})

describe('ListItemRecordCategory', () => {
  const item = {
    type: 'expense',
    name: 'Food',
    description: 'Food and drinks'
  }
  const onPressMock = jest.fn()

  it('renders correctly with provided item data', () => {
    const { getByTestId, toJSON } = render(
      <ListItemRecordCategory item={item} onPress={onPressMock} />
    )

    expect(getByTestId('category-name').props.children).toBe('Food')
    expect(getByTestId('category-description').props.children).toBe(
      'Food and drinks'
    )

    expect(getByTestId('category-icon-container').props.color).toBe('red')

    expect(getByTestId('expense-icon')).toBeTruthy()
    expect(toJSON()).toMatchSnapshot()
  })

  it('calls onPress when CategoryContainer is pressed', () => {
    const { getByTestId } = render(
      <ListItemRecordCategory item={item} onPress={onPressMock} />
    )

    fireEvent.press(getByTestId('record-item-expense'))
    expect(onPressMock).toHaveBeenCalled()
  })
})
