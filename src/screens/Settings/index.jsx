import { useState } from 'react'

import { useLingui } from '@lingui/react/macro'
import { PRIVACY_POLICY, TERMS_OF_USE } from 'pearpass-lib-constants'
import { colors } from 'pearpass-lib-ui-theme-provider'
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import {
  Container,
  ContentContainer,
  Header,
  ScreenTitle,
  TabPanelContainer,
  Tabs,
  TabTitle
} from './styles'
import { TabExport } from './TabExport'
import { TabGeneralSettings } from './TabGeneralSettings'
import { TabImport } from './TabImport'
import { TabPrivacy } from './TabPrivacy'
import { TabVaultsSettings } from './TabVaultsSettings'

export const Settings = () => {
  const { t } = useLingui()

  const [activeTab, setActiveTab] = useState('general')

  const handleActiveTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <Container>
      <Header>
        <ScreenTitle>{t`Settings`}</ScreenTitle>
      </Header>
      <ContentContainer>
        <Tabs>
          <TouchableOpacity onPress={() => handleActiveTabChange('general')}>
            <TabTitle isActive={activeTab === 'general'}>{t`General`}</TabTitle>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleActiveTabChange('vaults')}>
            <TabTitle isActive={activeTab === 'vaults'}>{t`Vaults`}</TabTitle>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleActiveTabChange('export')}>
            <TabTitle isActive={activeTab === 'export'}>{t`Export`}</TabTitle>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleActiveTabChange('import')}>
            <TabTitle isActive={activeTab === 'import'}>{t`Import`}</TabTitle>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleActiveTabChange('privacy')}>
            <TabTitle
              isActive={activeTab === 'privacy'}
            >{t`Advanced`}</TabTitle>
          </TouchableOpacity>
        </Tabs>
        <TabPanelContainer>
          {activeTab === 'general' ? (
            <TabGeneralSettings />
          ) : activeTab === 'vaults' ? (
            <TabVaultsSettings />
          ) : activeTab === 'export' ? (
            <TabExport />
          ) : activeTab === 'import' ? (
            <TabImport />
          ) : (
            <TabPrivacy />
          )}
        </TabPanelContainer>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => Linking.openURL(TERMS_OF_USE)}>
            <Text as="Text" isActive={false} style={styles.textUnderline}>
              {t`Terms of Use`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(PRIVACY_POLICY)}>
            <Text as="Text" isActive={false} style={styles.textUnderline}>
              {t`Privacy Statement`}
            </Text>
          </TouchableOpacity>
        </View>
      </ContentContainer>
    </Container>
  )
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    paddingBottom: 10,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 20
  },
  textUnderline: {
    textDecorationLine: 'underline',
    color: colors.primary200.mode1
  }
})
