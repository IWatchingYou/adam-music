import { pool } from '../config/connection';

export const artistList = () => {
   return pool.query('select *from artists')
   .then(res => res.rows)
   .catch(err => err) 
}

export const artist = (parent: any, args: any) => {
    return pool.query(`select *from artists where id = ${args.id}`)
    .then(res => res.rows[0])
    .catch(err => err)
}

export const createArtist = (parent: any, args: any) => {
    return pool.query(`
        insert into artists(name, gender, image)
        values('${args.data.name}', '${args.data.gender}', '${args.data.image}')
    `)
    .then(() => true)
    .catch(() => false)
} 

export const updateArtist = (parent: any, args: any) => {
    return pool.query(`
        update artists
        set 
            name = '${args.data.name}',
            gender = '${args.data.gender}',
            image = '${args.data.image}'
        where id = ${args.data.id}
    `)
    .then(() => true)
    .catch(() => false)
}