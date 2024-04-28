import axios from 'axios';
import e from 'express';
import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigate, useParams } from 'react-router-dom';
import theme, { Box, Text } from 'utils/theme';

import {Card, CardBody, CardHeader, CardText, CardTitle} from 'reactstrap'

import { styled } from '@mui/material/styles';
import MiuBox from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import EpisodeList from './Anime-Episode-List';

const removeHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>?/gm, ''); // Remove all HTML tags
};


export const AnimeInfoNew = () => {
    const { id } = useParams<{ id: string }>();

    const [animeInfoData, setAnimeInfoData] = useState<any>({});

    const navigate = useNavigate();

    const fetchAnimeInfo = async () => {
        try {
            if ( id ) {
                const url = `https://aniwatch-ten.vercel.app/anime/info?id=${encodeURIComponent(id)}`;
                const response = await axios.get(url);

                // response.data.description = removeHtmlTags(response.data.description);
                console.log('animeInfo:', response.data.anime.info);
            
                setAnimeInfoData(response.data);
            }
        } catch (error) {
            console.error('Error in fetchAnimeInfo', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchAnimeInfo();
    }, [id]); // Run once on component mount


    const navigateToAnimeWatch = (episodeid: string) => {
        navigate(`/anime/stream/${encodeURIComponent(episodeid)}`);
    }


    const renderEpisodeCard = ({ item }: { item: any }) => {
        return (
            <Pressable onPress={() => navigateToAnimeWatch(item.id)}>
                <View style={styles.card}>
                    <View style={styles.epImageContainer}>
                        <Image source={item.poster} style={styles.epImage} />
                        <View style={styles.epOverlay}>
                            <Text style={styles.epText}>{item.title}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        );
    }


    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Box style={styles.container}>
               <MiuBox>
                    <Box style={{flexDirection:"row", gap: 40, width: 1200}}>
                        <View>
                            <Image source={{ uri: animeInfoData.anime?.info?.poster }} style={styles.image} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text variant="text3Xl" fontWeight='bold' color="white" mb="12">
                                {animeInfoData.anime?.info?.name}
                            </Text>
                            <Text variant="textLg" color="white">
                                {animeInfoData.anime?.info?.description}
                            </Text>
                        </View>
                    </Box>
               </MiuBox>
               <View style={{borderWidth: 2, borderColor:theme.colors.grey  , width: 1300, marginTop: 20}}></View>

                <MiuBox>
                    <EpisodeList title={animeInfoData.anime?.info?.name}  poster={animeInfoData.anime?.info?.poster} id={animeInfoData.anime?.info?id : undefined}/>
                </MiuBox>

                {/* <Card
                    className="my-2"
                    color="primary"
                    outline
                    style={{
                        width: '18rem'
                    }}
                >
                    <CardHeader>
                        Header
                    </CardHeader>
                    <CardBody>
                        <CardTitle tag="h5">
                            Special Title Treatment
                        </CardTitle>
                        <CardText>
                            With supporting text below as a natural lead-in to additional content.
                        </CardText>
                    </CardBody>
                </Card> */}

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
        width: 100,
    },

    info: {
        marginTop: "10%",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    image: {
        width: 250,
        height: 350,
        borderRadius: 3,
    },

    textContainer: {
        marginLeft: 20,
        flex: 1, // Take remaining space
        flexDirection: 'column', // Arrange children vertically
        paddingRight: -500,
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
