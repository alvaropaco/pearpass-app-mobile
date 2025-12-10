import { Buffer } from 'buffer'

import { useMemo } from 'react'

import { generateAvatarInitials } from 'pear-apps-utils-avatar-initials'
import { CheckIcon, StarIcon } from 'pearpass-lib-ui-react-native-components'
import { colors } from 'pearpass-lib-ui-theme-provider/native'
import { getDefaultFavicon } from 'pearpass-lib-vault'

import {
  AvatarImage,
  AvatarInitials,
  FavoriteBadge,
  ItemImageContainer
} from './styles'
import { RECORD_COLOR_BY_TYPE } from '../../constants/recordColorByType'
import { extractDomainName } from '../../utils/extractDomainName'

global.Buffer = global.Buffer || Buffer

/**
 *
 * @param {{
 *  record: any,
 *  size: 'sm' | 'md' | 'lg',
 *  isSelected: boolean,
 *  websiteDomain?: string
 * }} param0
 * @returns
 */
export const AvatarRecord = ({
  record,
  size = 'sm',
  isSelected,
  websiteDomain
}) => {
  const avatarSrc = useMemo(() => {
    if (!websiteDomain) {
      return null
    }

    const website = extractDomainName(websiteDomain)

    const avatarBuffer = getDefaultFavicon(website) || null

    if (!avatarBuffer) {
      return null
    }

    const base64 = Buffer.from(avatarBuffer).toString('base64')

    return base64 ? `data:image/png;base64,${base64}` : null
  }, [websiteDomain])

  if (isSelected) {
    return (
      <ItemImageContainer isSelected={isSelected} size={size}>
        <CheckIcon color={colors.black.mode1} size="28" />
      </ItemImageContainer>
    )
  }

  return (
    <ItemImageContainer isSelected={isSelected} size={size}>
      {avatarSrc ? (
        <AvatarImage
          testID="avatar-image"
          source={{ uri: avatarSrc }}
          size={size}
        />
      ) : (
        <AvatarInitials size={size} color={RECORD_COLOR_BY_TYPE[record.type]}>
          {generateAvatarInitials(record.data?.title)}
        </AvatarInitials>
      )}
      {record.isFavorite && (
        <FavoriteBadge testID="favorite-badge">
          <StarIcon fill color={colors.primary400.mode1} />
        </FavoriteBadge>
      )}
    </ItemImageContainer>
  )
}
