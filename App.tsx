import { ThemeProvider } from '@shopify/restyle';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import theme, { Text } from 'utils/theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'pages/home';
import Movie from 'pages/movie';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        {/* <Text>Open up App.tsx to start working on your app! sdasd</Text>
        <Text>This is the app for veteran weeb anime streaming website! Click the link below!</Text>
        <Text> Home </Text>
        <Text> Movie </Text> */}

        <BrowserRouter>
          <Routes>
            <Route index element={<Home  />} />
            <Route path='/home' element={<Home />} />
            <Route path='/movies' element={<Movie />} />


          </Routes>
        </BrowserRouter>

        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
