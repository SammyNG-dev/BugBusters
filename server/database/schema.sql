create table videogame (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  img varchar(255) not null,
  gender varchar(255) not null,
  editor varchar(255) not null,
  descrip text not null
);

create table user (
  id int unsigned primary key auto_increment not null,
  firstname varchar(255) not null,
  lastname varchar(255) not null,
  email varchar(255) not null,
  is_admin boolean not null default false,
  hashed_password varchar(255) not null,
  img_profile varchar(255) default null,
  infos text default null
  );

create table user_favorite_game (
  videogame_id int unsigned not null,
  user_id int unsigned not null,
  primary key (user_id, videogame_id),
  foreign key (videogame_id) references videogame(id) on delete cascade,
  foreign key (user_id) references user(id) on delete cascade
);

insert into user
(firstname, lastname, email, is_admin, hashed_password, img_profile, infos)
values
("Anakin", "Skywalker", "anakin.skywalker@gmail.com", true, "$argon2id$v=19$m=19456,t=2,p=1$v/E65Tl3DJyR0eB/TQqndg$XBXi6ukIHAcG6bEpOZ6Ojuu8SiunvF9Vkqxj6PjVG/A", "anakin.png", "Je déteste le sable !!!");


insert into videogame (title, img, gender, editor, descrip)
values
("Pac-man", "pac-man-logo.png", "Action", "Namco", "Pac-Man est l'un des jeux d'arcade les plus emblématiques de tous les temps. Le joueur contrôle Pac-Man, un personnage jaune circulaire, qui doit manger des pastilles dans un labyrinthe tout en évitant les fantômes. Des fruits et des pastilles spéciales permettent de rendre Pac-Man temporairement invincible pour manger les fantômes. Le jeu est connu pour son gameplay addictif et son design iconique."),
("Space Invaders", "Space_Invaders_Logo.png", "Arcade/Shoot'em up", "Atari/Taito Corporation/Midway Games", "Space Invaders est un shoot'em up fixe développé par Taito en 1978. Conçu par Tomohiro Nishikado, il est considéré comme le premier archétype du genre et l'un des jeux vidéo les plus influents de l'histoire."),
("Donkey kong", "Donkey_Kong_Logo.png", "Action/Plateforme", "Nintendo", "Donkey Kong marque l'une des premières apparitions de Mario (appelé Jumpman) et de Donkey Kong. Le joueur doit escalader des niveaux tout en évitant des tonneaux lancés par Donkey Kong pour sauver la princesse Pauline."),
("street fighter", "street-fighter-II.png", "Combat", "Capcom", "Street Fighter II est un pilier du genre des jeux de combat, connu pour ses personnages emblématiques comme Ryu, Chun-Li, et Guile. Il a introduit des combats fluides, des coups spéciaux et une profonde stratégie dans le gameplay compétitif."),
("Dragon ball fighterZ", "Dragon_Ball_FighterZ_Logo.png", "Combat", "Bandai Namco Entertainement", "Dragon Ball FighterZ est un jeu de combat inspiré de l'univers de Dragon Ball, offrant des affrontements en équipe de trois personnages. Son style graphique en 2.5D fidèle à l'animé, ainsi que ses mécaniques accessibles et profondes, ont séduit les fans et les amateurs de jeux de combat."),
("Duck Hunt", "Duck_Hunt_Logo.png", "Jeu de tir", "Nintendo", "Duck Hunt est le jeu de tir le plus populaire de l'histoire, sorti sur NES en 1985, aux côtés de Super Mario Bros.. Ces deux jeux étaient intégrés dans la même cartouche, vendue avec la NES dans le Action Set, incluant deux manettes et le Zapper, un pistolet optique conçu pour ce jeu. Duck Hunt propose plusieurs niveaux à la difficulté croissante, où le joueur doit abattre le plus grand nombre de canards pour maximiser son score. Il est rare de trouver ce jeu vendu seul."),
("Mario Bros", "mariobros.jpg", "Action/Plateforme", "Nintendo", "Mario Bros. est l'un des premiers jeux mettant en scène les célèbres frères Mario et Luigi. Le jeu se déroule dans des niveaux fixes où les joueurs doivent éliminer des ennemis en sautant sous leurs plates-formes pour les retourner, avant de les frapper pour les faire disparaître."),
("Mario Kart Arcade GP", "Mario_Kart_Arcade_GP_Logo.jpg", "Course", "Nintendo", "Mario Kart Arcade GP est une version arcade de la célèbre série de jeux de course Mario Kart. Le jeu introduit des personnages et circuits exclusifs, ainsi que des mécaniques adaptées au format arcade."),
("Streets of Rage 4", "Streets_of_Rage_4_Logo.png", "Beat 'em up", "Dotemu", "Streets of Rage 4 est un hommage modernisé au célèbre jeu de combat de rue des années 90. Les joueurs incarnent Axel, Blaze, et d'autres personnages dans une aventure rythmée par des graphismes modernes et une bande-son captivante."),
("Bomberman", "Bomberman_Logo.png", "Action/Stratégie", "Hudson Soft", "Bomberman est un jeu où le joueur place des bombes pour détruire des ennemis et des obstacles dans des labyrinthes. Le mode multijoueur est particulièrement populaire, avec des parties où chaque joueur doit éliminer les autres tout en évitant leurs propres bombes."),
("R-Type", "R-Type_Logo.png", "Shoot 'em up", "Irem", "R-Type est un jeu de tir spatial légendaire où le joueur contrôle un vaisseau équipé d'un module de tir adaptable. Il se distingue par son gameplay exigeant et ses boss impressionnants."),
("Soulcalibur", "SoulCalibur_Logo.png", "Combat", "Namco", "Soulcalibur est un jeu de combat à l'arme blanche offrant des affrontements dynamiques et techniques. Sa précision et ses personnages mémorables comme Mitsurugi ou Sophitia en font un classique du genre."),
("Metal Slug", "Metal_Slug_Logo.png", "Run and gun", "SNK", "Metal Slug est un jeu de tir en défilement horizontal, où les joueurs combattent des ennemis tout en utilisant une variété d'armes et de véhicules. Connu pour son action frénétique, son humour et ses graphismes en pixel art"),
("Worms", "Worms_Logo.gif", "Stratégie/Tactique", "Team17", "Worms est un jeu de stratégie où chaque joueur contrôle une équipe de vers armés jusqu'aux dents. Les vers se battent dans des environnements destructibles, en utilisant une gamme d'armes farfelues pour éliminer l’équipe adverse. Le jeu est reconnu pour son humour et sa stratégie en tour par tour."),
("Tekken 3", "Tekken-3.png", "Combat", "Namco", "Tekken 3 est un pilier des jeux de combat en 3D, introduisant des personnages emblématiques comme Jin Kazama et des mouvements aériens révolutionnaires. Son système de jeu équilibré a marqué l'histoire des jeux d'arcade."),
("Dragon’s Lair", "Dragon's_Lair_Logo.png", "Aventure/Action", "Cinematronics", "Dragon’s Lair est un jeu d’aventure où le joueur prend le rôle du chevalier Dirk qui doit sauver la princesse Daphne. Le jeu utilise des animations de style dessin animé, ce qui le distingue de nombreux autres jeux d'arcade de l'époque.");