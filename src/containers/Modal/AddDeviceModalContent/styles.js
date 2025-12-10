import styled from 'styled-components/native'

export const ModalView = styled.View`
  background-color: ${({ theme }) => theme.colors.grey500.mode1};
  width: 80%;
  border-radius: 10px;
  padding: 20px 26px;
`

export const QrCodeContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.white.mode1};
  padding: 12px;
  width: 226px;
  height: 226px;
  border-radius: 10px;
  overflow: hidden;
  align-self: center;
`

export const ItemHeaderClose = styled.TouchableOpacity`
  width: 41px;
  height: 41px;
  background-color: #050b06;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ItemHeader = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const ItemHeaderTitle = styled.View`
  flex-direction: row;
  align-items: center;
`

export const ItemHeaderLabel = styled.Text`
  font-family: 'Inter';
  color: #fff;
  padding-left: 8px;
  font-size: 20px;
`

export const QrCodeTitle = styled.Text`
  font-size: 14px;
  font-family: 'Inter';
  color: #fff;
  text-align: center;
  padding: 10px 0;
`

export const ExpireContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.grey400.mode1};
  border-radius: 10px;
  margin-top: 12px;
  height: 32px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const ExpireText = styled.Text`
  font-size: 14px;
  font-family: 'Inter';
  color: #fff;
  text-align: center;
`

export const CopyAccountContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.grey400.mode1};
  border-radius: 10px;
  margin-top: 16px;
  height: 64px;
  //gap: 12px;
  padding: 10px;
`

export const CopyAccount = styled.View`
  flex-direction: row;
  padding-bottom: 8px;
  align-items: center;
`

export const CopyAccountTitle = styled.Text`
  font-size: 14px;
  font-family: 'Inter';
  color: #fff;
  padding-right: 8px;
`

export const CopyAddress = styled.Text`
  font-size: 14px;
  font-family: 'Inter';
  color: ${({ theme }) => theme.colors.grey200.mode1};
  flex: 1;
  flex-wrap: wrap;
`

export const CautionContainer = styled.View`
  background-color: #30250d;
  padding: 10px;
  margin-top: 12px;
  border-radius: 10px;
  border: 1px solid #ffae00;
  flex-direction: row;
  gap: 10px;
`

export const CautionText = styled.Text`
  flex: 1;
  font-size: 14px;
  font-family: 'Inter';
  color: white;
  text-align: start;
`

export const CautionIcon = styled.View`
  font-size: 14px;
  font-family: 'Inter';
  color: white;
`
