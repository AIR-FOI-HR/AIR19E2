import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../src/home/home';
import SignIn from '../src/login/signIn';
import SignUp from '../src/login/signUp';
import Create from '../src/meal/create';

const MainNav = createStackNavigator({
    SignIn: {screen: SignIn},
    SignUp: {screen: SignUp},
    Home: {screen: Home},
    Create: {screen: Create},
}, {headerMode: 'none'});

const App = createAppContainer(MainNav);

export default App;
