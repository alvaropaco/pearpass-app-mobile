import { useLingui } from '@lingui/react/macro'
import { CommonFileIcon } from 'pearpass-lib-ui-react-native-components'

import { InputField } from '../../libComponents'

export const InputFieldNote = (props) => {
  const { t } = useLingui()
  return (
    <InputField
      label={t`Note`}
      placeholder={t`Add note`}
      variant="outline"
      icon={CommonFileIcon}
      {...props}
    />
  )
}
