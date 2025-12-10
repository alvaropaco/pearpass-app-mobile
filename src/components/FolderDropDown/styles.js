import styled from 'styled-components/native'

export const FolderSelectorWrapper = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.grey500.mode1};
  border: 1px solid ${({ theme }) => theme.colors.primary400.mode1};
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`

export const FolderTitle = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail'
})`
  font-size: 16px;
  font-family: 'Inter';
  color: #fff;
  max-width: 100px;
`
