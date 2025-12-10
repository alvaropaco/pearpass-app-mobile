import { useLingui } from '@lingui/react/macro'
import {
  CheckIcon,
  KebabMenuIcon
} from 'pearpass-lib-ui-react-native-components'
import { colors } from 'pearpass-lib-ui-theme-provider/native'

import {
  FolderContainer,
  FolderContent,
  FolderCount,
  FolderText,
  FolderWrapper
} from './styles'
import { useBottomSheet } from '../../context/BottomSheetContext'

/**
 *
 * @param {{
 *  folder: any
 *  isLast: boolean
 *  onFolderSelect: (folder: any) => void
 *  onCreateNewFolder: () => void
 *  isFilter: boolean
 *  isActive: boolean
 * }} props
 * @returns
 */
export const Folder = ({
  folder,
  isLast,
  onFolderSelect,
  onLongPress,
  onCreateNewFolder,
  isActive
}) => {
  const { t } = useLingui()
  const { collapse } = useBottomSheet()

  const handlePress = () => {
    collapse()

    if (folder.isCreateNew) {
      onCreateNewFolder()

      return
    }

    onFolderSelect(folder)
  }

  return (
    <FolderWrapper
      last={isLast}
      onLongPress={onLongPress}
      onPress={handlePress}
    >
      <FolderContainer>
        {folder.icon}

        <FolderContent>
          <FolderText>{folder.name}</FolderText>

          {!folder.isCreateNew && (
            <FolderCount>
              {folder.count ?? 0} {t`items`}
            </FolderCount>
          )}
        </FolderContent>

        {isActive && <CheckIcon color={colors.primary400.mode1} size="24" />}
      </FolderContainer>

      <KebabMenuIcon size="21" />
    </FolderWrapper>
  )
}
