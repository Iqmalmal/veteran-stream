import { useParams } from 'react-router-dom';
import { Box, Text } from 'utils/theme';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Image, ScrollView } from 'react-native';

import { experimentalStyled as styled } from '@mui/material/styles';
import MiuBox from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export const Anime = () => {
    const { title, page } = useParams<{ title: string, page: string; }>();
    const [animeList, setAnimeList] = useState<any[]>([]);

    // Check if title and page are defined before rendering
    if (!title || !page) {
        return (
            <Box>
                <Text>Error: Missing parameters</Text>
            </Box>
        );
    }

    const url = `https://consumet-flax.vercel.app/meta/anilist/${encodeURIComponent(title)}`

    const fetchAnime = async () => {
        try {
            const response = await axios.get(url)
            setAnimeList(response.data)
            // console.log("Anime list:", animeList)
        } catch (error) {
            console.error("Failed to get searched anime:", error)
        }
    }

    useEffect(() => {
        fetchAnime();
    }, [title]);

    return (
        <ScrollView>
            <Box>
                <Text>title: {decodeURIComponent(title)}</Text>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {animeList.length > 0 ? (
                        animeList.map((anime) => (
                            <Grid item xs={2} sm={4} md={4} key={anime.id}>
                                <Paper elevation={3} style={{ padding: '10px', textAlign: 'center' }}>
                                    <Text variant="textSm">{anime.title.userPrefered}</Text>
                                    <Text variant="textSm">Status: {anime.status}</Text>
                                    <img src={anime.image} alt={anime.title.userPrefered} style={{ width: 200, height: 200, marginTop: '10px' }} />
                                    <Text variant="textSm">Popularity: {anime.popularity}</Text>
                                    <Text variant="textSm">Description: {anime.description}</Text>
                                </Paper>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                                <Text variant="textSm">Loading...</Text>
                        </Grid>
                    )}
                </Grid>

            </Box>
        </ScrollView>
    );
};
