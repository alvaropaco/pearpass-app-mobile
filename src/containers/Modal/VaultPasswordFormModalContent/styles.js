import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 20px;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.grey100.mode1};
  background: ${({ theme }) => theme.colors.grey500.mode1};
  position: relative;
`
export const Header = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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
  display: flex;
  margin-top: 20px;
  gap: 20px;
`

export const CloseButtonWrapper = styled.View`
  position: absolute;
  right: 14px;
  top: 14px;
`
