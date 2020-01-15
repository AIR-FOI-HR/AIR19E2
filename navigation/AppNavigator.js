import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from '../src/home/home';
import SignIn from '../src/login/signIn';
import SignUp from '../src/login/signUp';
import Create from '../src/meal/create';
import MealEvent from '../src/meal/mealEvent';
import { BottomNavigator } from './BottomNavigator';
import Profil from '../src/login/profil';

export const BottomTabNavigator = createBottomTabNavigator({
  Profil: Profil,
  Home: Home,
  NewEvent: Create
}, {
  initialRouteName: 'Home',
  tabBarComponent: BottomNavigator,
})

const MainNav = createStackNavigator({
//     SignUp: {screen: SignUp},
//     SignIn: {screen: SignIn},
//     Home: {screen: Home},
// }, {headerMode: 'none'});
Create: {screen: Create},
SignIn: { screen: SignIn },
['Home']: BottomTabNavigator,
MealEvent: {screen: MealEvent},
SignUp: { screen: SignUp },
}, { headerMode: 'none' });

const App = createAppContainer(MainNav);

export default App;
