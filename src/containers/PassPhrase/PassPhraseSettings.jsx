import { useLingui } from '@lingui/react/macro'
import { PASSPHRASE_TYPE_OPTIONS } from 'pearpass-lib-constants'
import { colors } from 'pearpass-lib-ui-theme-provider/native'
import { View, Text, StyleSheet, Platform } from 'react-native'

import { AppSwitch } from '../../components/AppSwitch/AppSwitch'
import { RadioSelect } from '../../components/RadioSelect'

/**
 * @param {{
 *   selectedType: number,
 *   setSelectedType: (value: number) => void,
 *   withRandomWord: boolean,
 *   setWithRandomWord: (value: boolean) => void,
 *   isDisabled: boolean
 * }} props
 */
export const PassPhraseSettings = ({
  selectedType,
  setSelectedType,
  withRandomWord,
  setWithRandomWord,
  isDisabled
}) => {
  const { t } = useLingui()

  const getSwitchStyle = () => {
    if (Platform.OS === 'android') {
      return {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
        width: 32
      }
    }
    if (Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 26) {
      return {
        width: 65,
        padding: 1.5
      }
    }

    return {}
  }
  return (
    <View style={styles.passPraseSettingsContainer}>
      <RadioSelect
        radioTitleStyle={styles.passPraseSettingsTitle}
        radioOptionStyle={styles.passPraseSettingsOption}
        title={t`Type`}
        options={PASSPHRASE_TYPE_OPTIONS.map((option) => ({
          label: t`${option.value} words`,
          value: option.value
        }))}
        selectedOption={selectedType}
        onChange={(value) => {
          setSelectedType(value)
        }}
        isDisabled={isDisabled}
      />

      <View style={styles.passPraseSettingsRandomWordContainer}>
        <Text
          style={styles.passPraseSettingsRandomWordText}
        >{t`+1 random word`}</Text>
        <AppSwitch
          value={withRandomWord}
          onChange={(value) => setWithRandomWord(value)}
          disabled={isDisabled}
          style={getSwitchStyle()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  passPraseSettingsContainer: {
    fontSize: 14,
    backgroundColor: colors.grey350?.mode1,
    borderRadius: 10,
    padding: 10,
    gap: 15
  },
  passPraseSettingsTitle: {
    fontSize: 14,
    fontWeight: 500,
    color: colors.white?.mode1,
    fontFamily: 'Inter'
  },
  passPraseSettingsOption: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.white?.mode1,
    fontFamily: 'Inter'
  },
  passPraseSettingsRandomWordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  passPraseSettingsRandomWordText: {
    fontSize: 14,
    fontWeight: 400,
    color: colors.white?.mode1,
    fontFamily: 'Inter'
  }
})
