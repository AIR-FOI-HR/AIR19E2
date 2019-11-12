import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../src/home/home';

const MainNav = createStackNavigator({
    Home: {screen: Home},
}, {headerMode: 'none'});

const App = createAppContainer(MainNav);

export default App;  
