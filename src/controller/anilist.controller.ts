import { META } from "@consumet/extensions";
import { Request, Response } from "express";

const anilist = new META.Anilist();

export const searchAnime = async (req:Request, res:Response) => {
    try{
        const { title } = req.body

        const searchResult = await anilist.search(title)

        res.send({searchResult})
    } catch (error) {
        console.log(error)
    }
}

