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
 *    specialCharacters: boolean,
 *    characters: number
 *  }
 *  onRuleChange: (
 *    optionName: string,
 *    rules: {
 *      specialCharacters: true,
 *      characters: number
 *   }) => void
 * }} props
 */
export const PasswordGenerator = ({ onRuleChange, rules }) => {
  const { t } = useLingui()

  const ruleOptions = [
    { name: 'specialCharacters', label: t`Special character` + ' (!&*)' }
  ]

  const handleRuleChange = (newRules) => {
    onRuleChange('password', { ...rules, ...newRules })
  }

  const handleSliderValueChange = (value) => {
    onRuleChange('password', { ...rules, characters: value })
  }

  const { characters, ...selectableRules } = rules

  return (
    <>
      <SliderWrapper>
        <View>
          <SliderText>
            {characters} {t`characters`}
          </SliderText>
        </View>

        <View>
          <Slider
            style={{ width: 240, height: 50 }}
            minimumValue={4}
            maximumValue={32}
            step={1}
            value={characters}
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
