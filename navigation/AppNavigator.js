import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../src/home/home';
import SignIn from '../src/login/signIn';
import SignUp from '../src/login/signUp';

const MainNav = createStackNavigator({
    SignUp: {screen: SignUp},
    SignIn: {screen: SignIn},
    Home: {screen: Home},
}, {headerMode: 'none'});

const App = createAppContainer(MainNav);

export default App;  
