import { useParams } from 'react-router-dom';
import { Box, Text } from 'utils/theme';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { set } from 'react-hook-form';

export const Anime = () => {
    const { title, page } = useParams<{ title: string, page: string;}>();
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
        try{
            const response = await axios.get(url)
            setAnimeList(response.data.results)
        } catch (error) {
            console.error("Failed to get searched anime:", error)
        }
    }

    useEffect(() => {
        fetchAnime();
    },[]);

    return (
        <ScrollView>
            <Box>
                <Text>title: {decodeURIComponent(title)}</Text>
                {animeList.length > 0 ? (
                    animeList.map((anime) => (
                        <div key={anime.id}>
                            <Text>{anime.title.userPrefered}</Text>
                            <Text>Status: {anime.status}</Text>
                            <Image source={anime.image} style={{ width: 200, height: 200 }} />
                            <Text>Popularity: {anime.popularity}</Text>
                            <Text>Description: {anime.description}</Text>
                        </div>
                    ))
                ) : (
                    <Text>Loading...</Text>
                )}

            </Box>
        </ScrollView>
    );
};
