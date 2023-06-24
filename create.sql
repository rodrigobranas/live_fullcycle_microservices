drop schema fullcycle cascade;
create schema fullcycle;

create table fullcycle.event (
	event_id uuid,
	description text,
	price numeric,
	capacity integer
);

create table fullcycle.ticket (
	ticket_id uuid,
	event_id uuid,
	email text,
	status text
);

create table fullcycle.transaction (
	transaction_id uuid,
	ticket_id uuid,
	event_id uuid,
	tid text,
	price numeric,
	status text
);

insert into fullcycle.event (event_id, description, price, capacity) values ('bf6a9b3d-4d5c-4c9d-bf3b-4a091b05dc76', 'Foo Fighters 10/10/2022 22:00', 300, 100000);
