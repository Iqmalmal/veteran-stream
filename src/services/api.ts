import axiosInstance from "./config"


type searchAnimeType = {
    "title": string
}

export const searchAnime = async ({title}:searchAnimeType ) => {
    try{
        const respone = await axiosInstance.post("/search/", {title})
    } catch (error) {
        console.log(error)
    }
}