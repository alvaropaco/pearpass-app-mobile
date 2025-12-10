import styled from 'styled-components/native'

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  gap: 7px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white.mode1};
`

export const ToastText = styled.Text`
  color: ${({ theme }) => theme.colors.black.mode1};
  font-family: 'Inter';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`
