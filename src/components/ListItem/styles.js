import styled from 'styled-components/native'

export const ListItemContainer = styled.TouchableOpacity`
  min-width: 100%;
  padding: 5px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.grey100.mode1};
`

export const SelectedListItemIconContainer = styled.View`
  display: flex;
  width: 30px;
  height: 30px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary400.mode1};
`

export const ListItemInfo = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`

export const ListItemDescription = styled.View`
  gap: -2px;
  flex: 1;
`

export const ListItemName = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail'
})`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  width: 80%;
`

export const ListItemDate = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
`

export const ListItemActions = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: center;
`
