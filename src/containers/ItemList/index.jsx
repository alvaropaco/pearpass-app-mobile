import { useCallback } from 'react'

import { useNavigation } from '@react-navigation/native'
import { KebabMenuIcon } from 'pearpass-lib-ui-react-native-components'
import { TouchableOpacity } from 'react-native'

import { AvatarRecord } from '../../components/AvatarRecord'
import { useBottomSheet } from '../../context/BottomSheetContext'
import { BottomSheetRecordActionsContent } from '../BottomSheetRecordActionsContent'
import {
  Container,
  Item,
  ItemRow,
  ItemSubText,
  ItemText,
  ItemTextContainer
} from './styles'

export const ItemList = ({
  records = [],
  isMultiSelectOn,
  selectedRecords,
  setSelectedRecords
}) => {
  const navigation = useNavigation()

  const { expand } = useBottomSheet()

  const isRecordSelected = useCallback(
    (recordId) => selectedRecords.includes(recordId),
    [selectedRecords]
  )

  const handleRecordPress = (recordId) => {
    if (isMultiSelectOn) {
      setSelectedRecords((prevRecords) => {
        if (prevRecords.includes(recordId)) {
          return prevRecords.filter((id) => id !== recordId)
        } else {
          return [...prevRecords, recordId]
        }
      })
    } else {
      navigation.navigate('RecordDetails', {
        recordId: recordId
      })
    }
  }

  return (
    <Container
      data={records}
      keyExtractor={(item) => item.id}
      extraData={selectedRecords}
      renderItem={({ item: record }) => {
        const isSelected = isRecordSelected(record.id)
        const websiteDomain =
          record.type === 'login' ? record?.data?.websites?.[0] : null
        return (
          <Item
            isSelected={isSelected}
            onPress={() => handleRecordPress(record.id)}
            accessible={false}
          >
            <ItemRow>
              <AvatarRecord
                websiteDomain={websiteDomain}
                isSelected={isSelected}
                record={record}
              />

              <ItemTextContainer>
                <ItemText accessible>{record.data?.title}</ItemText>
                <ItemSubText>{record.folder}</ItemSubText>
              </ItemTextContainer>
            </ItemRow>

            <TouchableOpacity
              onPress={() =>
                expand({
                  children: (
                    <BottomSheetRecordActionsContent
                      record={record}
                      recordType={record.type}
                      excludeTypes={['move']}
                    />
                  ),
                  snapPoints: ['10%', '35%', '35%']
                })
              }
            >
              <KebabMenuIcon size={21} />
            </TouchableOpacity>
          </Item>
        )
      }}
    />
  )
}
