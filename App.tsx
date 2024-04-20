import { ThemeProvider } from '@shopify/restyle';
import { AnimeInfo } from 'component/AnimeInfo';
import { StyleSheet, View } from 'react-native';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import theme, { Text } from 'utils/theme';
import { Anime } from 'view/anime';
import { Home } from 'view/home';
import { Movie } from 'view/movies';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movies" element={<Movie />} />
          <Route path='/anime/:title/:page' element={<Anime />} />
          <Route path="/anime/details/:id" element={<AnimeInfo/>} />
          <Route path="/anime/watch/:id" element={<AnimeInfo />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
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
