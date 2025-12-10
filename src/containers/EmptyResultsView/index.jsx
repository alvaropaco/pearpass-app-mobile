import { useLingui } from '@lingui/react/macro'

import { Container, SubTitle, Title } from './styles'

export const EmptyResultsView = () => {
  const { t } = useLingui()

  return (
    <Container>
      <Title>{t`No result found.`}</Title>

      <SubTitle>{t`Try to search it into another collection`}</SubTitle>
    </Container>
  )
}
