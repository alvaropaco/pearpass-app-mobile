import styled from 'styled-components/native'

export const ItemCategoryWrapper = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 16px;
  padding-right: 16px;
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme, last }) =>
    last ? 'transparent' : theme.colors.grey100.mode1};
  align-items: center;
`

export const CategoryContainer = styled.TouchableOpacity`
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CategoryIConContainer = styled.View`
  width: 45px;
  height: 45px;
  background-color: ${({ color }) => `${color}33`};
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`

export const CategoryContent = styled.View`
  font-size: 20px;
  font-family: 'Inter';
  color: #fff;
  padding-left: 16px;
  flex: 1;
`

export const CategoryName = styled.Text`
  font-size: 20px;
  font-family: 'Inter';
  color: #fff;
`

export const CategoryDescription = styled.Text`
  font-size: 14px;
  font-family: 'Inter';
  color: ${({ theme }) => theme.colors.grey100.mode1};
`
