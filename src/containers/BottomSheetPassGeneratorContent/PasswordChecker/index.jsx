import { useLingui } from '@lingui/react/macro'
import { checkPasswordStrength } from 'pearpass-utils-password-check'

import { HighlightString, NoticeText } from '../../../libComponents'
import { PasswordWrapper } from '../styles'

/**
 * @param {{
 *  pass: string
 * }} props
 */
export const PasswordChecker = ({ pass }) => {
  const { t } = useLingui()

  const { strengthText, strengthType } = checkPasswordStrength(pass)

  return (
    <PasswordWrapper>
      <HighlightString text={pass} />
      <NoticeText text={t(strengthText)} type={strengthType} />
    </PasswordWrapper>
  )
}
