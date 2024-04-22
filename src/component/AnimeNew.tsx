import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useNavigate, useParams } from "react-router-dom";
import theme, { Box, Text } from "utils/theme";
import axios from 'axios';

import { styled } from '@mui/material/styles';
import MiuBox from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from 'component/shared/Button';

export const AnimeNew = () => {
    const { title } = useParams<{ title: string }>();
    const [animeList, setAnimeList] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                if (title) {
                    const url = `https://consumet-flax.vercel.app/meta/anilist/${encodeURIComponent(title)}`;
                    const response = await axios.get(url);
                    const results = response.data.results;
                    setAnimeList(results);
                    console.log('RESPONSE:', results);
                }
            } catch (error) {
                console.error('Error in fetchAnimeList', error);
            }
        };

        fetchAnime();
    }, [title]);

    useEffect(() => {
        console.log('ANIME LIST:', animeList);
    }, [animeList]);


    const navigateToAnimeInfo = (id: number) => {
        navigate(`/anime/details/${encodeURIComponent(id)}`);
    }


    return (
        <Box style={styles.container}>
            {/* <MiuBox>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {Array.from(animeList).map((_, index) => {
                        const truncateTitle = animeList[index].title.english.length > 10 ? `${animeList[index].title.romaji.slice(0, 20)}...` : animeList[index].title.english;
                        return (
                            <Grid item xs={2} key={index}>
                                <Pressable onPress={() => navigateToAnimeInfo(animeList[index].id)}>
                                    <img src={animeList[index].image} alt={animeList[index].title.english} width={200} height={300} />
                                    <Text variant="textLg" fontWeight="bold" color="white">{truncateTitle}</Text>
                                    <div style={{ display: "flex" }}>
                                        <Button label={`Episode ${animeList[index].totalEpisodes}`} boxStyle={styles.animeEp} textStyle={styles.animeEpText}></Button>
                                        <Button label={animeList[index].type} boxStyle={styles.animeType} textStyle={styles.animeTypeText}></Button>
                                    </div>
                                </Pressable>
                            </Grid>
                        )
                    })}

                    {Array.from(animeList).map((_, index) => (
                        <Grid item xs={2} key={index}>
                            <img src={animeList.results[index].image} width={200} height={300} />
                        </Grid>
                    ))}
                </Grid>
            </MiuBox> */}
        </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: 'center',
        justifyContent: 'center',
    },

    scrollView: {
        width: "90%",
        flexGrow: 1,
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
