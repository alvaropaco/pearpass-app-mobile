import { formatDate } from 'pear-apps-utils-date'
import {
  BrushIcon,
  CheckIcon,
  DeleteIcon,
  LockCircleIcon,
  ShareIcon
} from 'pearpass-lib-ui-react-native-components'
import { colors } from 'pearpass-lib-ui-theme-provider/native'

import {
  SelectedListItemIconContainer,
  ListItemActions,
  ListItemContainer,
  ListItemDate,
  ListItemDescription,
  ListItemInfo,
  ListItemName
} from './styles'

/**
 * @param {{
 *  name: string
 *  date; string
 *  onShareClick: () => void
 *  onEditClick: () => void
 *  onDeleteClick: () => void
 *  onPress: () => void
 *  isSelected?: boolean
 * }} props
 */
export const ListItem = ({
  name,
  date,
  onShareClick,
  onEditClick,
  onDeleteClick,
  onPress,
  isSelected = false,
  ...restProps
}) => (
  <ListItemContainer isSelected={isSelected} onPress={onPress} {...restProps}>
    <ListItemInfo>
      {isSelected ? (
        <SelectedListItemIconContainer>
          <CheckIcon color={colors.black.mode1} size="21" />
        </SelectedListItemIconContainer>
      ) : (
        <LockCircleIcon size="21" />
      )}

      <ListItemDescription>
        <ListItemName>{name}</ListItemName>
        {!!date && (
          <ListItemDate>{formatDate(date, 'dd-mm-yyyy', '/')}</ListItemDate>
        )}
      </ListItemDescription>
    </ListItemInfo>
    <ListItemActions>
      {onShareClick && <ShareIcon onPress={onShareClick} />}
      {onEditClick && <BrushIcon onPress={onEditClick} />}
      {onDeleteClick && <DeleteIcon onPress={onDeleteClick} />}
    </ListItemActions>
  </ListItemContainer>
)
