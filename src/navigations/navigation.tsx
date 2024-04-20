import { createStackNavigator } from '@react-navigation/stack';
import { Home } from 'view/home';
import { Movie } from 'view/movies';

const Stack = createStackNavigator();

export const Navigation = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
            <Stack.Screen name='Movie' component={Movie} />
        </Stack.Navigator>
    )
}