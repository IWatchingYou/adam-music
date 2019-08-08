# adam music

```
create table musics(
    id serial primary key,
    title varchar(30) not null,
    release varchar(30),
    image varchar(250),
    description text,
    artist int [],
    genres int []
);

create table artists(
    id serial primary key,
    name varchar(30) not null,
    gender varchar(30) not null,
    image varchar(250)
);

create table genres(
    id serial primary key,
    name varchar(30) not null
)
```
