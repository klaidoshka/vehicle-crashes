create table crashes.vehicle_type
(
    id   integer      not null
        primary key,
    type varchar(255) not null
        constraint vehicletype_type_check
            check ((type)::text = ANY
                   ((ARRAY ['CAR'::character varying, 'BUS'::character varying, 'VAN'::character varying, 'TRUCK'::character varying, 'MOTORCYCLE'::character varying, 'BOAT'::character varying, 'PLANE'::character varying])::text[]))
);

create table crashes.crash
(
    id          bigserial
        primary key,
    damage_cost real         not null,
    date_crash  timestamp(6) not null
);

create table crashes.person
(
    id         bigserial
        primary key,
    date_birth date         not null,
    gender     smallint     not null
        constraint person_gender_check
            check ((gender >= 0) AND (gender <= 2)),
    name       varchar(255) not null
);

create table crashes.crash_casualties_people
(
    crash_id  bigint not null
        constraint fka0r866lp20sui1e4bydd33bgf
            references crashes.crash,
    person_id bigint not null
        constraint fkl46mtcgqnuiai9mfq9nyppvj1
            references crashes.person,
    primary key (crash_id, person_id)
);

create table crashes.vehicle
(
    id               bigserial
        primary key,
    color            varchar(255) not null,
    date_manufacture date         not null,
    plate            varchar(255) not null
        constraint uk_1fwx26ejgbq0njjjhef23vvpq
            unique,
    type             smallint     not null
        constraint vehicle_type_check
            check ((type >= 0) AND (type <= 6))
);

create table crashes.crash_casualties_vehicle
(
    crash_id   bigint not null
        constraint fk8ncefrslr6s4o12jady4vv3qp
            references crashes.crash,
    vehicle_id bigint not null
        constraint fknfu1w85c1odcc6ddbpunj2gu5
            references crashes.vehicle,
    primary key (crash_id, vehicle_id)
);

create table crashes.insurance
(
    id                  bigserial
        primary key,
    date_expiration     date   not null,
    date_initialization date   not null,
    vehicle_id          bigint not null
        constraint fktj26f8lbhm3hs55f4i5kxp9sn
            references crashes.vehicle
);

create table crashes.vehicle_owner
(
    id               bigserial
        primary key,
    date_acquisition date   not null,
    date_disposal    date,
    person_id        bigint not null
        constraint fkpye0lnvvqp6w44wfrjki6b7vk
            references crashes.person,
    vehicle_id       bigint not null
        constraint fks0s5fr1r1tptltkgx9xdg1hld
            references crashes.vehicle
);
