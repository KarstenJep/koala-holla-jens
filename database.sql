CREATE TABLE "koala" (
	"id" serial primary key,
	"name" varchar(30),
	"gender" varchar(10),
	"age" integer,
	"ready_to_transfer" varchar(10),
	"notes" varchar(80)
	);

INSERT INTO "koala" ("id", "name", "gender", "age", "ready_to_transfer", "notes")
VALUES (1000, 'Scotty', 'M', 4, 'Y', 'Born in Guatemala');
INSERT INTO "koala" ("id", "name", "gender", "age", "ready_to_transfer", "notes")
(2000, 'Jean', 'F', 5, 'Y', 'Allergic to lots of lava');
INSERT INTO "koala" ("id", "name", "gender", "age", "ready_to_transfer", "notes")
(3000, 'Ororo', 'F', 7, 'N', 'Loves listening to Paula(Abdul)');
INSERT INTO "koala" ("id", "name", "gender", "age", "ready_to_transfer", "notes")
(4000, 'Logan', 'M', 15, 'N', 'Loves the sauna');
INSERT INTO "koala" ("id", "name", "gender", "age", "ready_to_transfer", "notes")
(5000, 'Charlie', 'M', 9, 'Y', 'Favorite band is Nirvana');
INSERT INTO "koala" ("id", "name", "gender", "age", "ready_to_transfer", "notes")
(6000, 'Betsy', 'F', 4, 'Y', 'Have a pet iquana');