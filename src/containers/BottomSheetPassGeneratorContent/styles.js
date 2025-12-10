import styled from 'styled-components/native'

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 400;
  text-align: center;
`

export const NoticeWrapper = styled.View`
  align-items: center;
  width: 100%;
  padding-top: 20px;
`

export const Pass = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 20px;
  font-weight: 400;
  padding-top: 50px;
`

export const DividerLine = styled.View`
  background-color: ${({ theme }) => theme.colors.grey300.mode1};
  height: 1px;
  margin-top: 20px;
  margin-bottom: 20px;
`

export const SliderWrapper = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

export const SwitchWrapper = styled.View`
  align-items: center;
  gap: 9px;
`

export const SliderText = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 400;
`

export const SwitchText = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 600;
`

export const PasswordWrapper = styled.View`
  align-items: center;
  margin-top: 42px;
  min-height: 20px;
  gap: 8px;
`
export const ActionsContainer = styled.View`
  width: 100%;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 25px;
  padding-bottom: 40px;
`
