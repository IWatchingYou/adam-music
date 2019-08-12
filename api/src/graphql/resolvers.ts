import { musicList, music, createMusic, updateMusic } from "../controller/musicController";
import { artistList, artist, createArtist, updateArtist } from "../controller/artistController";
import { pool } from '../config/connection';
import { Upload } from "./Upload";
import { createWriteStream } from "fs";
import { resolve } from "dns";

export const resolvers = {
    Query: {
        musicList: musicList,
        artistList: artistList,
        music: music,
        artist: artist,
        genresList: () => { [] },
        getDate: () => {
            return pool.query('select now()')
            .then(res => res.rows[0])
            .catch(err => err)
        } 
    },
    Mutation: {
        createMusic: createMusic,
        createArtist: createArtist,
        createGenres: (parent: any, args: any) => true,
        updateMusic: updateMusic,
        updateArtist: updateArtist,
        updateGenres: (parent: any, args: any) => true,
        singleUpload: async (parent: any, args: any) => {
            await args.file.then((fi: Upload) => {
                fi
                .createReadStream()
                .pipe(
                    createWriteStream(__dirname + `/images/${fi.filename}`)
                )
                .on('close', () => {
                    
                })
            })
        }
    }
}