import { useLingui } from '@lingui/react/macro'
import { useNavigation } from '@react-navigation/native'
import { colors } from 'pearpass-lib-ui-theme-provider/native'
import { useVault, useVaults } from 'pearpass-lib-vault'
import { View, ScrollView, Text, StyleSheet } from 'react-native'

import { ListItem } from '../../components/ListItem'
import { ButtonPrimary, ButtonSecondary } from '../../libComponents'
import { LogoTextWithLock } from '../../svgs/LogoTextWithLock'

export const SelectVaultType = () => {
  const navigation = useNavigation()
  const { t } = useLingui()

  const { data: vaultsData } = useVaults()
  const { isVaultProtected, refetch: refetchVault } = useVault()

  const handleCreateVault = () => {
    navigation.navigate('Welcome', { state: 'credentials' })
  }

  const handleVaultSelect = async (vaultId) => {
    const isProtected = await isVaultProtected(vaultId)
    if (isProtected) {
      navigation.navigate('Welcome', { state: 'unlock', vaultId })
      return
    }
    await refetchVault(vaultId)
    navigation.replace('MainTabNavigator')
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <LogoTextWithLock width={170} height={50} />
      </View>

      <View style={styles.topSection}>
        {!vaultsData?.length ? (
          <View style={styles.textWrapper}>
            <Text style={styles.headerText}>{t`Enter Master Password`}</Text>
            <Text style={styles.subHeaderText}>
              {t`Now create a secure vault or load an existing one to get started.`}
            </Text>
          </View>
        ) : (
          <View style={styles.vaultsSection}>
            <Text style={styles.headerText}>
              {t`Select a vault, create a new one or load another one`}
            </Text>

            <ScrollView
              style={styles.vaultsList}
              showsVerticalScrollIndicator={false}
            >
              {vaultsData?.map((vault, index) => (
                <View key={vault.id} style={styles.vaultItemWrapper}>
                  <ListItem
                    testID={`vault-${index}`}
                    onPress={() => handleVaultSelect(vault.id)}
                    name={vault.name ?? vault.id}
                    date={vault.createdAt}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <View style={styles.bottomSection}>
        <ButtonPrimary stretch onPress={handleCreateVault}>
          {t`Create a new vault`}
        </ButtonPrimary>

        <ButtonSecondary
          stretch
          onPress={() => navigation.navigate('Welcome', { state: 'load' })}
        >
          {t`Load a vault`}
        </ButtonSecondary>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', gap: 15 },
  logoContainer: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000
  },
  topSection: {
    paddingHorizontal: 20,
    paddingTop: 140,
    gap: 10,
    justifyContent: 'center'
  },
  textWrapper: { gap: 5 },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white.mode1,
    textAlign: 'center',
    marginBottom: 5
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.white.mode1,
    textAlign: 'center'
  },
  vaultsSection: { width: '100%', height: 300 },
  vaultsList: { flex: 1, width: '100%', paddingTop: 15 },
  vaultItemWrapper: { marginBottom: 25 },
  bottomSection: { paddingHorizontal: 20, gap: 10 }
})
