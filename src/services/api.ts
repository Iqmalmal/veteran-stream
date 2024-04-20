import { META } from '@consumet/extensions'

type SearchType = ISearch

const anilist = new META.Anilist();

export const search = async ({title}: SearchType) => {
    try {
        console.log('Searching for:', title)
        const data = await anilist.search(title)
        return data

    } catch (error) {
        console.log(error)
        throw error
    }
}