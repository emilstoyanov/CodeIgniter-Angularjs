
CREATE DATABASE IF NOT EXISTS `onlime` COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `categories` (
  `c_id` INT unsigned NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NOT NULL DEFAULT '',
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;
insert into `categories` (name) values ('първа'),('втора'),('трета'),('четвърта');

CREATE TABLE IF NOT EXISTS `articles` (
  `a_id` INT unsigned NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NOT NULL DEFAULT '',
  `c_id` INT unsigned NOT NULL,
  `img` VARCHAR(40) NOT NULL DEFAULT ''
  PRIMARY KEY (`a_id`),
  FOREIGN KEY (`c_id`) REFERENCES `categories` (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

ALTER TABLE `articles` ADD FULLTEXT KEY `n` (`name`);

insert into `articles` (name,c_id,img) values 
('тениска черна',1,'/images/image.png'),
('тениска бяла',2,'/images/image.png'),
('тениска червена',3,'/images/image.png'),
('тениска синя',4,'/images/image.png'),
('тениска зелена',1,'/images/image.png'),
('блуза зелена',2,'/images/image.png'),
('блуза синя',3,'/images/image.png'),
('ьяао ',3,'/images/image.png'),
('ьао ьоьа',2,'/images/image.png'),
('ь ьяао ьо ьо',4,'/images/image.png'),
('ьао ьяаоьяо',1,'/images/image.png'),
('ьао ьо ',2,'/images/image.png'),
('ьа оьяао ьяао ',3,'/images/image.png'),
('уеишушиуишу',4,'/images/image.png'),
('уишуеишуеиш',1,'/images/image.png'),
('уиешуеи',1,'/images/image.png'),
('2534523535еишу',1,'/images/image.png'),
('уишуеиш',2,'/images/image.png'),
('уишуеиш',3,'/images/image.png'),
('еишеиш',3,'/images/image.png'),
('21',3,'/images/image.png'),
('2',2,'/images/image.png'),
('3',2,'/images/image.png'),
('4',2,'/images/image.png'),
('5',3,'/images/image.png'),
('6',4,'/images/image.png'),
('7',4,'/images/image.png'),
('8',3,'/images/image.png'),
('9',4,'/images/image.png'),
('ьяао',3,'/images/image.png'),
('ьао',4,'/images/image.png'),
('ьао',3,'/images/image.png'),
('ьао',4,'/images/image.png'),
('ьаоь',1,'/images/image.png');
