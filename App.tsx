import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@shopify/restyle';
import { StyleSheet, View } from 'react-native';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import theme, { Text } from 'utils/theme';
import { Home } from 'view/home';
import { Movie } from 'view/movies';

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/movies" element={<Movie />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
