import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'

import { ListItemRecordCategory } from '../../components/ListItemRecordCategory'
import { BottomSheetPassGeneratorContent } from '../../containers/BottomSheetPassGeneratorContent'
import { useBottomSheet } from '../../context/BottomSheetContext'
import { useRecordMenuItems } from '../../hooks/useRecordMenuItems'

export const BottomSheetRecordCreateContent = () => {
  const navigation = useNavigation()

  const { expand, collapse } = useBottomSheet()

  const menuItems = useRecordMenuItems({
    exclude: ['all']
  })

  const handleRecordPress = (item) => {
    if (item.type === 'password') {
      collapse()

      expand({
        children: <BottomSheetPassGeneratorContent />,
        snapPoints: ['10%', '75%'],
        enableContentPanningGesture: false
      })

      return
    }

    navigation.navigate('CreateRecord', { recordType: item.type })

    collapse()
  }

  return (
    <BottomSheetFlatList
      accessible={false}
      style={{ padding: 20 }}
      data={menuItems}
      renderItem={({ item }) => (
        <ListItemRecordCategory
          key={item.type}
          item={item}
          onPress={() => handleRecordPress(item)}
        />
      )}
    />
  )
}
