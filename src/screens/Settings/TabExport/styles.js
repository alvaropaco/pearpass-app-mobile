import styled from 'styled-components/native'

export const Container = styled.View`
  display: flex;
  gap: 15px;
`
export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.white.mode1};
  font-family: 'Inter';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`

export const VaultsList = styled.View`
  display: flex;
  gap: 15px;
`

export const EncryptionMethod = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 170px;
  gap: 8px;
`

export const ExportFormat = styled.View`
  display: flex;
`

export const ExportButton = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
