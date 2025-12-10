import styled from 'styled-components/native'

export const Wrapper = styled.View`
  align-items: center;
  flex-direction: ${({ switchFirst }) => (switchFirst ? 'row-reverse' : 'row')};
  width: 100%;
  justify-content: space-between;
  overflow: hidden;
  gap: 12px;
`

export const LabelContainers = styled.View`
  flex-direction: column;
  align-items: ${({ switchFirst }) =>
    switchFirst ? 'flex-end' : 'flex-start'};
  width: 100%;
  flex: 1;
`

export const SwitchText = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 600;
`

export const SwitchDescription = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 12px;
  font-weight: 300;
  white-space: wrap;
`
