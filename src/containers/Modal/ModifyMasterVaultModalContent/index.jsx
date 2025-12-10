import { useState } from 'react'

import { useLingui } from '@lingui/react/macro'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import { Validator } from 'pear-apps-utils-validator'
import { useUserData } from 'pearpass-lib-vault'
import { checkPasswordStrength } from 'pearpass-utils-password-check'

import { useModal } from '../../../context/ModalContext'
import { ModifyVaultsModaContentWrapper } from '../ModifyVaultsModaContentWrapper'
import { InputLabel, InputWrapper } from './styles'
import { InputPasswordPearPass } from '../../../libComponents'
import { logger } from '../../../utils/logger'

export const ModifyMasterVaultModalContent = () => {
  const { closeModal } = useModal()
  const { t } = useLingui()

  const { updateMasterPassword } = useUserData()

  const [isLoading, setIsLoading] = useState(false)

  const errors = {
    minLength: t`Password must be at least 8 characters long`,
    hasLowerCase: t`Password must contain at least one lowercase letter`,
    hasUpperCase: t`Password must contain at least one uppercase letter`,
    hasNumbers: t`Password must contain at least one number`,
    hasSymbols: t`Password must contain at least one special character`
  }

  const schema = Validator.object({
    currentPassword: Validator.string().required(t`Invalid password`),
    newPassword: Validator.string().required(t`Password is required`),
    repeatPassword: Validator.string().required(t`Password is required`)
  })

  const { register, handleSubmit, setErrors, setValue } = useForm({
    initialValues: { currentPassword: '', newPassword: '', repeatPassword: '' },
    validate: (values) => schema.validate(values)
  })

  const onSubmit = async (values) => {
    const result = checkPasswordStrength(values.newPassword, { errors })

    if (!result.success) {
      setErrors({
        newPassword: result.errors[0]
      })

      setValue('repeatPassword', '')
      return
    }

    if (values.newPassword !== values.repeatPassword) {
      setErrors({
        repeatPassword: t`Passwords do not match`
      })

      return
    }

    try {
      setIsLoading(true)
      await updateMasterPassword({
        newPassword: values.newPassword,
        currentPassword: values.currentPassword
      })

      setIsLoading(false)
      closeModal()
    } catch (error) {
      setIsLoading(false)
      logger.error('Error updating master password:', error)
      setErrors({
        currentPassword: t`Invalid password`
      })
    }
  }

  return (
    <ModifyVaultsModaContentWrapper
      title={t`Modify master password`}
      secondaryAction={closeModal}
      primaryAction={handleSubmit(onSubmit)}
      isLoading={isLoading}
    >
      <InputWrapper>
        <InputLabel>{t`Insert old password`}</InputLabel>
        <InputPasswordPearPass isPassword {...register('currentPassword')} />
      </InputWrapper>

      <InputWrapper>
        <InputLabel>{t`Create new password`}</InputLabel>
        <InputPasswordPearPass isPassword {...register('newPassword')} />
      </InputWrapper>

      <InputWrapper>
        <InputLabel>{t`Repeat new password`}</InputLabel>
        <InputPasswordPearPass isPassword {...register('repeatPassword')} />
      </InputWrapper>
    </ModifyVaultsModaContentWrapper>
  )
}
