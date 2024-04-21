import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useParams } from "react-router-dom";
import theme, { Box } from "utils/theme";
import axios from 'axios';

export const AnimeStream = () => {
    const { episodeid } = useParams<{ episodeid: string }>();
    const [animeStreamData, setAnimeStreamData] = useState<string>('');

    useEffect(() => {
        const fetchAnimeStream = async () => {
            try {
                if (episodeid) {
                    const url = `https://consumet-flax.vercel.app/meta/anilist/watch/${encodeURIComponent(episodeid)}`;
                    const response = await axios.get(url);
                    const refererLink = response.data.headers.Referer;
                    setAnimeStreamData(refererLink);
                    console.log('RESPONSE:', refererLink);
                }
            } catch (error) {
                console.error('Error in fetchAnimeStream', error);
            }
        };

        fetchAnimeStream();
    }, [episodeid]);

    useEffect(() => {
        console.log('ANIME REFERER LINK:', animeStreamData);
    }, [animeStreamData]);

    return (
        <Box style={styles.container}>
            <View style={styles.viewContent}>
                {animeStreamData && (
                    <iframe
                        style={styles.stream}
                        src={animeStreamData}
                        frameBorder='0'
                        allowFullScreen
                    />
                )}
            </View>
        </Box>
    );
}

const styles = StyleSheet.create({
    viewContent: {
        height: 720,
        maxHeight: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '100%',
    },
    stream: {
        width: 1280,
        height: 720,
        backgroundColor: theme.colors.grey,
    }
});
