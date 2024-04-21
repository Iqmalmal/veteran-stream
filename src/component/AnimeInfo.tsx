import axios from 'axios';
import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigate, useParams } from 'react-router-dom';
import theme, { Box, Text } from 'utils/theme';


const removeHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>?/gm, ''); // Remove all HTML tags
};


export const AnimeInfo = () => {
    const { id } = useParams<{ id: string }>();
    const animeId = Number(id);

    const [animeInfoData, setAnimeInfoData] = useState<any[]>([]);

    const navigate = useNavigate();

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


    const navigateToAnimeWatch = (episodeid: string) => {
        navigate(`/anime/stream/${encodeURIComponent(episodeid)}`);
    }


    const renderEpisodeCard = ({ item }: { item: any }) => {
        return (
            <Pressable onPress={() => navigateToAnimeWatch(item.id)}>
                <View style={styles.card}>
                    <View style={styles.epImageContainer}>
                        <Image source={item.image} style={styles.epImage} />
                        <View style={styles.epOverlay}>
                            <Text style={styles.epText}>{item.title}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        );
    }


    return (<ScrollView contentContainerStyle={styles.scrollViewContent}>
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
                    </Box>
                    <FlatList
                        data={animeInfoData.episodes}
                        renderItem={renderEpisodeCard}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={4}
                        columnWrapperStyle={styles.columnWrapper}
                    />

                
            </Box>
       </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent:{
        flexGrow: 1,
    },

    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '100%',
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
        marginBottom: 20,
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

    columnWrapper: {
        justifyContent: "space-between",
    },

    card: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: "#black",
        padding: 10,
        margin: 10,
    },

    epImageContainer: {
        width: 200,
        height: 150,
        borderRadius: 10,
        position: 'relative', // Ensure positioning context
        overflow: 'hidden', // Clip content outside container
    },

    epImage: {
        width: '100%',
        height: '100%',
        opacity: 0.5, // Semi-transparent image
    },

    epOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent white
        justifyContent: 'center',
        alignItems: 'center',
    },

    epText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
