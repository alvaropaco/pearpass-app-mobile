import {
  ButtonRadioContainer,
  ButtonRadioInner,
  RadioOption,
  RadioOptionText,
  RadioSelectWrapper,
  RadioTitle
} from './styles'

/**
 * @param {{
 *  title?: string,
 *  options: { label: string, value: string }[],
 *  selectedOption: string,
 *  onChange: (value: string) => void,
 *  radioTitleStyle?: object,
 *  radioOptionStyle?: object,
 *  isDisabled?: boolean
 * }} props
 */
export const RadioSelect = ({
  title,
  options,
  selectedOption,
  onChange,
  radioTitleStyle,
  radioOptionStyle,
  isDisabled = false
}) => {
  const handleChange = (value) => {
    onChange?.(value)
  }

  return (
    <RadioSelectWrapper>
      {title && <RadioTitle style={radioTitleStyle}>{title}</RadioTitle>}
      {options.map((option) => (
        <RadioOption
          key={option.value}
          onPress={() => handleChange(option.value)}
          disabled={isDisabled}
        >
          <ButtonRadioContainer isActive={selectedOption === option.value}>
            <ButtonRadioInner isActive={selectedOption === option.value} />
          </ButtonRadioContainer>
          <RadioOptionText style={radioOptionStyle}>
            {option.label}
          </RadioOptionText>
        </RadioOption>
      ))}
    </RadioSelectWrapper>
  )
}
