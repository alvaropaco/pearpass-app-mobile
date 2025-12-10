import styled from 'styled-components/native'

export const Wrapper = styled.View`
  width: 100%;
  flex-direction: column;
  gap: 10px;
`

export const TitleWrapper = styled.TouchableOpacity`
  flex-direction: row;
  gap: 6px;
  align-items: center;
`
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.grey100.mode1};
  font-family: 'Inter';
  font-size: 12px;
  font-weight: 400;
  align-self: flex-start;
`
