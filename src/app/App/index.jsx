import Toast from 'react-native-toast-message'

import { Navigation } from '../Navigation'
import { useAutoLock } from './hooks/useAutoLock'
import { useRedirect } from './hooks/useRedirect'
import { ToastCard } from '../../components/ToastCard'
import { useFirstLaunchCleanUp } from '../../hooks/useFirstLaunchCleanUp'

export const App = () => {
  useAutoLock()
  useFirstLaunchCleanUp()

  const { initialRouteName, isLoading } = useRedirect()

  if (isLoading) {
    return null
  }

  return (
    <>
      <Navigation initialRouteName={initialRouteName} />

      <Toast
        config={{
          baseToast: ({ text1, renderLeadingIcon }) => (
            <ToastCard text1={text1} renderLeadingIcon={renderLeadingIcon} />
          )
        }}
      />
    </>
  )
}
