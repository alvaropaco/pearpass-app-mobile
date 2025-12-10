import { useEffect, useMemo } from 'react'

import { useLingui } from '@lingui/react/macro'
import { useForm } from 'pear-apps-lib-ui-react-hooks'

import { CustomFields } from '../../../components/CustomFields'
import { FormGroup } from '../../../components/FormGroup'
import { PressableNote } from '../../../components/PressableNote'
import { AttachmentField } from '../../../containers/AttachmentField'
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard'
import { useGetMultipleFiles } from '../../../hooks/useGetMultipleFiles'

export const NoteRecordDetailsForm = ({ initialRecord, selectedFolder }) => {
  const { t } = useLingui()

  const initialValues = useMemo(
    () => ({
      note: initialRecord?.data?.note ?? '',
      customFields: initialRecord?.data?.customFields ?? [],
      folder: selectedFolder ?? initialRecord?.folder,
      attachments: initialRecord?.attachments ?? []
    }),
    [initialRecord, selectedFolder]
  )

  const { registerArray, setValues, values, setValue } = useForm({
    initialValues: initialValues
  })

  const { value: list, registerItem } = registerArray('customFields')

  useGetMultipleFiles({
    fieldNames: ['attachments'],
    updateValues: setValue,
    initialRecord
  })

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues, setValues])

  const { copyToClipboard } = useCopyToClipboard()

  const hasAttachments = !!values?.attachments?.length

  return (
    <>
      {!!values?.note.length && (
        <PressableNote
          label={t`Note`}
          text={values.note}
          onPress={() => copyToClipboard(values.note)}
        />
      )}

      {hasAttachments && (
        <FormGroup>
          {values.attachments.map((attachment) => (
            <AttachmentField
              key={attachment?.id || attachment.name}
              attachment={attachment}
              label={'File'}
            />
          ))}
        </FormGroup>
      )}

      {!!list?.length && (
        <CustomFields
          onClick={copyToClipboard}
          areInputsDisabled
          customFields={list}
          register={registerItem}
        />
      )}
    </>
  )
}
