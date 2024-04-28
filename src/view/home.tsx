import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import theme, { Box, Text } from 'utils/theme';
import Button from 'component/shared/Button';
import { Image, ScrollView, StyleSheet } from 'react-native';
import Input from 'component/shared/Input';
import { RecentAnime } from 'component/RecentAnime';
import { Hero } from 'component/Hero';
import { RecentAnimeNew } from 'component/Recent-Anime';



export const Home = () => {
  



  return (
    <Box style={styles.container}>
      <ScrollView>
        <Hero />
        <RecentAnimeNew />
      </ScrollView>
    </Box>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: 'center',
    justifyContent: 'center',
  },

  hero: {
    width: 1000,
    marginTop: "30%",
    alignItems: 'center',
    justifyContent: 'center',
  },

  search: {
    flexDirection: "row",
  },

  input: {
    color: "white",
    width: 600,
  },

  image: {
    marginTop: -100,
    width: 300,
    height: 300,
    borderRadius: 20,
  },

  button: {
    marginTop: 30,
    marginLeft: 10,
    width: 100,
    backgroundColor: "none",
    borderColor: theme.colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
  }
});