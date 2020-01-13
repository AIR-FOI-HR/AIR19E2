import { createStackNavigator } from 'react-navigation-stack';
import SignIn from '../src/login/signIn';
import SignUp from '../src/login/signUp';

const AuthNavigator = createStackNavigator(
    {
        SignIn: { screen: SignIn },
        SignUp: { screen: SignUp }
    },
    {
        initialRouteName: 'SignIn',
        headerMode: 'none'
    }
);

export default AuthNavigator;
