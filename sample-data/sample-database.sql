-- to be used with MySQL

DROP DATABASE IF EXISTS `tweets`;
CREATE DATABASE `tweets`;
USE `tweets`;

DROP TABLE IF EXISTS `sql_tweets`;
CREATE TABLE `sql_tweets` (
    `tweet_id` INT NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(280) NOT NULL,
    `username` VARCHAR(200) NOT NULL,
    `scam` VARCHAR(3),
    PRIMARY KEY (`tweet_id`)
);

INSERT INTO `sql_tweets` (content, username) VALUES ('this is just a test', 'Ashkan');
INSERT INTO `sql_tweets` (content, username) VALUES ('solely testing', 'Alex');
INSERT INTO `sql_tweets` (content, username) VALUES ('the test was simple', 'John');
INSERT INTO `sql_tweets` (content, username) VALUES ('testing is key', 'Crhis');
INSERT INTO `sql_tweets` (content, username) VALUES ('test the tase!', 'Charlie');
INSERT INTO `sql_tweets` (content, username) VALUES ('This does not look like twitter', 'Crhis');

SELECT * FROM tweets;