import { useMemo } from 'react'

import { View, Platform } from 'react-native'

import {
  LabelContainers,
  SwitchDescription,
  SwitchText,
  Wrapper
} from './styles'
import { AppSwitch } from '../../../components/AppSwitch/AppSwitch'

/**
 * @param {{
 *  rules: {
 *    name: string,
 *    label: string,
 *    description: string,
 *    disabled: boolean
 *  }
 *  selectedRules: {[key: string]: any}
 *  setRules: ({[key: string]: any}) => void
 *  switchFirst?: boolean
 * }} props
 */
export const RuleSelector = ({
  rules,
  selectedRules,
  setRules,
  switchFirst = false
}) => {
  const isAllRuleSelected = useMemo(
    () => Object.values(selectedRules).every((value) => value === true),
    [selectedRules]
  )

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

  const handleSwitchToggle = (ruleName) => {
    const updatedRules = { ...selectedRules }

    if (ruleName === 'all') {
      Object.keys(updatedRules).forEach((rule) => {
        updatedRules[rule] = !isAllRuleSelected
      })
    } else {
      updatedRules[ruleName] = !updatedRules[ruleName]
    }

    setRules(updatedRules)
  }

  return (
    <>
      {rules.map((rule) => (
        <Wrapper switchFirst={switchFirst} key={rule.label}>
          <LabelContainers>
            <SwitchText>{rule.label}</SwitchText>
            {rule.description && (
              <SwitchDescription>{rule.description}</SwitchDescription>
            )}
          </LabelContainers>
          <View>
            <AppSwitch
              style={getSwitchStyle()}
              disabled={rule.disabled}
              value={selectedRules[rule.name] || isAllRuleSelected}
              onChange={() => handleSwitchToggle(rule.name)}
            />
          </View>
        </Wrapper>
      ))}
    </>
  )
}
