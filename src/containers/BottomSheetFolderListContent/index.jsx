import { BottomSheetScrollView } from '@gorhom/bottom-sheet'

import { FolderList } from '../FolderList'

/**
 * @param {{
 *  selectedFolder: string
 *  onFolderSelect: () => void
 * }} props
 */
export const BottomSheetFolderListContent = ({
  selectedFolder,
  onFolderSelect
}) => (
  <BottomSheetScrollView style={{ padding: 20 }}>
    <FolderList
      selectedFolder={selectedFolder}
      onFolderSelect={onFolderSelect}
    />
  </BottomSheetScrollView>
)
