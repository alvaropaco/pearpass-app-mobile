import styled from 'styled-components/native'

export const MenuItemWrapper = styled.View`
  padding-bottom: 16px;
  padding-right: 16px;
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme, last }) =>
    last ? 'transparent' : theme.colors.grey100.mode1};
  align-items: center;
`

export const MenuItemContainer = styled.TouchableOpacity`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
`
export const ItemContainer = styled.View`
  flex-direction: row;
  display: flex;
  align-items: center;
  gap: 12px;
`

export const RecordText = styled.Text`
  font-size: 20px;
  font-weight: 400;
  font-family: 'Inter';
  color: ${({ theme }) => theme.colors.white.mode1};
`

export const MenuItemRightSide = styled.View`
  flex-direction: row;
  display: flex;
  align-items: center;
  gap: 12px;
`
