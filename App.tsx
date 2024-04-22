import { ThemeProvider } from '@shopify/restyle';
import { AnimeInfo } from 'component/AnimeInfo';
import { AnimeStream } from 'component/AnimeStream';
import { StyleSheet, View } from 'react-native';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import theme, { Text } from 'utils/theme';
import { Anime } from 'view/anime';
import { Home } from 'view/home';
import { Movie } from 'view/movies';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AnimeNew } from 'component/AnimeNew';


export default function App() {
  // const productionUrl: `https://veteran-stream.vercel.app/`


  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movies" element={<Movie />} />
          <Route path='/anime/:title/:page' element={<Anime />} />
          <Route path="/anime/details/:id" element={<AnimeInfo/>} />
          <Route path="/anime/stream/:episodeid" element={<AnimeStream />} />

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
