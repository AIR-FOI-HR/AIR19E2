import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from '../src/home/home';
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

const AppNavigator = createStackNavigator(
  {
    ['Home']: BottomTabNavigator,
    MealEvent: {screen: MealEvent},
    Create: {screen: Create},
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);

export default AppNavigator;
