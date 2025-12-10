import { useState } from 'react'

import { useLingui } from '@lingui/react/macro'
import { useNavigation } from '@react-navigation/native'

import { OnboardingContainer } from '../../containers/OnboardingContainer'
import { useBackHandler } from '../../hooks/useBackHandler'

export const Intro = () => {
  useBackHandler({
    shouldNotGoBack: true
  })

  const { t } = useLingui()
  const [currentStep, setCurrentStep] = useState(0)
  const navigation = useNavigation()

  const handleGetStarted = async () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
      return
    }

    navigation.replace('Welcome')
  }

  const handleSkip = async () => {
    setCurrentStep(5)
  }

  const handleStepSelect = (step) => {
    setCurrentStep(step)
  }

  const onTimerExpired = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const getMainDescription = () => {
    switch (currentStep) {
      case 0:
        return t`Fully local, Open-source, Password manager.`
      case 1:
        return t`Your passwords. Your rules.`
      case 2:
        return t`You hold the keys`
      case 3:
        return t`Store more than passwords`
      case 4:
        return t`All in one encrypted place.`
      case 5:
        return t`Sync, without the Cloud`
      default:
        return ''
    }
  }

  return (
    <OnboardingContainer
      currentStep={currentStep}
      mainDescription={getMainDescription()}
      onContinue={handleGetStarted}
      onSkip={handleSkip}
      onStepSelect={handleStepSelect}
      onTimerExpired={onTimerExpired}
    />
  )
}
