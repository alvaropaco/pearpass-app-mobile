import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.grey100.mode1};
  background: ${({ theme }) => theme.colors.grey500.mode1};
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 700;
`

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 400;
`

export const Actions = styled.View`
  margin-top: 20px;
  flex-direction: row;
  gap: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`
