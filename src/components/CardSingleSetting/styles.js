import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 17px 20px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.grey100.mode1};
`
export const Header = styled.View`
  padding-bottom: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.white.mode1};
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
`
export const Content = styled.View`
  padding-top: 15px;
`
