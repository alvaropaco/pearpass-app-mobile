import styled from 'styled-components/native'

export const FolderWrapper = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.grey500.mode1};
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 16px;
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme, last }) =>
    last ? 'transparent' : theme.colors.grey100.mode1};
  align-items: center;
`

export const FolderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const FolderContent = styled.View`
  font-size: 20px;
  font-family: 'Inter';
  color: #fff;
  padding-left: 16px;
  flex: 1;
`

export const FolderText = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail'
})`
  font-size: 20px;
  font-family: 'Inter';
  color: #fff;
`

export const FolderCount = styled.Text`
  font-size: 14px;
  font-family: 'Inter';
  color: ${({ theme }) => theme.colors.grey100.mode1};
`
