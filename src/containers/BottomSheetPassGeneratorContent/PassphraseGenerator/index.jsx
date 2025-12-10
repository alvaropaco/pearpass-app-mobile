import { useMemo } from 'react'

import { useLingui } from '@lingui/react/macro'
import Slider from '@react-native-community/slider'
import { colors } from 'pearpass-lib-ui-theme-provider/native'
import { View } from 'react-native'

import { RuleSelector } from '../RuleSelector'
import {
  DividerLine,
  SliderText,
  SliderWrapper,
  SwitchWrapper
} from '../styles'

/**
 * @param {{
 *  rules: {
 *   capitalLetters: boolean,
 *   symbols: boolean,
 *   numbers: boolean,
 *   words: number
 *  }
 *  onRuleChange: (
 *    optionName: string,
 *    rules: {
 *      capitalLetters: boolean,
 *      symbols: boolean,
 *      numbers: boolean,
 *      words: number
 *   }) => void
 * }} props
 */
export const PassphraseGenerator = ({ onRuleChange, rules }) => {
  const { t } = useLingui()

  const ruleOptions = useMemo(
    () => [
      { name: 'all', label: t`Select All` },
      { name: 'capitalLetters', label: t`Capital Letters` },
      { name: 'symbols', label: t`Symbols` },
      { name: 'numbers', label: t`Numbers` }
    ],
    []
  )

  const handleRuleChange = (newRules) => {
    onRuleChange('passphrase', { ...rules, ...newRules })
  }

  const handleSliderValueChange = (value) => {
    onRuleChange('passphrase', { ...rules, words: value })
  }

  const { words, ...selectableRules } = rules

  return (
    <>
      <SliderWrapper>
        <View>
          <SliderText>
            {words} {t`words`}
          </SliderText>
        </View>

        <View>
          <Slider
            style={{ width: 240, height: 50 }}
            minimumValue={6}
            maximumValue={36}
            value={words}
            step={1}
            minimumTrackTintColor={colors.primary300.mode1}
            maximumTrackTintColor={colors.grey200.mode1}
            thumbTintColor={colors.primary400.mode1}
            onResponderGrant={() => true}
            onValueChange={handleSliderValueChange}
          />
        </View>
      </SliderWrapper>
      <DividerLine />

      <SwitchWrapper>
        <RuleSelector
          rules={ruleOptions}
          selectedRules={selectableRules}
          setRules={handleRuleChange}
        />
      </SwitchWrapper>
    </>
  )
}
