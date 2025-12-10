import { useLingui } from '@lingui/react/macro'
import {
  parse1PasswordData,
  parseBitwardenData,
  parseLastPassData,
  parseNordPassData,
  parsePearPassData,
  parseProtonPassData
} from 'pearpass-lib-data-import'
import { LockIcon } from 'pearpass-lib-ui-react-native-components'
import { useCreateRecord } from 'pearpass-lib-vault'
import Toast from 'react-native-toast-message'

import {
  AcceptedFormats,
  Container,
  Description,
  ImportOptionImage,
  ImportOptionItem,
  ImportOptionsList,
  SubTitle
} from './styles'
import { readFileContent } from './utils/readFileContent'
import { CardSingleSetting } from '../../../components/CardSingleSetting'
import { useAutoLockContext } from '../../../context/AutoLockContext'
import { logger } from '../../../utils/logger'
const importOptions = [
  {
    title: '1Password',
    type: '1password',
    accepts: ['.csv'],
    imgKey: '1password'
  },
  {
    title: 'Bitwarden',
    type: 'bitwarden',
    accepts: ['.json', '.csv'],
    imgKey: 'bitwarden'
  },
  {
    title: 'LastPass',
    type: 'lastpass',
    accepts: ['.csv'],
    imgKey: 'lastpass'
  },
  {
    title: 'NordPass',
    type: 'nordpass',
    accepts: ['.csv'],
    imgKey: 'nordpass'
  },
  {
    title: 'Proton Pass',
    type: 'protonpass',
    accepts: ['.csv', '.json'],
    imgKey: 'protonpass'
  },
  // {
  //   title: 'Encrypted file',
  //   type: 'encrypted',
  //   accepts: ['.json'],
  //   icon: LockIcon
  // },
  {
    title: 'Unencrypted file',
    type: 'unencrypted',
    accepts: ['.json', '.csv'],
    icon: LockIcon
  }
]

const isAllowedType = (fileType, accepts) =>
  accepts.some((accept) => {
    if (accept.startsWith('.')) {
      return fileType === accept.slice(1)
    }
    return fileType === accept
  })

export const TabImport = () => {
  const { t } = useLingui()
  const { setShouldBypassAutoLock } = useAutoLockContext()
  const { createRecord } = useCreateRecord()

  const images = {
    '1password': require('../../../../assets/images/1password.png'),
    bitwarden: require('../../../../assets/images/BitWarden.png'),
    lastpass: require('../../../../assets/images/LastPass.png'),
    protonpass: require('../../../../assets/images/ProtonPass.png'),
    nordpass: require('../../../../assets/images/NordPass.png')
  }

  const handleFileChange = async ({ type, accepts }) => {
    let result = []
    setShouldBypassAutoLock(true)

    const { fileContent, fileType } = await readFileContent(accepts)

    if (!isAllowedType(fileType, accepts)) {
      throw new Error('Invalid file type')
    }

    try {
      switch (type) {
        case '1password':
          result = await parse1PasswordData(fileContent, fileType)
          break
        case 'bitwarden':
          result = await parseBitwardenData(fileContent, fileType)
          break
        case 'lastpass':
          result = await parseLastPassData(fileContent, fileType)
          break
        case 'nordpass':
          result = await parseNordPassData(fileContent, fileType)
          break
        case 'protonpass':
          result = await parseProtonPassData(fileContent, fileType)
          break
        case 'unencrypted':
          result = await parsePearPassData(fileContent, fileType)
          break
        default:
          throw new Error(
            'Unsupported template type. Please select a valid import option.'
          )
      }

      if (result.length === 0) {
        Toast.show({
          type: 'baseToast',
          text1: t`No records found to import!`,
          position: 'bottom',
          bottomOffset: 100
        })
        return
      }

      await Promise.all(result.map((record) => createRecord(record)))
      Toast.show({
        type: 'baseToast',
        text1: t`Vaults imported successfully!`,
        position: 'bottom',
        bottomOffset: 100
      })
    } catch (error) {
      Toast.show({
        type: 'baseToast',
        text1: t`Vaults import failed!`,
        position: 'bottom',
        bottomOffset: 100
      })
      logger.error('Error reading file:', error.message || error)
    } finally {
      setShouldBypassAutoLock(false)
    }
  }

  return (
    <CardSingleSetting title={t`Import`}>
      <Container>
        <Description>
          {t`Import your Vaults from a file or another app. Currently, only CSV files are supported.`}
        </Description>
        <ImportOptionsList>
          {importOptions.map((option) => (
            <ImportOptionItem
              key={option.type}
              onPress={() =>
                handleFileChange({
                  type: option.type,
                  accepts: option.accepts
                })
              }
            >
              {option.imgKey ? (
                <ImportOptionImage source={images[option.imgKey]} />
              ) : (
                <option.icon width={32} height={32} />
              )}
              <SubTitle>{option.title}</SubTitle>
              <AcceptedFormats>{option.accepts.join(', ')}</AcceptedFormats>
            </ImportOptionItem>
          ))}
        </ImportOptionsList>
      </Container>
    </CardSingleSetting>
  )
}
