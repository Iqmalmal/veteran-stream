import Button from "component/shared/Button";
import Input from "component/shared/Input";
import { Image, StyleSheet } from "react-native";
import theme, { Box, Text } from "utils/theme"



export const Home = () => {



    return(
        <Box style={styles.container}>
            <Image source={require('../public/prototype-img/ganyu.jpg')} style={styles.image}/>
            <Text variant="text3Xl" color="white" mt="10" mb="12">Welcome To The Veteran Weeb</Text>
            <Box style={styles.search}>
                <Box >
                    <Input label="Search" placeholder="Search Anime" style={styles.input}></Input>
                </Box>
                <Box>
                    <Button label="Search" boxStyle={styles.button} />
                </Box>
            </Box>
        </Box>
    )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
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

  image:{
    marginTop: -100,
    width: 300,
    height: 300,
    borderRadius: 20,
  },

  button:{
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