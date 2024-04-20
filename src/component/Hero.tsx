import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import theme, { Box, Text } from 'utils/theme';
import Button from 'component/shared/Button';
import { Image, StyleSheet } from 'react-native';
import Input from 'component/shared/Input';

interface FormData {
    title: string,
    page: string,
}


export const Hero = () => {

    
    const { control, handleSubmit } = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = (data: FormData) => {
        const { title, page } = data;
        navigate(`/anime/${encodeURIComponent(title)}/${encodeURIComponent(page)}`);
    };


    return (
        <Box style={styles.hero}>
            <Image source={require('../public/prototype-img/ganyu.jpg')} style={styles.image} />
            <Text variant="text3Xl" color="white" mt="10" mb="12">
                Welcome To The Veteran Weeb
            </Text>
            <Box style={styles.search}>
                <Controller
                    control={control}
                    name="title"
                    defaultValue=""
                    render={({ field }) => (
                        <Input
                            label="Search"
                            placeholder="Search Anime"
                            style={styles.input}
                            {...field}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="page"
                    defaultValue="1"
                    render={({ field }) => (
                        <Input
                            hidden={true}
                            label="Search"
                            placeholder="Search Anime"
                            style={styles.input}
                            {...field}
                        />
                    )}
                />

                <Button
                    label="Search"
                    boxStyle={styles.button}
                    onPress={handleSubmit(onSubmit)}
                />
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

    hero: {
        marginTop: "10%",
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