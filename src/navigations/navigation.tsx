import { createStackNavigator } from '@react-navigation/stack';
import { Home } from 'view/home';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
    )
}