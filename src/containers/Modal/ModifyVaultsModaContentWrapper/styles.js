import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 20px;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 15px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.grey100.mode1};
  background: ${({ theme }) => theme.colors.grey500.mode1};
`

export const Header = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 600;
`

export const ContentContainer = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
`

export const ModalActions = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 25px;
  align-items: center;
`
