import React, { useEffect, useState } from "react";
import theme, { Box, Text } from "utils/theme";
import axios from 'axios';
import { StyleSheet, View, FlatList, Image, Pressable } from "react-native"; // Import FlatList for rendering the grid
import { useNavigate } from "react-router-dom";
import Button from "./Button";


import { styled } from '@mui/material/styles';
import MiuBox from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export const RecentAnimeNew = () => {
    const [recentAnimeList, setRecentAnimeList] = useState<any[]>([]);
    const navigate = useNavigate();

    const [page, setPage] = useState(1);

    const handleNextPage = () => {
        if (page >= 173) {
            setPage(1);
        } else {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };


    const fetchRecentAnime = async () => {
        try {
            const url = `https://consumet-flax.vercel.app/anime/zoro/recent-episodes?page=${page}&perPage=24`;
            const response = await axios.get(url);
            // console.log('recentAnime', response.data);
            console.log(url)
            setRecentAnimeList(response.data.results);
        } catch (error) {
            console.error('error in recentAnime', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchRecentAnime();
    }, [page]);


    const navigateToAnimeInfo = (id: number) => {
        navigate(`/anime/details/${encodeURIComponent(id)}`);
    }



    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const renderAnimeCard = ({ item }: { item: any }) => {
        const truncateTitle = item.title.english.length > 10 ? `${item.title.romaji.slice(0, 20)}...` : item.title.english;
        return truncateTitle;
    }


    return (
        <Box style={styles.container}>
            <Box >
                <Box mb="12">
                    <Text variant="text3Xl" fontWeight="bold" color="white" textAlign="left">Recent Anime</Text>
                    <Box style={{ marginLeft: 1400, flexDirection: "row" }}>
                        <Pressable>
                            <Button label="<" boxStyle={styles.button} onPress={handlePrevPage}></Button>
                        </Pressable>
                        <Pressable>
                            <Button label=">" boxStyle={styles.button} onPress={handleNextPage}></Button>
                        </Pressable>
                    </Box>
                </Box>

                {/* ANILIST */}
                {/* <MiuBox>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {Array.from(recentAnimeList).map((_, index) => {
                            const truncateTitle = recentAnimeList[index].title.english.length > 10 ? `${recentAnimeList[index].title.romaji.slice(0, 20)}...` : recentAnimeList[index].title.english;
                            return (
                                <Grid item xs={2} key={index}>
                                    <Pressable onPress={() => navigateToAnimeInfo(recentAnimeList[index].id)}>
                                        <img src={recentAnimeList[index].image} alt={recentAnimeList[index].title.english} width={200} height={300} />
                                        <Text variant="textLg" fontWeight="bold" color="white">{truncateTitle}</Text>
                                        <div style={{ display: "flex" }}>
                                            <Button label={`Episode ${recentAnimeList[index].episodeNumber}`} boxStyle={styles.animeEp} textStyle={styles.animeEpText}></Button>
                                            <Button label={recentAnimeList[index].type} boxStyle={styles.animeType} textStyle={styles.animeTypeText}></Button>
                                        </div>
                                    </Pressable>
                                </Grid>
                            )
                        })}
                    </Grid>
                </MiuBox> */}



                {/* ZORO */}
                <MiuBox>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {Array.from(recentAnimeList).map((_, index) => {
                            const truncateTitle = recentAnimeList[index].title.length > 10 ? `${recentAnimeList[index].title.slice(0, 20)}...` : recentAnimeList[index].title;
                            return (
                                <Grid item xs={2} key={index}>
                                    <Pressable onPress={() => navigateToAnimeInfo(recentAnimeList[index].id)}>
                                        <img src={recentAnimeList[index].image} alt={recentAnimeList[index].title} width={200} height={300} />
                                        <Text variant="textLg" fontWeight="bold" color="white">{truncateTitle}</Text>
                                        <div style={{ display: "flex" }}>
                                            <Button label={`Episode ${recentAnimeList[index].sub}`} boxStyle={styles.animeEp} textStyle={styles.animeEpText}></Button>
                                            <Button label={recentAnimeList[index].type} boxStyle={styles.animeType} textStyle={styles.animeTypeText}></Button>
                                        </div>
                                    </Pressable>
                                </Grid>
                            )
                        })}
                    </Grid>
                </MiuBox>

            </Box>
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

    animeType: {

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
