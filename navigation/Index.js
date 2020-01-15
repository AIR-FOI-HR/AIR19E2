//index.js
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import AuthNavigator from './AuthNavigator'
import AppNavigator from './AppNavigator'

const SwitchNavigator = createSwitchNavigator(
    {
        Auth: AuthNavigator,
        App: AppNavigator
    },
    {
        initialRouteName: 'Auth'
    }
);

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer