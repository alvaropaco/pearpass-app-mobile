import { colors } from 'pearpass-lib-ui-theme-provider/native'
import { Switch } from 'react-native'
/**
 * @param {{
 *   ios_backgroundColor?: string,
 *   trackColorTrue?: string,
 *   trackColorFalse?: string,
 *   thumbColor?: string,
 *   disabled?: boolean,
 *   onChange?: (value: boolean) => void,
 *   style?: Object,
 *   value?: boolean
 * }} props
 * @returns {JSX.Element}
 */

export const AppSwitch = ({
  ios_backgroundColor = colors.grey300.mode1,
  trackColorTrue = colors.primary300.mode1,
  trackColorFalse = colors.grey300.mode1,
  thumbColor = colors.primary400.mode1,
  disabled,
  onChange,
  style,
  value
}) => (
  <Switch
    trackColor={{
      false: trackColorFalse,
      true: trackColorTrue
    }}
    style={style}
    thumbColor={thumbColor}
    ios_backgroundColor={ios_backgroundColor}
    disabled={disabled}
    value={value}
    onValueChange={onChange}
  />
)
