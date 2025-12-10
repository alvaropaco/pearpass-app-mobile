import { useEffect, useMemo } from 'react'

import { useForm } from 'pear-apps-lib-ui-react-hooks'

import { CustomFields } from '../../../components/CustomFields'
import { FormGroup } from '../../../components/FormGroup'
import { InputFieldNote } from '../../../components/InputFieldNote'
import { PassPhrase } from '../../../containers/PassPhrase'
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard'

/**
 * @param {{
 *   initialRecord?: {
 *     data: {
 *       title: string,
 *       passPhrase: string,
 *       note?: string,
 *       customFields?: Array<{note: string}>
 *     },
 *     folder?: string
 *   },
 *   selectedFolder?: string
 * }} props
 * @returns {JSX.Element}
 */

export const PassPhraseRecordDetailsForm = ({
  initialRecord,
  selectedFolder
}) => {
  const initialValues = useMemo(
    () => ({
      title: initialRecord?.data?.title ?? '',
      passPhrase: initialRecord?.data?.passPhrase ?? '',
      note: initialRecord?.data?.note ?? '',
      customFields: initialRecord?.data.customFields ?? [],
      folder: selectedFolder ?? initialRecord?.folder
    }),
    [initialRecord, selectedFolder]
  )

  const { register, registerArray, setValues, values } = useForm({
    initialValues: initialValues
  })

  const { value: customFieldsList, registerItem: registerCustomFieldItem } =
    registerArray('customFields')

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues, setValues])

  const { copyToClipboard } = useCopyToClipboard()

  const handleTapToCopy = (name) => {
    copyToClipboard(values[name])
  }

  const hasPassPhrase = !!values?.passPhrase?.length
  const hasNote = !!values?.note?.length
  const hasCustomFields = !!customFieldsList?.length

  return (
    <>
      {hasPassPhrase && (
        <FormGroup>
          <PassPhrase {...register('passPhrase')} />
        </FormGroup>
      )}

      {hasNote && (
        <FormGroup>
          <InputFieldNote
            onClick={() => handleTapToCopy('note')}
            isDisabled
            {...register('note')}
          />
        </FormGroup>
      )}

      {hasCustomFields && (
        <CustomFields
          onClick={copyToClipboard}
          areInputsDisabled
          customFields={customFieldsList}
          register={registerCustomFieldItem}
        />
      )}
    </>
  )
}
