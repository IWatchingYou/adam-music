import { musicList, music, createMusic, updateMusic } from "../controller/musicController";
import { artistList, artist, createArtist, updateArtist } from "../controller/artistController";

export const resolvers = {
    Query: {
        musicList: musicList,
        artistList: artistList,
        music: music,
        artist: artist,
        genresList: () => { [] }
    },
    Mutation: {
        createMusic: createMusic,
        createArtist: createArtist,
        createGenres: (parent: any, args: any) => true,
        updateMusic: updateMusic,
        updateArtist: updateArtist,
        updateGenres: (parent: any, args: any) => true,
        singleUpload: async (parent: any, args: any) => {
            return await args.file.then((fi: any) => fi)
        }
    }
}