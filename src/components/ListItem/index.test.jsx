import { render, fireEvent } from '@testing-library/react-native'

import { ListItem } from './index'

jest.mock('pear-apps-utils-date', () => ({
  formatDate: jest.fn().mockReturnValue('01/01/2023')
}))

jest.mock('./styles', () => {
  const { View, Text, TouchableOpacity } = require('react-native')

  return {
    ListItemContainer: (props) => (
      <TouchableOpacity testID="vault-container" {...props}>
        {props.children}
      </TouchableOpacity>
    ),
    ListItemInfo: (props) => <View testID="vault-info" {...props} />,
    ListItemDescription: (props) => (
      <View testID="vault-description" {...props} />
    ),
    ListItemName: (props) => (
      <Text testID="vault-name" {...props}>
        {props.children}
      </Text>
    ),
    ListItemDate: (props) => (
      <Text testID="vault-date" {...props}>
        {props.children}
      </Text>
    ),
    ListItemActions: (props) => <View testID="vault-actions" {...props} />
  }
})

jest.mock('pearpass-lib-ui-react-native-components', () => ({
  BrushIcon: () => 'BrushIcon',
  DeleteIcon: () => 'DeleteIcon',
  LockCircleIcon: () => 'LockCircleIcon',
  ShareIcon: () => 'ShareIcon'
}))

describe('ListItem', () => {
  const mockProps = {
    name: 'Test Vault',
    date: '2023-01-01',
    onEditClick: () => {},
    onDeleteClick: () => {},
    onShareClick: () => {},
    onPress: jest.fn()
  }

  it('renders correctly with provided vault data', () => {
    const { getByTestId, toJSON } = render(<ListItem {...mockProps} />)

    expect(getByTestId('vault-name').props.children).toBe('Test Vault')
    expect(getByTestId('vault-date')).toBeTruthy()
    expect(toJSON()).toMatchSnapshot()
  })

  it('calls onPress when ListItemContainer is pressed', () => {
    const { getByTestId } = render(<ListItem {...mockProps} />)

    fireEvent.press(getByTestId('vault-container'))
    expect(mockProps.onPress).toHaveBeenCalled()
  })

  it('renders actions when showActions is true', () => {
    const { getByTestId } = render(
      <ListItem {...mockProps} showActions={true} />
    )

    expect(getByTestId('vault-actions')).toBeTruthy()
  })

  it('does not render actions when showActions is false', () => {
    const mockWithoutActionsProps = {
      name: 'Test Vault',
      date: '2023-01-01',
      onPress: jest.fn()
    }

    const { queryByTestId } = render(<ListItem {...mockWithoutActionsProps} />)

    expect(queryByTestId('vault-actions')?.props.children[0]).toBeUndefined()
    expect(queryByTestId('vault-actions')?.props.children[1]).toBeUndefined()
    expect(queryByTestId('vault-actions')?.props.children[2]).toBeUndefined()
  })
})
