import { pool } from '../config/connection';

export const musicList = () => {
    return pool.query(`
    select
       m.id,
       m.title,
       m.release,
       m.image,
       m.description,
       case when count(m.artist) = 0 then ARRAY[]::json[] else array_agg(json_build_object('id', a.id, 'name', a.name, 'gender', a.gender, 'image', a.image)) end as artist,
       case when count(m.genres) = 0 then ARRAY[]::json[] else array_agg(json_build_object('id', g.id, 'name', g.name)) end as genres
    from
        musics m left join public.genres as g on g.id = any(m.genres) left join public.artists as a on a.id = any(m.artist)
    group by a.id, m.id;
    `)
        .then(res => res.rows)
        .catch(err => err)
}

export const music = (parent: any, args: any) => {
    return pool.query(`
    select
       m.id,
       m.title,
       m.release,
       m.image,
       m.description,
       case when count(m.artist) = 0 then ARRAY[]::json[] else array_agg(json_build_object('id', a.id, 'name', a.name, 'gender', a.gender, 'image', a.image)) end as artist,
       case when count(m.genres) = 0 then ARRAY[]::json[] else array_agg(json_build_object('id', g.id, 'name', g.name)) end as genres
    from
        musics m left join public.genres as g on g.id = any(m.genres) left join public.artists as a on a.id = any(m.artist)
    where m.id = 2
    group by a.id, m.id;
    `)
    .then(res => res.rows[0])
    .catch(err => err)
}

export const createMusic = (parent: any, args: any) => {
    const item = args.data;
    const query = `
        insert into musics(title, release, image, description, artist, genres)
        values(
            '${item.title}', 
            '${item.release}', 
            '${item.image}', 
            '${item.description}', 
            ${item.artist_id == undefined ? null : 'Array' + JSON.stringify(item.artist_id) }, 
            ${item.genres_id == undefined ? null : 'Array' + JSON.stringify(item.genres_id)})
    `
    return pool.query(query)
    .then(() => true)
    .catch((err) => false)
}

export const updateMusic = (parent: any, args: any) => {
    const item = args.data;
    const query = `
        update 
            musics
        set
            title = '${item.title}',
            release = '${item.release}', 
            image = '${item.image}', 
            description = '${item.description}', 
            artist = ${ item.artist_id == undefined ? null : 'Array' + JSON.stringify(item.artist_id) }, 
            genres = ${ item.genres_id == undefined ? null : 'Array' + JSON.stringify(item.genres_id) }
        where id = ${item.id}
    `
    return pool.query(query)
    .then(() => true)
    .catch((err) => false)
}