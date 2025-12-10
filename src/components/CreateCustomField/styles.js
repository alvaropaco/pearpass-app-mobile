import styled from 'styled-components/native'

export const Wrapper = styled.View`
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.grey400.mode1};
  border: 1px solid ${({ theme }) => theme.colors.grey100.mode1};
  padding: 20px 10px;
  z-index: 5;
  gap: 20px;
`

export const Label = styled.TouchableOpacity`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 12px;
  font-weight: 400;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
`

export const LabelText = styled.Text`
  color: ${({ theme }) => theme.colors.grey100.mode1};
  font-family: 'Inter';
  font-size: 24px;
  font-weight: 700;
`

export const ArrowIconWrapper = styled.View`
  margin-left: auto;
`

export const DropDown = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 17px;
  padding: 20px 0 0 0;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.grey100.mode1};
`
