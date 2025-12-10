import styled from 'styled-components/native'

export const Header = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 500;
`

export const Body = styled.View`
  display: flex;
  flex-direction: column;
  gap: 15px;
`
