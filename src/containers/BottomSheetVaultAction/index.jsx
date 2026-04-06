import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useLingui } from '@lingui/react/macro'
import { PROTECTED_VAULT_ENABLED } from '@tetherto/pearpass-lib-constants'
import {
  ListItem,
  Text,
  rawTokens,
  useTheme
} from '@tetherto/pearpass-lib-ui-kit'
import {
  KeyboardArrowRightOutlined,
  LockOutlined,
  Share,
  Swap,
  TrashOutlined,
  VerifiedUser
} from '@tetherto/pearpass-lib-ui-kit/icons'
import { colors } from '@tetherto/pearpass-lib-ui-theme-provider'
import { StyleSheet, View } from 'react-native'

import { useBottomSheet } from '../../context/BottomSheetContext'
import { useHapticFeedback } from '../../hooks/useHapticFeedback'

/**
 *
 * @param {Object} props - Component props
 * @param {string} props.vaultId - The unique identifier of the vault
 * @param {string} props.vaultName - The current name of the vault
 * @returns {JSX.Element} Bottom sheet with vault modification options
 *
 */
export const BottomSheetVaultAction = ({
  vaultName,
  onRename,
  onPassword,
  onMembers,
  onShare,
  onDelete
}) => {
  const { t } = useLingui()
  const { theme } = useTheme()
  const { collapse } = useBottomSheet()
  const { hapticButtonPrimary } = useHapticFeedback()

  const handleAction = () => {
    hapticButtonPrimary()
    collapse()
  }

  const handleName = () => {
    handleAction()
    onRename?.()
  }

  const handlePassword = () => {
    handleAction()
    onPassword?.()
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>{t`Vault actions`}</Text>
        <Text style={styles.title}>{vaultName}</Text>
        <Text style={styles.subtitle}>
          {t`Jump straight to the action you need without leaving the settings hub.`}
        </Text>
      </View>

      <BottomSheetScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.buttonsContainer}>
          <ListItem
            title={t`Rename Vault`}
            subtitle={t`Update the identity shown across devices.`}
            icon={<Swap color={theme.colors.colorTextPrimary} />}
            rightElement={
              <KeyboardArrowRightOutlined
                color={theme.colors.colorTextSecondary}
              />
            }
            platform="mobile"
            showDivider={false}
            onClick={handleName}
          />
          {PROTECTED_VAULT_ENABLED && (
            <ListItem
              title={t`Set Vault Password`}
              subtitle={t`Add or rotate the extra encryption layer.`}
              icon={<LockOutlined color={theme.colors.colorTextPrimary} />}
              rightElement={
                <KeyboardArrowRightOutlined
                  color={theme.colors.colorTextSecondary}
                />
              }
              platform="mobile"
              showDivider={false}
              onClick={handlePassword}
            />
          )}
          <ListItem
            title={t`Manage Access`}
            subtitle={t`Review owner access and linked devices.`}
            icon={<VerifiedUser color={theme.colors.colorTextPrimary} />}
            rightElement={
              <KeyboardArrowRightOutlined
                color={theme.colors.colorTextSecondary}
              />
            }
            platform="mobile"
            showDivider={false}
            onClick={() => {
              handleAction()
              onMembers?.()
            }}
          />
          <ListItem
            title={t`Share Personal Vault`}
            subtitle={t`Open the QR code flow for pairing a trusted device.`}
            icon={<Share color={theme.colors.colorTextPrimary} />}
            rightElement={
              <KeyboardArrowRightOutlined
                color={theme.colors.colorTextSecondary}
              />
            }
            platform="mobile"
            showDivider={false}
            onClick={() => {
              handleAction()
              onShare?.()
            }}
          />
          <ListItem
            title={t`Delete Vault`}
            subtitle={t`Requires master password confirmation before removal.`}
            icon={<TrashOutlined color="#FCA5A5" />}
            rightElement={
              <KeyboardArrowRightOutlined color="rgba(252,165,165,0.82)" />
            }
            variant="destructive"
            platform="mobile"
            showDivider={false}
            onClick={() => {
              handleAction()
              onDelete?.()
            }}
          />
        </View>
      </BottomSheetScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    gap: 6
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary400.mode1,
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white.mode1,
    textAlign: 'left'
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.68)',
    lineHeight: 20
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20
  },
  scrollContent: {
    paddingBottom: 40
  },
  buttonsContainer: {
    marginTop: 8,
    gap: rawTokens.spacing12
  }
})
