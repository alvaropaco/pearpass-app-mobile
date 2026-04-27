import { rawTokens, useTheme } from '@tetherto/pearpass-lib-ui-kit'
import {
  DoneAll,
  GppMaybe,
  VerifiedUser
} from '@tetherto/pearpass-lib-ui-kit/icons'
import { StyleSheet, Text, View } from 'react-native'

const variantIconMap = {
  vulnerable: GppMaybe,
  decent: GppMaybe,
  strong: VerifiedUser,
  match: DoneAll
}

const variantLabelMap = {
  vulnerable: 'Vulnerable',
  decent: 'Decent',
  strong: 'Strong',
  match: 'Match'
}

const getVariantColor = (variant, colors) => {
  switch (variant) {
    case 'vulnerable':
      return colors.colorSurfaceDestructiveElevated
    case 'decent':
      return colors.colorSurfaceWarning
    case 'strong':
    case 'match':
      return colors.colorPrimary
    default:
      return undefined
  }
}

export const PasswordStrengthIndicator = ({ variant, fieldKey }) => {
  const { theme } = useTheme()

  if (!variant) {
    return null
  }

  const Icon = variantIconMap[variant]
  const color = getVariantColor(variant, theme.colors)
  const label = variantLabelMap[variant]
  const baseTestID = `${fieldKey}_${variant}_indicator`

  return (
    <>
      <View style={styles.container} testID={baseTestID}>
        <View style={styles.iconContainer} testID={`${baseTestID}_icon`}>
          <Icon width={12} height={12} color={color} />
        </View>
        <Text style={[styles.label, { color }]}>{label}</Text>
      </View>
      <View
        style={[
          styles.divider,
          { backgroundColor: theme.colors.colorBorderSecondary }
        ]}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rawTokens.spacing4
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: rawTokens.spacing12,
    height: rawTokens.spacing12,
    flexShrink: 0
  },
  label: {
    fontSize: 12,
    lineHeight: rawTokens.spacing16
  },
  divider: {
    width: 1,
    height: rawTokens.spacing12,
    marginHorizontal: rawTokens.spacing8
  }
})
