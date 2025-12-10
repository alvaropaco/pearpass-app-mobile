import styled from 'styled-components/native'

export const ButtonRadioContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 2px solid
    ${({ theme, isActive }) =>
      isActive ? theme.colors.primary400.mode1 : theme.colors.primary300.mode1};
  padding: 2px;
`

export const ButtonRadioInner = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary400.mode1};
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: opacity 300ms ease-in-out;
`

export const RadioSelectWrapper = styled.View`
  flex-direction: column;
`

export const RadioTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 400;
`

export const RadioOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 20px;
  font-weight: 600;
  margin-top: 15px;
`

export const RadioOptionText = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 20px;
  font-weight: 600;
`
