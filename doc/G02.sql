-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: us-cdbr-east-04.cleardb.com    Database: heroku_e1ed76e52e9027a
-- ------------------------------------------------------
-- Server version	5.6.50-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `economy`
--

DROP TABLE IF EXISTS `economy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `economy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `coins` bigint(20) unsigned DEFAULT '1000',
  `bank` bigint(20) unsigned DEFAULT '0',
  `storage` char(100) COLLATE utf8mb4_unicode_ci DEFAULT '{"普通石頭" : 0, "鐵礦" : 0, "金條" : 0, "鑽石" : 0}',
  PRIMARY KEY (`id`),
  KEY `economy_fk_idx` (`uid`),
  CONSTRAINT `economy_fk` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=475 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `economy`
--

LOCK TABLES `economy` WRITE;
/*!40000 ALTER TABLE `economy` DISABLE KEYS */;
INSERT INTO `economy` VALUES (255,255,400,175,'{\"普通石頭\":0,\"鐵礦\":36,\"金條\":4,\"鑽石\":0}'),(265,265,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(275,275,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(285,285,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(295,295,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(305,305,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(315,315,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(325,325,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(335,335,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(345,345,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(355,355,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(365,365,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(375,375,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(385,385,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(395,395,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(405,405,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(415,415,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(425,425,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(435,435,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(445,445,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(455,455,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}'),(465,465,1000,0,'{\"普通石頭\" : 0, \"鐵礦\" : 0, \"金條\" : 0, \"鑽石\" : 0}');
/*!40000 ALTER TABLE `economy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timeout`
--

DROP TABLE IF EXISTS `timeout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timeout` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `command_name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timeout` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `timeout_fk_idx` (`uid`),
  CONSTRAINT `timeout_fk` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=535 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeout`
--

LOCK TABLES `timeout` WRITE;
/*!40000 ALTER TABLE `timeout` DISABLE KEYS */;
INSERT INTO `timeout` VALUES (375,255,'簽到',1622708936111),(475,255,'拉',1622622685364),(495,255,'挖',1622622783940),(505,255,'背包',1622622796900),(515,255,'賣',1622622849077),(525,255,'餘額',1622622885468);
/*!40000 ALTER TABLE `timeout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(45) DEFAULT NULL,
  `serverId` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=475 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (255,'451286310100140033','849221267134742549','阿摸欸'),(265,'490155000450777099','628271307951308841','LilE'),(275,'379945636100833280','628271307951308841','henrywangcoco'),(285,'568079855418212352','628271307951308841','IDKFYSB'),(295,'525992712025931779','628271307951308841','TweIII'),(305,'419721682157043714','490155502672674827','Annie'),(315,'490155000450777099','490155502672674827','LilE'),(325,'530754218672390166','490155502672674827','Pan'),(335,'530754218672390166','628271307951308841','Pan'),(345,'561599443820871720','628271307951308841','FongToe'),(355,'363702195243319297','628271307951308841','YUNCHI'),(365,'844403754694344714','490155502672674827','Amby'),(375,'561599443820871720','490155502672674827','FongToe'),(385,'817051487598936064','490155502672674827','hui0313'),(395,'791246328189157386','490155502672674827','ling1114'),(405,'553644754773082113','490155502672674827','阿傑'),(415,'379945636100833280','490155502672674827','henrywangcoco'),(425,'451286310100140033','490155502672674827','阿摸欸'),(435,'568079855418212352','490155502672674827','IDKFYSB'),(445,'846199291873460274','490155502672674827','斯科菲爾德'),(455,'475557589963505684','490155502672674827','White'),(465,'360757698750316546','490155502672674827','UUU');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-14  8:53:24
