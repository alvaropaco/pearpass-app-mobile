import {
  CheckIcon,
  KebabMenuIcon
} from 'pearpass-lib-ui-react-native-components'

import {
  MenuItemWrapper,
  MenuItemContainer,
  ItemContainer,
  RecordText,
  MenuItemRightSide
} from './styles'
import { RECORD_ACTION_ICON_BY_TYPE } from '../../constants/recordActions'
import { useSharedFilter } from '../../context/SharedFilterContext'

export const MenuActionItem = ({ item, onPress }) => {
  const { state } = useSharedFilter()
  const ActionIcon = RECORD_ACTION_ICON_BY_TYPE[item.type]
  return (
    <MenuItemWrapper>
      <MenuItemContainer onPress={onPress}>
        <ItemContainer>
          <ActionIcon size="24" />
          <RecordText>{item.name}</RecordText>
        </ItemContainer>
        <MenuItemRightSide>
          {(item.type === 'sort' || item.type === 'recent') &&
            item.name === state.sort && <CheckIcon size={24} />}

          <KebabMenuIcon size={24} />
        </MenuItemRightSide>
      </MenuItemContainer>
    </MenuItemWrapper>
  )
}
