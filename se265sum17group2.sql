-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2017 at 12:56 AM
-- Server version: 5.5.54-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `se265sum17group2`
--

DELIMITER $$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `deleteCategory`(
IN `_catID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
DELETE FROM `word_categories` 
WHERE  `catID` = `_catID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `deleteFavorite`(
IN `_userID` INT UNSIGNED,
IN `_projID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
DELETE FROM `favorites` 
WHERE  `userID` = `_userID` AND `projID` = `_projID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `deleteMessage`(
IN `_messageID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
DELETE FROM `messages` 
WHERE  `messageID` = `_messageID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `deletePage`(
IN `_pageID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
DELETE FROM `pages` 
WHERE  `pageID` = `_pageID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `deleteProj`(
IN `_projID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
DELETE FROM `projects` 
WHERE  `projID` = `_projID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `deleteQuestion`(
IN `_questionID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
DELETE FROM `questions`
WHERE  `questionID` = `_questionID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `deleteQuestionWord`(
IN `_questionID` INT UNSIGNED,
IN `_wordID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
DELETE FROM `question_words` 
WHERE  `questionID` = `_questionID` AND `wordID` = `_wordID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `deleteTemplate`(
IN `_tempID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
DELETE FROM `question_templates` 
WHERE  `tempID` = `_tempID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `deleteTopic`(
IN `_topID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
DELETE FROM `topics` 
WHERE  `topID` = `_topID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `deleteTopicWord`(
IN `_wordID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
DELETE FROM `topic_words` 
WHERE `wordID` = `_wordID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `deleteUser`(
IN `_userID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
DELETE FROM `users` 
WHERE  `userID` = `_userID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `deleteWordInstance`(
IN `_wordID` INT UNSIGNED,
IN `_pageID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
DELETE FROM `word_instance` 
WHERE  `wordID` = `_wordID` AND `pageID` = `_pageID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getAdminUsers`( )
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `userID`,
  `fName`,
  `lName`,
  `uName`,
  `email`,
  `psHashed`,
  `userBio`,
  `userAvatar`
FROM `users`
WHERE  `admin`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getCategoriesAll`( )
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `catID`,
  `catAbbrev`,
  `catName`
FROM `word_categories`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getCategoriesByAbbrev`( 
	IN `_catAbbrev` CHAR( 3 ) CHARSET utf8mb4
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `catID`,
  `catName`
FROM `word_categories`
WHERE  `catAbbrev` = `_catAbbrev`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getCategoriesByID`( 
	IN `_catID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `catName`,
  `catAbbrev`
FROM `word_categories`
WHERE  `catID` = `_catID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getFavoritesAll`( )
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `projID`,
  `userID`
FROM `favorites`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getFavsByProject`( 
	IN `_projID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT `userID`
FROM `favorites`
WHERE  `projID` = `_projID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getFavsByUser`( 
	IN `_userID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT `projID`
FROM `favorites`
WHERE  `userID` = `_userID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getMessagesAll`()
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `messageID`,
  `email`,
  `userID`,
  `subject`,
  `message`,
  `dateSubmitted`
FROM `messages`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getMessagesByID`( 
	IN `_messageID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `email`,
  `userID`,
  `subject`,
  `message`,
  `dateSubmitted`
FROM `messages`
WHERE  `messageID` = `_messageID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getPageByWord`(
IN `_wordID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `pageID`
  `projID`,
  `topID`,
  `pageNum`,
  `content`,
  `dateCreated`,
  `lastModified`,
  `topTitle`,
  `word`
FROM `pages` 
JOIN `topics` ON `pages`.`topID` = `topics`.`topID`
JOIN `topc_words` ON `topic_words`.`topID` = `topics`.`topID`
WHERE  `wordID` = `_wordID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getPagesAll`( )
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `pageID`,
  `projID`,
  `topID`,
  `pageNum`,
  `content`,
  `dateCreated`,
  `lastModified`
FROM `pages`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getPagesByID`( 
	IN `_pageID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `projID`,
  `topID`,
  `pageNum`,
  `content`,
  `dateCreated`,
  `lastModified`
FROM `pages`
WHERE  `pageID` = `_pageID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getPagesByProject`( 
	IN `_projID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `pageID`,
  `topID`,
  `pageNum`,
  `content`,
  `dateCreated`,
  `lastModified`
FROM `pages`
WHERE  `projID` = `_projID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getPagesByWord`(
IN `_wordID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `pageID`
  `projID`,
  `topID`,
  `pageNum`,
  `content`,
  `dateCreated`,
  `lastModified`
FROM `pages` JOIN `word_instance`
ON `pages`.`wordID` = `word_instance`.`wordID`
WHERE  `wordID` = `_wordID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getProjectsAll`( )
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `projID`,
  `ownerID`,
  `projTitle`,
  `public`
FROM `projects`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getProjectsByID`( 
	IN `_projID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `ownerID`,
  `projTitle`,
  `public`
FROM `projects`
WHERE  `projID` = `_projID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getProjectsByUser`( 
	IN `_userID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `projID`,
  `projTitle`,
  `public`
FROM `projects`
WHERE  `ownerID` = `_userID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getPublicProjects`( )
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `projID`,
  `ownerID`,
  `projTitle`
FROM `projects`
WHERE  `public`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getQuestionsAll`( )
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `questionID`,
  `tempID`,
  `relevant`
FROM `questions`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getQuestionsByID`( 
	IN `@questionID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `tempID`,
  `relevant`
FROM `questions`
WHERE  `questionID` = `_questionID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getQuestionsByTemplate`( 
	IN `_tempID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `questionID`,
  `relevant`
FROM `questions`
WHERE  `tempID` = `_tempID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getQuestionsByWord`( 
IN `_wordID` INT UNSIGNED 
)
    NO SQL
    SQL SECURITY INVOKER
SELECT 
`questionID`,
`wordPosition`
FROM `question_words`
WHERE `wordID` = `_wordID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getQuestionWordsAll`( )
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `questionID`,
  `wordID`,
  `wordPosition`
FROM `question_words`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getRelevantQuestions`( )
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `questionID`,
  `tempID`
FROM `questions`
WHERE  `relevant`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getRelevantTopics`( )
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `topID`,
  `catID`,
  `topTitle`
FROM `topics`
WHERE  `relevant`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getTemplateByCategory`( 
	IN `_catID` INT UNSIGNED 
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `tempID`,
  `template`,
  `varCnt`
FROM `question_templates`
WHERE  `catID` = `_catID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getTemplateByCount`( 
	IN `_varCnt` INT UNSIGNED 
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `tempID`,
  `catID`,
  `template`
FROM `question_templates`
WHERE  `varCnt` = `_varCnt`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getTemplateByID`( 
	IN `_tempID` INT UNSIGNED 
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `catID`,
  `template`,
  `varCnt`
FROM `question_templates`
WHERE  `tempID` = `_tempID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getTemplatesAll`( )
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `tempID`,
  `catID`,
  `template`,
  `varCnt`
FROM `question_templates`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getTopicsAll`()
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `topID`,
  `catID`,
  `topTitle`,
  `relevant`
FROM `topics`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getTopicsByCategory`( 
	IN `_catID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `topID`,
  `topTitle`,
  `relevant`
FROM `topics`
WHERE  `catID` = `_catID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getTopicsByID`( 
	IN `_topID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `catID`,
  `topTitle`,
  `relevant`
FROM `topics`
WHERE  `topID` = `_topID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getUsersAll`( )
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `userID`,
  `fName`,
  `lName`,
  `uName`,
  `email`,
  `psHashed`,
  `userBio`,
  `userAvatar`,
  `admin`
FROM `users`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getUsersByEmail`( 
	IN `_email` VARCHAR( 60 ) CHARSET utf8mb4 
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `userID`,
  `fName`,
  `lName`,
  `uName`,
  `ps_hashed`,
  `admin`,
  `userBio`,
  `userAvatar`
FROM `users`
WHERE  `email` =`_email`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getUsersByID`(
IN `_userID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT 
`fName`,
`lName`,
`uName`,
`email`,
`ps_hashed`,
`admin`,
`userBio`,
`userAvatar`
FROM `users` 
WHERE `userID` = `_userID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getUsersByUsername`(
IN `_uName` VARCHAR(60) CHARSET utf8mb4
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
`userID`,
`fName`,
`lName`,
`email`,
`ps_hashed`,
`admin`,
`userBio`,
`userAvatar`
FROM `users`
WHERE  `uName` = `_uName`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getWordByQuestion`( 
IN `_questionID` INT UNSIGNED 
)
    NO SQL
    SQL SECURITY INVOKER
SELECT 
`wordID`,
`wordPosition`
FROM `question_words`
WHERE `questionID` = `_questionID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getWordInstancesAll`( )
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `wordID`,
  `pageID`
FROM word_instance$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getWordsAll`()
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `wordID`,
  `topID`,
  `wordStr`,
  `plural`
FROM `topic_words`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getWordsByID`( 
	IN `_wordID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `topID`,
  `wordStr`,
  `plural`
FROM `topic_words`
WHERE  `topID` = `_topID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getWordsByPage`(
IN `_pageID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `wordID`,
  `topID`,
  `wordStr`,
  `plural`
FROM `word_instance` JOIN `pages`
ON `word_instance`.`pageID` = `pages`.`pageID`
WHERE  `pageID` = `_pageID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `getWordsByTopic`( 
	IN `_topID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
SELECT  
  `wordID`,
  `wordStr`,
  `plural`
FROM `topic_words`
WHERE  `topID` = `_topID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `insertCategory`(
IN `_catName` VARCHAR(60) CHARSET utf8mb4,
IN `_catAbbrev` CHAR(3) CHARSET utf8mb4
)
    NO SQL
    SQL SECURITY INVOKER
BEGIN
INSERT INTO `se265sum17group2`.`word_categories` 
SET 
`catName` = `_catName`, 
`catAbbrev` = `_catAbbrev`;
SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `insertFavorite`(
	IN `_projID` INT UNSIGNED,
	IN `_userID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
BEGIN
INSERT INTO `se265sum17group2`.`favorites`
SET  
 `projID` = `_projID` ,
 `userID` = `_userID`;
 SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `insertMessageNoUser`( 
	IN `_email` VARCHAR( 60 ) CHARSET utf8mb4,
	IN `_subject` VARCHAR( 100 ) CHARSET utf8mb4,
	IN `_message` TEXT CHARSET utf8mb4
)
    NO SQL
    SQL SECURITY INVOKER
BEGIN
INSERT INTO `se265sum17group2`.`messages`
SET  `email` =`_email` ,
 `subject` = `_subject` ,
 `message` = `_message` ,
 `userID` = NULL;
 SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `insertMessageWithUser`(
IN `_email` VARCHAR(60) CHARSET utf8mb4,
IN `_subject` VARCHAR(100) CHARSET utf8mb4,
IN `_message` TEXT CHARSET utf8mb4,
IN `_userID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
BEGIN
INSERT INTO `se265sum17group2`.`messages`
SET  
 `email` =`_email` ,
 `subject` = `_subject` ,
 `message` = `_message` ,
 `userID` = `_userID`;
 SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `insertNewUser`(
IN `_fName` VARCHAR(60) CHARSET utf8mb4,
IN `_lName` VARCHAR(60) CHARSET utf8mb4,
IN `_uName` VARCHAR(60) CHARSET utf8mb4,
IN `_email` VARCHAR(60) CHARSET utf8mb4,
IN `_psHashed` VARCHAR(60) CHARSET utf8mb4,
IN `_userBio` TEXT CHARSET utf8mb4,
IN `_userAvatar` VARCHAR(30) CHARSET utf8mb4
)
    NO SQL
    SQL SECURITY INVOKER
BEGIN
INSERT INTO `se265sum17group2`.`users`
SET 
	`fName` = `_fName`, 
    `lName` = `_lName`, 
    `uName` = `_uName`, 
    `email` =`_email`, 
    `psHashed` = `_psHashed`, 
    `userBio` = `_userBio` , 
    `userAvatar` = `_userAvatar`;
    SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `insertPage`(
	IN `_lastModified` TIMESTAMP,
	IN `_content` LONGTEXT CHARSET utf8mb4,
    IN `_projID` INT UNSIGNED,
    IN `_pageNum` INT UNSIGNED,
    IN `_topID` INT UNSIGNED 
)
    NO SQL
    SQL SECURITY INVOKER
BEGIN
INSERT INTO `se265sum17group2`.`pages`
SET  
 `projID` = `_projID` ,
 `topID` = `_topID` ,
 `pageNum` = `_pageNum` ,
 `content` = `_content` ,
 `lastModified` = `_lastModified`;
 SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `insertProject`( 
    IN `_ownerID` INT UNSIGNED,
    IN `_projTitle` VARCHAR( 60 ) CHARSET utf8mb4,
    IN `_public` TINYINT( 1 ) UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
BEGIN
INSERT INTO `se265sum17group2`.projects
SET  
 `ownerID` = `_ownerID` ,
 `projTitle` = `_projTitle` ,
 `public` = `_public`;
 SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `insertQuestion`(
IN `_tempID` INT UNSIGNED,
IN `_relevant` TINYINT( 1 ) UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
BEGIN
INSERT INTO `se265sum17group2`.questions
SET  `tempID` = `_tempID` ,
 `relevant` = `_relevant`;
 SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `insertQuestionWord`( 
    IN `_wordID` INT UNSIGNED, 
    IN `_questionID` INT UNSIGNED, 
    IN `_wordPosition` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
BEGIN
INSERT INTO `se265sum17group2`.question_words
SET  
 `wordID` = `_wordID` ,
 `questionID` = `_questionID` ,
 `wordPosition` = `_wordPosition`;
 SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `insertTemplate`(
IN `_catID` INT UNSIGNED,
IN `_varCnt` INT UNSIGNED,
IN `_template` VARCHAR( 100 ) CHARSET utf8mb4
)
    NO SQL
    SQL SECURITY INVOKER
BEGIN
INSERT INTO `se265sum17group2`.question_templates
SET  
 `catID` = `_catID` ,
 `template` = `_template` ,
 `varCnt` = `_varCnt`;
 SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `insertTopic`(
IN `_topTitle` VARCHAR(60) CHARSET utf8mb4,
IN `_catID` INT UNSIGNED,
IN `_relevant` TINYINT(1) UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
BEGIN
INSERT INTO `se265sum17group2`.`topics`
SET
 `catID` = `_catID` ,
 `topTitle` = `_topTitle` ,
 `relevant` = `_relevant`;
 SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `insertWord`( 
    IN `_topID` INT UNSIGNED,
    IN `_wordStr` VARCHAR( 60 ) CHARSET utf8mb4,
    IN `_plural` TINYINT( 1 ) UNSIGNED 
)
    NO SQL
    SQL SECURITY INVOKER
BEGIN
INSERT INTO `se265sum17group2`.`topic_words`
SET
 `topID` = `_topID` ,
 `wordStr` = `_wordStr` ,
 `plural` = `_plural`;
 SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `insertWordInstance`( 
    IN `_wordID` INT UNSIGNED,
    IN `_pageID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
BEGIN
INSERT INTO `se265sum17group2`.`word_instance`
SET
 `wordID` = `_wordID` ,
 `pageID` = `_pageID`;
 SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updateCategory`( 
    IN `_catID` INT UNSIGNED,
    IN `_catName` VARCHAR( 60 ) CHARSET utf8mb4,
    IN `_catAbbrev` CHAR( 3 ) CHARSET utf8mb4
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `word_categories`
SET
 `catName` = `_catName` ,
 `catAbbrev` = `_catAbbrev`
WHERE `catID` = `_catID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updateMessage`(
    IN `_messageID` INT UNSIGNED,
    IN `_email` VARCHAR(60) CHARSET utf8mb4,
    IN `_subject` VARCHAR(100) CHARSET utf8mb4, 
    IN `_message` TEXT CHARSET utf8mb4, 
    IN `_userID` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `messages`
SET  
 `email` =`_email` ,
 `subject` = `_subject` ,
 `message` = `_message` ,
 `userID` = `_userID`
WHERE `messageID` = `_messageID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updatePage`(
    IN `_pageID` INT UNSIGNED,
	IN `_lastModified` TIMESTAMP,
	IN `_content` LONGTEXT CHARSET utf8mb4,
    IN `_projID` INT UNSIGNED,
    IN `_pageNum` INT UNSIGNED,
    IN `_topID` INT UNSIGNED 
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `pages`
SET  
 `projID` = `_projID` ,
 `topID` = `_topID` ,
 `pageNum` = `_pageNum` ,
 `content` = `_content` ,
 `lastModified` = `_lastModified`
WHERE `pageID` = `_pageID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updatePageContent`(
    IN `_pageID` INT UNSIGNED,
	IN `_content` LONGTEXT CHARSET utf8mb4,
	IN `_lastModified` TIMESTAMP
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `pages`
SET  
 `content` = `_content` ,
 `lastModified` = `_lastModified`
WHERE `pageID` = `_pageID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updatePageNumber`(
    IN `_pageID` INT UNSIGNED,
	IN `_pageNum` INT UNSIGNED,
	IN `_lastModified` TIMESTAMP
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `pages`
SET  
 `pageNum` = `_pageNum` ,
 `lastModified` = `_lastModified`
WHERE `pageID` = `_pageID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updatePageTopic`(
    IN `_pageID` INT UNSIGNED,
    IN `_topID` INT UNSIGNED,
	IN `_lastModified` TIMESTAMP
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `pages`
SET  
 `topID` = `_topID` ,
 `lastModified` = `_lastModified`
WHERE `pageID` = `_pageID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updateProject`( 
    IN `_projID` INT UNSIGNED,
    IN `@ownerID` INT UNSIGNED,
    IN `@projTitle` VARCHAR( 60 ) CHARSET utf8mb4,
    IN `_public` TINYINT( 1 ) UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `projects`
SET  
 `ownerID` = `_ownerID` ,
 `projTitle` = `_projTitle` ,
 `public` = `_public`
WHERE `projID` = `_projID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updateProjectPublicState`(
    IN `_projID` INT UNSIGNED,
	IN `_public` TINYINT( 1 ) UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `projects`
SET  
 `public` = `_public`
WHERE `projID` = `_projID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updateQuestion`(
    IN `_questionID` INT UNSIGNED,
	IN `_tempID` INT UNSIGNED,
	IN `_relevant` TINYINT( 1 ) UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `questions`
SET  
 `tempID` = `_ownerID` ,
 `relevant` = `_relevant`
WHERE `questionID` = `_questionID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updateQuestionRelevantState`(
    IN `_questionID` INT UNSIGNED,
	IN `_relevant` TINYINT( 1 ) UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `questions`
SET  
 `relevant` = `_relevant`
WHERE `questionID` = `_questionID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updateQuestionWord`( 
    IN `_questionID` INT UNSIGNED,
    IN `_wordID` INT UNSIGNED, 
    IN `@wordPosition` INT UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `question_words`
SET  
 `wordID` = `_wordID` ,
 `wordPosition` = `_wordPosition`
WHERE `questionID` = `_questionID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updateTemplate`(
    IN `_tempID` INT UNSIGNED,
	IN `_catID` INT UNSIGNED,
	IN `_varCnt` INT UNSIGNED,
	IN `_template` VARCHAR( 100 ) CHARSET utf8mb4
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `question_templates`
SET  
 `catID` = `_catID` ,
 `template` = `_template` ,
 `varCnt` = `_varCnt`
WHERE `tempID` = `_tempID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updateTopic`(
    IN `_topID` INT UNSIGNED,
	IN `_topTitle` VARCHAR( 60 ) CHARSET utf8mb4,
    IN `_catID` INT UNSIGNED,
    IN `_relevant` TINYINT( 1 ) UNSIGNED 
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `topics`
SET  
 `catID` = `_catID` ,
 `topTitle` = `_topTitle` ,
 `relevant` = `_relevant`
WHERE `topID` = `_topID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updateTopicRelevantState`(
    IN `_topID` INT UNSIGNED,
	IN `_relevant` TINYINT( 1 ) UNSIGNED
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `questions`
SET  
 `relevant` = `_relevant`
WHERE `topID` = `_topID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updateUser`(
IN `_userID` INT UNSIGNED,
IN `_fName` VARCHAR(60) CHARSET utf8mb4,
IN `_lName` VARCHAR(60) CHARSET utf8mb4,
IN `_uName` VARCHAR(60) CHARSET utf8mb4,
IN `_email` VARCHAR(60) CHARSET utf8mb4,
IN `_psHashed` VARCHAR(60) CHARSET utf8mb4,
IN `_userBio` VARCHAR(60) CHARSET utf8mb4,
IN `_userAvatar` VARCHAR(30) CHARSET utf8mb4
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `users`
SET  
 `fName` = `_fName` ,
 `lName` = `_lName` ,
 `uName` = `_uName` ,
 `email` =`_email` ,
 `psHashed` = `_psHashed` ,
 `userBio` = `_userBio` ,
 `userAvatar` = `_userAvatar`
WHERE `userID` = `_userID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updateUserAdminState`(
IN `_userID` INT UNSIGNED,
IN `_admin` BOOLEAN
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `users` 
SET  
 `admin` = `_admin`
WHERE  `userID` = `_userID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updateUserPassword`(
IN `_userID` INT UNSIGNED,
IN `_psHashed` VARCHAR(60) CHARSET utf8mb4
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `users` 
SET  
 `psHashed` = `_psHashed`  
WHERE  `userID` = `_userID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updateUserProfile`(
IN `_userID` INT UNSIGNED,
IN `_fName` VARCHAR(60) CHARSET utf8mb4,
IN `_lName` VARCHAR(60) CHARSET utf8mb4,
IN `_userBio` TEXT CHARSET utf8mb4,
IN `_userAvatar` VARCHAR(30) CHARSET utf8mb4
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `users` 
SET  
 `fName` = `_fName` ,
 `lName` = `_lName` ,
 `userBio` = `_userBio` ,
 `userAvatar` = `_userAvatar` 
WHERE  `userID` = `_userID`$$

CREATE DEFINER=`db_writer`@`localhost` PROCEDURE `updateWord`( 
    IN `_wordID` INT UNSIGNED,
    IN `_topID` INT UNSIGNED,
    IN `_wordStr` VARCHAR( 60 ) CHARSET utf8mb4,
    IN `_plural` TINYINT( 1 ) UNSIGNED 
)
    NO SQL
    SQL SECURITY INVOKER
UPDATE `topic_words`
SET
 `topID` = `_topID` ,
 `wordStr` = `_wordStr` ,
 `plural` = `_plural`
WHERE `wordID` = `_wordID`$$

DELIMITER ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
