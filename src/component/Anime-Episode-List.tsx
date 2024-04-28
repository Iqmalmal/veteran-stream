import { useEffect, useState } from "react";
import { Box, Text } from "utils/theme"
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import { experimentalStyled as styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Card, CardImg, Col, Row } from "reactstrap";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";


type EpisodeProps = {
    id?: string;
    title?: string;
    poster?: string;
}


const EpisodeList = ({id, title, poster}:EpisodeProps) => {
    const [animeEpData, setAnimeEpData] = useState<any>({});

    const fetchEpisode = async ({id}: EpisodeProps) => {
        try {
            if ( id ) {
                const url = `https://aniwatch-ten.vercel.app/anime/episodes/${encodeURIComponent(id)}`;
                const response = await axios.get(url);
                setAnimeEpData(response.data.episodes.reverse());
            } 
        
        
        } catch (error) {
            console.error('error in fetchEpisode', error);
            throw error;
        }
    }

    useEffect(() => {
        fetchEpisode({id});
    }, [id]);

    useEffect(() => {
        console.log(animeEpData)
    }, [animeEpData]);



    const Item = styled(Paper)(({ theme }) => ({
        backgroundImage: `url(${poster})`,
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: 200,
        height: 150,
    }));

    const renderEpisodeCard = ({ item }: { item: any }) => {
        return (
            // <Pressable onPress={() => navigateToAnimeWatch(item.id)}>
                <View style={styles.card}>
                    <View style={styles.epImageContainer}>
                    <Image source={{ uri: poster }} style={styles.epImage} />
                        <View style={styles.epOverlay}>
                            <Text style={styles.epText}>Ep {item.number}</Text>
                        </View>
                    </View>
                </View>
            // </Pressable>
        );
    }

    return (
        
        <>
        
            {/* <Text variant="text3Xl" fontWeight="bold" color="white">{animeEpData.title}</Text> */}
                <FlatList
                    data={animeEpData}
                    renderItem={renderEpisodeCard}
                    keyExtractor={(item) => item.episodeId}
                    numColumns={6}
                    columnWrapperStyle={styles.columnWrapper}
                />


        </>
    )
}


const styles = StyleSheet.create({
    scrollViewContent: {
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



export default EpisodeList;