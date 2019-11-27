import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';


import Home from '../src/home/home';
import SignIn from '../src/login/signIn';
import SignUp from '../src/login/signUp';
import { BottomNavigator } from './BottomNavigator';
import Profil from '../src/login/profil';

export const BottomTabNavigator = createBottomTabNavigator({
  Profil: Profil,
  Home: Home,
  NewEvent: Profil
}, {
  initialRouteName: 'Home',
  tabBarComponent: BottomNavigator,
})

const MainNav = createStackNavigator({
//     SignUp: {screen: SignUp},
//     SignIn: {screen: SignIn},
//     Home: {screen: Home},
// }, {headerMode: 'none'});
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  ['Home']: BottomTabNavigator,
}, { headerMode: 'none' });

const App = createAppContainer(MainNav);

export default App;
