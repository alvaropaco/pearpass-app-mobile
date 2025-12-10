import { CardSingleSetting } from '../../../../components/CardSingleSetting'
import { SelectInput } from '../../../../components/SelectInput'

/**
 * @param {Object} props
 * @param {string} props.language
 * @param {Function} props.setLanguage
 * @param {string} props.title
 * @param {Array} props.languageOptions
 */
export const LanguageSection = ({
  language,
  setLanguage,
  title,
  languageOptions
}) => (
  <CardSingleSetting title={title}>
    <SelectInput
      value={language}
      onChange={setLanguage}
      options={languageOptions}
    />
  </CardSingleSetting>
)
