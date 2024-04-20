import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-dom';
import theme, { Box, Text } from 'utils/theme';
import { WebView } from 'react-native-webview';

const removeHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>?/gm, ''); // Remove all HTML tags
};


export const AnimeInfo = () => {
    const { id } = useParams<{ id: string }>();
    const animeId = Number(id);

    const [animeInfoData, setAnimeInfoData] = useState<any[]>([]);

    const fetchAnimeInfo = async () => {
        try {
            const url = `https://consumet-flax.vercel.app/meta/anilist/info/${encodeURIComponent(animeId)}`;
            const response = await axios.get(url);

            response.data.description = removeHtmlTags(response.data.description);

            console.log('animeInfo', response.data);
            setAnimeInfoData(response.data);
        } catch (error) {
            console.error('Error in fetchAnimeInfo', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchAnimeInfo();
    }, []); // Run once on component mount

    return (
        <ScrollView>
            <Box style={styles.container}>
                <Box style={styles.info}>
                    <View style={styles.contentContainer}>
                        <Image source={{ uri: animeInfoData.image }} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text variant="text3Xl" color="white" mb="12">
                                {animeInfoData.title?.english}
                            </Text>
                            <Text variant="textLg" color="white">
                                {animeInfoData.description}
                            </Text>
                        </View>
                    </View>

                    <View>
                        <iframe
                            style={{backgroundColor: theme.colors.grey}}
                            src='https://embtaku.pro/embedplus?id=MTM4Mjg5&token=rTNGH4AAfJeoZyIZeSTcdg&expires=1713617680'
                            width="1080"
                            height="720"
                            frameBorder='0'
                            allow='fullscreen'
                        />
                    </View>
                </Box>
            </Box>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },

    contentContainer: {
        flexDirection: 'row', // Arrange children horizontally
        alignItems: 'center', // Center align children vertically
        paddingHorizontal: 20,
        width: 1000,
    },

    info: {
        marginTop: "10%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        marginTop: -100,
        width: 300,
        height: 500,
        borderRadius: 20,
    },

    textContainer: {
        marginLeft: 20,
        flex: 1, // Take remaining space
        flexDirection: 'column', // Arrange children vertically
    },
});
