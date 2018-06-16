CREATE TABLE User (
  username VARCHAR(15) NOT NULL,
  phone_number VARCHAR(12) NOT NULL UNIQUE,
   email VARCHAR(30) NOT NULL UNIQUE,
  user_id INT(11) NOT NULL AUTO_INCREMENT,
  subscribtion_arn VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
);

CREATE TABLE Quote (
  quote text NOT NULL,
  used tinyint(1) DEFAULT '0',
  book_id int(11) NOT NULL,
  quote_id int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`quote_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `Quote_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `Book` (`book_id`)
);

CREATE TABLE Book (
  title varchar(50) NOT NULL,
  author varchar(50) NOT NULL,
  url_reference varchar(200) DEFAULT NULL,
  book_id int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`book_id`)
);