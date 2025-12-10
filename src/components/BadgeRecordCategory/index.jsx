import { colors } from 'pearpass-lib-ui-theme-provider/native'

import { CategoryItem, CategoryText } from './styles'
import { RECORD_COLOR_BY_TYPE } from '../../constants/recordColorByType'
import { RECORD_ICON_BY_TYPE } from '../../constants/recordIconByType'

export const BadgeRecordCategory = ({ item, isActive, onPress, quantity }) => {
  const Icon = RECORD_ICON_BY_TYPE[item.type]

  return (
    <CategoryItem
      activeOpacity={0.5}
      color={isActive ? RECORD_COLOR_BY_TYPE[item.type] : undefined}
      borderColor={RECORD_COLOR_BY_TYPE[item.type]}
      onPress={onPress}
    >
      <Icon
        color={isActive ? colors.black.mode1 : RECORD_COLOR_BY_TYPE[item.type]}
        size={21}
        fill
      />
      <CategoryText active={isActive}>
        {item.name} {quantity}
      </CategoryText>
    </CategoryItem>
  )
}
