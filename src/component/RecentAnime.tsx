import React, { useEffect, useState } from "react";
import theme, { Box, Text } from "utils/theme";
import axios from 'axios';
import { StyleSheet, View, FlatList, Image, Pressable } from "react-native"; // Import FlatList for rendering the grid
import Button from "./shared/Button";
import { useNavigate } from "react-router-dom";

export const RecentAnime = () => {
    const [recentAnimeList, setRecentAnimeList] = useState<any[]>([]);
    const navigate = useNavigate();

    const fetchRecentAnime = async () => {
        try {
            const url = `https://consumet-flax.vercel.app/meta/anilist/recent-episodes?perPage=24`;
            const response = await axios.get(url);
            console.log('recentAnime', response.data);
            setRecentAnimeList(response.data.results);
        } catch (error) {
            console.error('error in recentAnime', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchRecentAnime();
    }, []);


    const navigateToAnimeInfo = (id: number) => {
        navigate(`/anime/details/${encodeURIComponent(id)}`);
    }

    const renderAnimeCard = ({ item }: { item: any }) => {
        const truncateTitle = 
            item.title.english.length > 10 ? `${item.title.romaji.slice(0, 20)}...` : item.title.english;


        return (
            <Pressable onPress={() => navigateToAnimeInfo(item.id)}>
                <View style={styles.card}>
                    <Image source={item.image} style={{ width: 200, height: 300 }} />
                    <Text variant="textXl" color="white">{truncateTitle}</Text>
                    <div style={{ display: "flex" }}>
                        <Button label={`Episode ${item.episodeNumber}`} boxStyle={styles.animeEp} textStyle={styles.animeEpText}></Button>
                        <Button label={item.type} boxStyle={styles.animeType} textStyle={styles.animeTypeText}></Button>
                    </div>
                </View>
            </Pressable>
        );
    };

    return (
        <Box style={styles.container}>
            <div >
                <Text variant="text3Xl" fontWeight="bold" color="white" textAlign="left">Recent Anime</Text>
                <div style={{ marginLeft: 1400, display: "flex" }}> 
                    <Button label="<" boxStyle={styles.button}></Button>
                    <Button label=">" boxStyle={styles.button}></Button>
                </div>
            </div>
            <FlatList
                data={recentAnimeList}
                renderItem={renderAnimeCard}
                keyExtractor={(item) => item.id.toString()}
                numColumns={6} // Display two cards per row
                columnWrapperStyle={styles.columnWrapper}
            />
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 150,
        marginRight: 150,
        flex: 1,
        padding: 20,
    },
    card: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: "#black",
        padding: 10,
        margin: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginBottom: 5,
    },
    columnWrapper: {
        justifyContent: "space-between",
    },

    button: {
        marginTop: -50,
        marginLeft: 10,
        width: 50,
        backgroundColor: "none",
        borderColor: theme.colors.green500,
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
    },

    animeEp: {
        width: 80,
        height: 25,
        backgroundColor: "none",
        borderColor: theme.colors.green400,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 4,
        marginRight: 80
    },

    animeEpText: {
        marginTop: -10,
        fontSize: 12
    },

    animeType:{
        
        width: 40,
        height: 25,
        backgroundColor: "none",
        borderColor: theme.colors.amber400,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 4,
    },

    animeTypeText: {
        marginTop: -10,
        fontSize: 10
    }
});
