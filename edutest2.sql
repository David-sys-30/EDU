-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.6.34-log - MySQL Community Server (GPL)
-- SO del servidor:              Win32
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para edutest2
DROP DATABASE IF EXISTS `edutest2`;
CREATE DATABASE IF NOT EXISTS `edutest2` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `edutest2`;

-- Volcando estructura para tabla edutest2.administrador
DROP TABLE IF EXISTS `administrador`;
CREATE TABLE IF NOT EXISTS `administrador` (
  `idAdministrador` int(11) NOT NULL AUTO_INCREMENT,
  `nombreAdministrador` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apellidopaternoAdministrador` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apellidomaternoAdministrador` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `correoAdministrador` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `telefonoAdministrador` bigint(11) DEFAULT NULL,
  `contrasenaAdministrador` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `imagenAdministrador` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `statusAdministrador` int(1) DEFAULT NULL,
  PRIMARY KEY (`idAdministrador`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.administrador: ~2 rows (aproximadamente)
DELETE FROM `administrador`;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` (`idAdministrador`, `nombreAdministrador`, `apellidopaternoAdministrador`, `apellidomaternoAdministrador`, `correoAdministrador`, `telefonoAdministrador`, `contrasenaAdministrador`, `imagenAdministrador`, `statusAdministrador`) VALUES
	(1, 'Gerardo', 'Zamudio', 'Gonzalez', 'prueba@prueba.com', 5545173204, 'prueba', '1-charmander.jpg', 1),
	(2, 'prueba', 'prueba', 'prueba', 'bonita@bonita.com', 565, 'bonita', 'default.png', 1);
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.califcurso
DROP TABLE IF EXISTS `califcurso`;
CREATE TABLE IF NOT EXISTS `califcurso` (
  `idCalifCurso` int(255) NOT NULL AUTO_INCREMENT,
  `idUsuarioPersonaCurso_CalifCurso` int(255) DEFAULT NULL,
  `califCurso` double(255,2) DEFAULT NULL,
  PRIMARY KEY (`idCalifCurso`) USING BTREE,
  KEY `idUsuPer_CalifCurso` (`idUsuarioPersonaCurso_CalifCurso`) USING BTREE,
  CONSTRAINT `califcurso_ibfk_1` FOREIGN KEY (`idUsuarioPersonaCurso_CalifCurso`) REFERENCES `usuariopersonacurso` (`idUsuarioPersonaCurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.califcurso: ~0 rows (aproximadamente)
DELETE FROM `califcurso`;
/*!40000 ALTER TABLE `califcurso` DISABLE KEYS */;
INSERT INTO `califcurso` (`idCalifCurso`, `idUsuarioPersonaCurso_CalifCurso`, `califCurso`) VALUES
	(1, 6, 0.50);
/*!40000 ALTER TABLE `califcurso` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.califmaterial
DROP TABLE IF EXISTS `califmaterial`;
CREATE TABLE IF NOT EXISTS `califmaterial` (
  `idCalifMaterial` int(255) NOT NULL AUTO_INCREMENT,
  `idMaterialEvalUsuario_CalifMaterial` int(255) DEFAULT NULL,
  `califMaterial` int(255) DEFAULT NULL,
  PRIMARY KEY (`idCalifMaterial`) USING BTREE,
  KEY `idEvalMaterial` (`idMaterialEvalUsuario_CalifMaterial`) USING BTREE,
  CONSTRAINT `idEvalMaterial` FOREIGN KEY (`idMaterialEvalUsuario_CalifMaterial`) REFERENCES `materialevalusuario` (`idMaterialevalusuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.califmaterial: ~0 rows (aproximadamente)
DELETE FROM `califmaterial`;
/*!40000 ALTER TABLE `califmaterial` DISABLE KEYS */;
/*!40000 ALTER TABLE `califmaterial` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.califmodulo
DROP TABLE IF EXISTS `califmodulo`;
CREATE TABLE IF NOT EXISTS `califmodulo` (
  `idCalifModulo` int(255) NOT NULL AUTO_INCREMENT,
  `idEvaluacionModulo_CalifModulo` int(255) DEFAULT NULL,
  `califModulo` float(255,2) DEFAULT NULL,
  PRIMARY KEY (`idCalifModulo`) USING BTREE,
  KEY `idEvalModulo` (`idEvaluacionModulo_CalifModulo`) USING BTREE,
  CONSTRAINT `califmodulo_ibfk_1` FOREIGN KEY (`idEvaluacionModulo_CalifModulo`) REFERENCES `evaluacionmodulo` (`idEvaluacionmodulo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=561 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.califmodulo: ~0 rows (aproximadamente)
DELETE FROM `califmodulo`;
/*!40000 ALTER TABLE `califmodulo` DISABLE KEYS */;
INSERT INTO `califmodulo` (`idCalifModulo`, `idEvaluacionModulo_CalifModulo`, `califModulo`) VALUES
	(560, 3, 2.00);
/*!40000 ALTER TABLE `califmodulo` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.califtema
DROP TABLE IF EXISTS `califtema`;
CREATE TABLE IF NOT EXISTS `califtema` (
  `idCalifTema` int(255) NOT NULL AUTO_INCREMENT,
  `idEvaluacionTema_CalifTema` int(255) DEFAULT NULL,
  `califTema` float(255,2) DEFAULT NULL,
  PRIMARY KEY (`idCalifTema`) USING BTREE,
  KEY `idEvalTema` (`idEvaluacionTema_CalifTema`) USING BTREE,
  CONSTRAINT `califtema_ibfk_1` FOREIGN KEY (`idEvaluacionTema_CalifTema`) REFERENCES `evaluaciontema` (`idEvaluaciontema`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.califtema: ~2 rows (aproximadamente)
DELETE FROM `califtema`;
/*!40000 ALTER TABLE `califtema` DISABLE KEYS */;
INSERT INTO `califtema` (`idCalifTema`, `idEvaluacionTema_CalifTema`, `califTema`) VALUES
	(17, 4, 0.00),
	(18, 5, 0.00),
	(19, 6, 5.00);
/*!40000 ALTER TABLE `califtema` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.cambiopass
DROP TABLE IF EXISTS `cambiopass`;
CREATE TABLE IF NOT EXISTS `cambiopass` (
  `idCambioPass` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) DEFAULT NULL,
  `fechaCadLink` date DEFAULT NULL,
  `codCambioPass` varchar(255) DEFAULT NULL,
  `statusLink` int(11) DEFAULT NULL,
  `usuPer` int(5) DEFAULT NULL,
  PRIMARY KEY (`idCambioPass`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla edutest2.cambiopass: ~4 rows (aproximadamente)
DELETE FROM `cambiopass`;
/*!40000 ALTER TABLE `cambiopass` DISABLE KEYS */;
INSERT INTO `cambiopass` (`idCambioPass`, `idUsuario`, `fechaCadLink`, `codCambioPass`, `statusLink`, `usuPer`) VALUES
	(1, 1, '2019-11-14', 'gRqJxXqjzyVTUaewOggXJEJT', 0, 1),
	(2, 4, '2019-11-15', 'RxmCcwxoGrLuIjoOOqynVQnV', 1, 1),
	(3, 4, '2019-11-18', 'QTZrkToMZFhaOIocztrZOPcg', 0, 1),
	(4, 4, '2019-11-19', 'hYJpHbItrdXRujbmacJCIuaJ', 0, 1);
/*!40000 ALTER TABLE `cambiopass` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.catalogoespecialidad
DROP TABLE IF EXISTS `catalogoespecialidad`;
CREATE TABLE IF NOT EXISTS `catalogoespecialidad` (
  `idCatalogoespecialidad` int(3) NOT NULL AUTO_INCREMENT,
  `descripcionCatalogoespecialidad` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idCatalogoespecialidad`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.catalogoespecialidad: ~3 rows (aproximadamente)
DELETE FROM `catalogoespecialidad`;
/*!40000 ALTER TABLE `catalogoespecialidad` DISABLE KEYS */;
INSERT INTO `catalogoespecialidad` (`idCatalogoespecialidad`, `descripcionCatalogoespecialidad`) VALUES
	(1, 'Programador'),
	(2, 'Diseñador Grafico'),
	(3, 'Test tul');
/*!40000 ALTER TABLE `catalogoespecialidad` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.catalogoespecialidadpersona
DROP TABLE IF EXISTS `catalogoespecialidadpersona`;
CREATE TABLE IF NOT EXISTS `catalogoespecialidadpersona` (
  `idCatalogoespecialidadPersona` int(5) NOT NULL AUTO_INCREMENT,
  `idCatalogoespecialidad_CatalogoespecialidadPersona` int(3) DEFAULT NULL,
  `idPersona_CatalogoespecialidadPersona` int(4) DEFAULT NULL,
  PRIMARY KEY (`idCatalogoespecialidadPersona`) USING BTREE,
  KEY `idCatalogoespecialidad_CatalogoespecialidadPersona` (`idCatalogoespecialidad_CatalogoespecialidadPersona`) USING BTREE,
  KEY `idPersona_CatalogoespecialidadPersona` (`idPersona_CatalogoespecialidadPersona`) USING BTREE,
  CONSTRAINT `idCatalogoespecialidad_CatalogoespecialidadPersona` FOREIGN KEY (`idCatalogoespecialidad_CatalogoespecialidadPersona`) REFERENCES `catalogoespecialidad` (`idCatalogoespecialidad`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idPersona_CatalogoespecialidadPersona` FOREIGN KEY (`idPersona_CatalogoespecialidadPersona`) REFERENCES `persona` (`idPersona`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.catalogoespecialidadpersona: ~7 rows (aproximadamente)
DELETE FROM `catalogoespecialidadpersona`;
/*!40000 ALTER TABLE `catalogoespecialidadpersona` DISABLE KEYS */;
INSERT INTO `catalogoespecialidadpersona` (`idCatalogoespecialidadPersona`, `idCatalogoespecialidad_CatalogoespecialidadPersona`, `idPersona_CatalogoespecialidadPersona`) VALUES
	(1, 1, 1),
	(2, 1, 2),
	(3, 2, 3),
	(4, 3, 4),
	(5, 2, 5),
	(6, 1, 6),
	(7, 2, 7);
/*!40000 ALTER TABLE `catalogoespecialidadpersona` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.categoriaaprendizaje
DROP TABLE IF EXISTS `categoriaaprendizaje`;
CREATE TABLE IF NOT EXISTS `categoriaaprendizaje` (
  `idCategoriaaprendizaje` int(4) NOT NULL AUTO_INCREMENT,
  `descripcionCategoriaaprendizaje` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idCategoriaaprendizaje`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.categoriaaprendizaje: ~0 rows (aproximadamente)
DELETE FROM `categoriaaprendizaje`;
/*!40000 ALTER TABLE `categoriaaprendizaje` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoriaaprendizaje` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.categoriaaprendizajecurso
DROP TABLE IF EXISTS `categoriaaprendizajecurso`;
CREATE TABLE IF NOT EXISTS `categoriaaprendizajecurso` (
  `idCategoriaaprendizajeCurso` int(11) NOT NULL AUTO_INCREMENT,
  `idCurso_CategoriaaprendizajeCurso` int(8) DEFAULT NULL,
  `descripcionCategoriaaprendizajeCurso` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idCategoriaaprendizajeCurso`) USING BTREE,
  KEY `idCurso_CategoriaaprendizajeCurso` (`idCurso_CategoriaaprendizajeCurso`) USING BTREE,
  CONSTRAINT `idCurso_CategoriaaprendizajeCurso` FOREIGN KEY (`idCurso_CategoriaaprendizajeCurso`) REFERENCES `curso` (`idCurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.categoriaaprendizajecurso: ~13 rows (aproximadamente)
DELETE FROM `categoriaaprendizajecurso`;
/*!40000 ALTER TABLE `categoriaaprendizajecurso` DISABLE KEYS */;
INSERT INTO `categoriaaprendizajecurso` (`idCategoriaaprendizajeCurso`, `idCurso_CategoriaaprendizajeCurso`, `descripcionCategoriaaprendizajeCurso`) VALUES
	(3, 2, 'Uso del lenguaje PHP'),
	(4, 2, 'Creación de servicios con PHP'),
	(12, 8, 'hjk'),
	(14, 1, 'conectar fron con back end'),
	(15, 9, 'q'),
	(16, 10, 'Planeación de proyectos'),
	(17, 10, 'Administración de recursos materiales, financieros y humanos'),
	(18, 10, 'Manejo de conflictos'),
	(19, 10, 'Monitoreo y control de proyectos'),
	(20, 10, 'Administración de riesgos'),
	(21, 11, 'asds'),
	(22, 11, 'asdxdsa'),
	(23, 11, 'd');
/*!40000 ALTER TABLE `categoriaaprendizajecurso` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.categoriacontenido
DROP TABLE IF EXISTS `categoriacontenido`;
CREATE TABLE IF NOT EXISTS `categoriacontenido` (
  `idCategoriacontenido` int(1) NOT NULL AUTO_INCREMENT,
  `nombreCategoriacontenido` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idCategoriacontenido`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.categoriacontenido: ~4 rows (aproximadamente)
DELETE FROM `categoriacontenido`;
/*!40000 ALTER TABLE `categoriacontenido` DISABLE KEYS */;
INSERT INTO `categoriacontenido` (`idCategoriacontenido`, `nombreCategoriacontenido`) VALUES
	(1, 'video'),
	(2, 'documento'),
	(3, 'practica'),
	(4, 'proyecto');
/*!40000 ALTER TABLE `categoriacontenido` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.categoriacurso
DROP TABLE IF EXISTS `categoriacurso`;
CREATE TABLE IF NOT EXISTS `categoriacurso` (
  `idCategoriacurso` int(2) NOT NULL AUTO_INCREMENT,
  `nombreCategoriacurso` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `statusCategoriacurso` int(5) DEFAULT NULL,
  PRIMARY KEY (`idCategoriacurso`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.categoriacurso: ~12 rows (aproximadamente)
DELETE FROM `categoriacurso`;
/*!40000 ALTER TABLE `categoriacurso` DISABLE KEYS */;
INSERT INTO `categoriacurso` (`idCategoriacurso`, `nombreCategoriacurso`, `statusCategoriacurso`) VALUES
	(1, 'Programación', 1),
	(2, 'Diseño', 1),
	(3, 'Administración', 1),
	(4, 'prueba2', 1),
	(5, 'prueba3', 1),
	(6, 'prueba4', 0),
	(7, 'prueba 26', 1),
	(8, 'Procesos', 1),
	(9, 'kkuj', 1),
	(10, 'Ahnuma', 1),
	(11, 'Pedrolhm', 1),
	(12, 'hgvx', 1);
/*!40000 ALTER TABLE `categoriacurso` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.cobro
DROP TABLE IF EXISTS `cobro`;
CREATE TABLE IF NOT EXISTS `cobro` (
  `idCobro` int(13) NOT NULL AUTO_INCREMENT,
  `idTipotarjeta_Cobro` int(1) DEFAULT NULL,
  `numerotarjetaCobro` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fechavencimientoCobro` date DEFAULT NULL,
  `cvvCobro` int(4) DEFAULT NULL,
  PRIMARY KEY (`idCobro`) USING BTREE,
  KEY `idTipotarjeta_Cobro` (`idTipotarjeta_Cobro`) USING BTREE,
  CONSTRAINT `idTipotarjeta_Cobro` FOREIGN KEY (`idTipotarjeta_Cobro`) REFERENCES `tipotarjeta` (`idTipotarjeta`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.cobro: ~0 rows (aproximadamente)
DELETE FROM `cobro`;
/*!40000 ALTER TABLE `cobro` DISABLE KEYS */;
/*!40000 ALTER TABLE `cobro` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.cobrousuariocurso
DROP TABLE IF EXISTS `cobrousuariocurso`;
CREATE TABLE IF NOT EXISTS `cobrousuariocurso` (
  `idCobroUsuarioCurso` int(13) NOT NULL AUTO_INCREMENT,
  `idCobro_CobroUsuarioCurso` int(13) DEFAULT NULL,
  `idUsuarioPersonaCurso` int(13) DEFAULT NULL,
  PRIMARY KEY (`idCobroUsuarioCurso`) USING BTREE,
  KEY `idCobro_CobroUsuarioPersonaCurso` (`idCobro_CobroUsuarioCurso`) USING BTREE,
  KEY `idUsuarioPersonaCurso` (`idUsuarioPersonaCurso`) USING BTREE,
  CONSTRAINT `idCobro_CobroUsuarioPersonaCurso` FOREIGN KEY (`idCobro_CobroUsuarioCurso`) REFERENCES `cobro` (`idCobro`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idUsuarioPersonaCurso` FOREIGN KEY (`idUsuarioPersonaCurso`) REFERENCES `usuariopersonacurso` (`idUsuarioPersonaCurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.cobrousuariocurso: ~0 rows (aproximadamente)
DELETE FROM `cobrousuariocurso`;
/*!40000 ALTER TABLE `cobrousuariocurso` DISABLE KEYS */;
/*!40000 ALTER TABLE `cobrousuariocurso` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.contenido
DROP TABLE IF EXISTS `contenido`;
CREATE TABLE IF NOT EXISTS `contenido` (
  `idContenido` int(15) NOT NULL AUTO_INCREMENT,
  `idCategoriacontenido_Contenido` int(1) DEFAULT NULL,
  `nombreContenido` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idFormatodocumento_Contenido` int(2) DEFAULT NULL,
  `rutaContenido` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idTema_Contenido` int(20) DEFAULT NULL,
  `statusContenido` int(1) DEFAULT NULL,
  PRIMARY KEY (`idContenido`) USING BTREE,
  KEY `idFormatodocumento_Contenido` (`idFormatodocumento_Contenido`) USING BTREE,
  KEY `idCategoriacontenido_Contenido` (`idCategoriacontenido_Contenido`) USING BTREE,
  KEY `idTema_Contenido` (`idTema_Contenido`) USING BTREE,
  CONSTRAINT `idCategoriacontenido_Contenido` FOREIGN KEY (`idCategoriacontenido_Contenido`) REFERENCES `categoriacontenido` (`idCategoriacontenido`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idFormatodocumento_Contenido` FOREIGN KEY (`idFormatodocumento_Contenido`) REFERENCES `formatodocumento` (`idFormatodocumento`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idTema_Contenido` FOREIGN KEY (`idTema_Contenido`) REFERENCES `tema` (`idTema`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.contenido: ~27 rows (aproximadamente)
DELETE FROM `contenido`;
/*!40000 ALTER TABLE `contenido` DISABLE KEYS */;
INSERT INTO `contenido` (`idContenido`, `idCategoriacontenido_Contenido`, `nombreContenido`, `idFormatodocumento_Contenido`, `rutaContenido`, `idTema_Contenido`, `statusContenido`) VALUES
	(1, 1, 'Fedelobo', 1, 'https://www.youtube.com/embed/Q6xzL2fUBaU', 2, 1),
	(2, 2, 'Aviso de privacida', 4, '2-1_22I1ecGbrdPjGuKYTvkdWw.png', 2, 1),
	(3, 3, 'Actividad 3', 4, '3-arbol.png', 2, 1),
	(4, 4, 'proyecto test', 2, '4-Gerardo Zamudio CV.docx', 2, 1),
	(5, 4, 'nombre Modificado', 3, '5-Actividades Semanales 05:10:2018.xlsx', 2, 1),
	(6, 3, 'Plan Gerardo', 3, '6-Plan_Gera.xlsx', 2, 1),
	(7, 1, 'goku vs kefla', 1, 'https://www.youtube.com/embed/VLXGrD1l9b8', 2, 1),
	(8, 3, 'test', 3, '8-6-Plan_Gera.xlsx', 1, 1),
	(9, 4, 'Prueba', 5, '9-_CRM_PDF.pdf', 1, 1),
	(10, 4, 'in', 6, '10-B5121F99210B41ECABFB9C45DEA9DBAE.jpg', 1, 1),
	(11, 3, 'yh', 3, '11-Actividades Semanales.xlsx', 5, 1),
	(12, 1, 'Video uno', 1, 'https://www.youtube.com/embed/8xWhVn5Ny38', 5, 1),
	(13, 1, 'jjkj', 1, 'https://www.youtube.com/embed/y7eBbxzEHn0', 5, 1),
	(14, 2, 'k', 7, '14-loading.gif', 2, 1),
	(15, 1, 'Introduccion a php', 1, 'https://www.youtube.com/embed/UAW7tGAgew4', 6, 1),
	(16, 1, 'Tema uno', 1, 'https://www.youtube.com/embed/8fvVLfDavzM', 4, 1),
	(17, 3, 'Tarea uno', 2, '17-Evidencias_semanales_07:12:18.docx', 4, 1),
	(18, 3, 'Ejercicio 1', 5, '18-EJERCICIO  001.pdf', 9, 1),
	(19, 3, 'Ejercicio 2', 5, '19-EJERCICIO  002.pdf', 10, 1),
	(20, 3, 'Ejercicio 3', 5, '20-EJERCICIO  003.pdf', 11, 1),
	(21, 2, 'Lectura', 5, '21-MIT_Whitepaper-MIT_Style_of_Leadership.pdf', 9, 1),
	(22, 1, 'i Ran', 1, 'https://www.youtube.com/embed/iIpfWORQWhU', 4, 1),
	(23, 3, 'mn', 2, '23-17-Evidencias_semanales_07_12_18.docx', 4, 1),
	(24, 1, 'Adm', 1, 'https://www.youtube.com/embed/9itwt_opsvQ', 9, 1),
	(25, 1, 'Something', 1, 'https://www.youtube.com/embed/UelDrZ1aFeY', 10, 1),
	(26, 2, 'Actividad2', 2, '26-Actividades y habilidades.docx', 10, 1),
	(27, 3, 'excel prueba', 3, '27-SI SOL 2018 TANYA.xlsx', 18, 1);
/*!40000 ALTER TABLE `contenido` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.conversacion
DROP TABLE IF EXISTS `conversacion`;
CREATE TABLE IF NOT EXISTS `conversacion` (
  `idConversacion` int(4) NOT NULL AUTO_INCREMENT,
  `idPersona` int(4) DEFAULT NULL,
  `idUsuario` int(4) DEFAULT NULL,
  `idCurso` int(4) DEFAULT NULL,
  PRIMARY KEY (`idConversacion`) USING BTREE,
  KEY `personatoconver` (`idPersona`) USING BTREE,
  KEY `usuariotoconver` (`idUsuario`) USING BTREE,
  CONSTRAINT `fkpersonas` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`idPersona`),
  CONSTRAINT `fkusuarios` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.conversacion: ~0 rows (aproximadamente)
DELETE FROM `conversacion`;
/*!40000 ALTER TABLE `conversacion` DISABLE KEYS */;
INSERT INTO `conversacion` (`idConversacion`, `idPersona`, `idUsuario`, `idCurso`) VALUES
	(1, 1, 1, 10);
/*!40000 ALTER TABLE `conversacion` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.converusuario
DROP TABLE IF EXISTS `converusuario`;
CREATE TABLE IF NOT EXISTS `converusuario` (
  `idConverUser` int(4) NOT NULL AUTO_INCREMENT,
  `idUsuarioE` int(4) DEFAULT NULL,
  `idUsuarioR` int(4) DEFAULT NULL,
  `idCurso` int(4) DEFAULT NULL,
  PRIMARY KEY (`idConverUser`) USING BTREE,
  KEY `fkuserreceptor` (`idUsuarioR`) USING BTREE,
  KEY `fkuseremisor` (`idUsuarioE`) USING BTREE,
  CONSTRAINT `fkuseremisor` FOREIGN KEY (`idUsuarioE`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `fkuserreceptor` FOREIGN KEY (`idUsuarioR`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla edutest2.converusuario: ~0 rows (aproximadamente)
DELETE FROM `converusuario`;
/*!40000 ALTER TABLE `converusuario` DISABLE KEYS */;
INSERT INTO `converusuario` (`idConverUser`, `idUsuarioE`, `idUsuarioR`, `idCurso`) VALUES
	(6, 4, 1, 10);
/*!40000 ALTER TABLE `converusuario` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.curso
DROP TABLE IF EXISTS `curso`;
CREATE TABLE IF NOT EXISTS `curso` (
  `idCurso` int(8) NOT NULL AUTO_INCREMENT,
  `idTipocurso_Curso` int(2) DEFAULT NULL,
  `idSubcategoriacurso_Curso` int(2) DEFAULT NULL,
  `nombreCurso` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `resumenCurso` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `descripcionCurso` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dirigidoCurso` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `imagenCurso` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `costoCurso` float(7,2) DEFAULT NULL,
  `statusCurso` int(1) DEFAULT NULL,
  `urlpresentacionCurso` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idCurso`) USING BTREE,
  KEY `idSubcategoriacurso_Curso` (`idSubcategoriacurso_Curso`) USING BTREE,
  KEY `idTipocurso_curso` (`idTipocurso_Curso`) USING BTREE,
  CONSTRAINT `idSubcategoriacurso_Curso` FOREIGN KEY (`idSubcategoriacurso_Curso`) REFERENCES `subcategoriacurso` (`idSubcategoriacurso`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idTipocurso_curso` FOREIGN KEY (`idTipocurso_Curso`) REFERENCES `tipocurso` (`idTipocurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.curso: ~6 rows (aproximadamente)
DELETE FROM `curso`;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` (`idCurso`, `idTipocurso_Curso`, `idSubcategoriacurso_Curso`, `nombreCurso`, `resumenCurso`, `descripcionCurso`, `dirigidoCurso`, `imagenCurso`, `costoCurso`, `statusCurso`, `urlpresentacionCurso`) VALUES
	(1, 2, 1, 'Fundamentos de Node', 'Se le enseñara al alumno a Utilizar NodeJS para realizar proyectos de backend con conexion a una base de datos MySQL', 'En este curso obtendrás los conocimientos necesarios para utilizar Node.', 'Este curso esta dirigido a personas con conocimientos básicos de programación.', '1-1_22I1ecGbrdPjGuKYTvkdWw.png', 1500.00, 0, 'https://www.youtube.com/embed/BhvLIzVL8_o'),
	(2, 1, 2, 'Programación PHP', 'Se creara una aplicación usando PHP, CSS y Javascript para hacer consultas e inserción de datos', 'En este curso se va a crear una aplicación con php, la cual contara con inserciones a bases de datos y una vista con HTML.', 'Universitarios', '2-php.jpg', 130.00, 0, NULL),
	(8, 1, 14, 'fghjk', 'dfghjk', 'fghjkl', 'dfghjk', '8-787763.png', 345.00, 0, NULL),
	(9, 1, 1, 'Curso de motos', 'iuyuiy', 'bhbhbhb', 'a los bonitos', '9-71TGTeycPsL._SX425_.jpg', 0.00, 0, 'https://www.youtube.com/embed/DTjwoRdgbuw'),
	(10, 1, 12, 'Administración de Proyectos', 'El alumno conocerá las mejores practicas y herramientas para la administración eficiente y eficaz de proyectos.', 'Analizar la problemática general de la administración de proyectos y la responsabilidad del líder de proyecto. Conocer los procesos que se llevan a cabo para poder evaluar un proyecto de informática, aplicándolos a problemas reales, hasta poder decidir honestamente, sobre la posibilidad de realización de dichos proyectos. Conocer las diversas metodologías y herramientas computacionales para la administración de proyectos, logrando aplicarlas al ciclo de desarrollo de proyectos de informática.', 'Personas dedicadas o interesadas en la administración correcta de proyectos con experiencia en el proceso general de administración y/o con el interés de certificare en PMI, PRINCE2 y/o ISO/20 000', 'admin_proy.jpg', 0.00, 1, ''),
	(11, 1, 14, 'Curso Prueba Final', 'asdjnasdknk', 'asldjnaslkndmaslkkdnmaslnjdnasmkdnsalkj', 'dadsa', '11-1-Beedrill.png', 1500.00, 0, 'https://www.youtube.com/embed/OoHGZFyMCHU');
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.evaluacion
DROP TABLE IF EXISTS `evaluacion`;
CREATE TABLE IF NOT EXISTS `evaluacion` (
  `idEvaluacion` int(20) NOT NULL AUTO_INCREMENT,
  `idUsuarioPersonaCurso_Evaluacion` int(13) DEFAULT NULL,
  `instructorEvaluacion` float(3,2) DEFAULT NULL,
  `cursoEvaluacion` float(3,2) DEFAULT NULL,
  `plataformaEvaluacion` float(3,2) DEFAULT NULL,
  `comentarioEvaluacion` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idEvaluacion`) USING BTREE,
  KEY `idUsuarioPersonaCurso_Evaluacion` (`idUsuarioPersonaCurso_Evaluacion`) USING BTREE,
  CONSTRAINT `idUsuarioPersonaCurso_Evaluacion` FOREIGN KEY (`idUsuarioPersonaCurso_Evaluacion`) REFERENCES `usuariopersonacurso` (`idUsuarioPersonaCurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.evaluacion: ~4 rows (aproximadamente)
DELETE FROM `evaluacion`;
/*!40000 ALTER TABLE `evaluacion` DISABLE KEYS */;
INSERT INTO `evaluacion` (`idEvaluacion`, `idUsuarioPersonaCurso_Evaluacion`, `instructorEvaluacion`, `cursoEvaluacion`, `plataformaEvaluacion`, `comentarioEvaluacion`) VALUES
	(1, 6, 0.00, 3.00, 0.00, ''),
	(3, 7, 0.00, 5.00, 0.00, NULL),
	(4, 19, 0.00, 0.00, 0.00, ''),
	(5, 19, 0.00, 0.00, 0.00, '');
/*!40000 ALTER TABLE `evaluacion` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.evaluacioncontenido
DROP TABLE IF EXISTS `evaluacioncontenido`;
CREATE TABLE IF NOT EXISTS `evaluacioncontenido` (
  `idEvaluacioncontenido` int(15) NOT NULL AUTO_INCREMENT,
  `idContenido_Evaluacioncontenido` int(15) DEFAULT NULL,
  `porcentajeEvaluacioncontenido` float(5,2) DEFAULT NULL,
  PRIMARY KEY (`idEvaluacioncontenido`) USING BTREE,
  KEY `idContenido_Evaluacioncontenido` (`idContenido_Evaluacioncontenido`) USING BTREE,
  CONSTRAINT `idContenido_Evaluacioncontenido` FOREIGN KEY (`idContenido_Evaluacioncontenido`) REFERENCES `contenido` (`idContenido`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.evaluacioncontenido: ~14 rows (aproximadamente)
DELETE FROM `evaluacioncontenido`;
/*!40000 ALTER TABLE `evaluacioncontenido` DISABLE KEYS */;
INSERT INTO `evaluacioncontenido` (`idEvaluacioncontenido`, `idContenido_Evaluacioncontenido`, `porcentajeEvaluacioncontenido`) VALUES
	(1, 3, 20.00),
	(2, 4, 10.00),
	(3, 5, 50.00),
	(4, 6, 20.00),
	(5, 8, 100.00),
	(6, 9, 0.00),
	(7, 10, 0.00),
	(8, 11, 10.00),
	(9, 17, 0.00),
	(10, 18, 0.00),
	(11, 19, 0.00),
	(12, 20, 0.00),
	(13, 23, 0.00),
	(14, 27, 100.00);
/*!40000 ALTER TABLE `evaluacioncontenido` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.evaluacionmodulo
DROP TABLE IF EXISTS `evaluacionmodulo`;
CREATE TABLE IF NOT EXISTS `evaluacionmodulo` (
  `idEvaluacionmodulo` int(7) NOT NULL AUTO_INCREMENT,
  `evaluacionEvaluacionmodulo` int(3) DEFAULT NULL,
  `idModulo_Evaluacionmodulo` int(15) DEFAULT NULL,
  PRIMARY KEY (`idEvaluacionmodulo`) USING BTREE,
  KEY `idModulo_Evaluacionmodulo` (`idModulo_Evaluacionmodulo`) USING BTREE,
  CONSTRAINT `idModulo_Evaluacionmodulo` FOREIGN KEY (`idModulo_Evaluacionmodulo`) REFERENCES `modulo` (`idModulo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.evaluacionmodulo: ~8 rows (aproximadamente)
DELETE FROM `evaluacionmodulo`;
/*!40000 ALTER TABLE `evaluacionmodulo` DISABLE KEYS */;
INSERT INTO `evaluacionmodulo` (`idEvaluacionmodulo`, `evaluacionEvaluacionmodulo`, `idModulo_Evaluacionmodulo`) VALUES
	(1, 50, 6),
	(2, 30, 1),
	(3, 25, 14),
	(4, 25, 15),
	(5, 25, 16),
	(6, 25, 17),
	(7, 10, 5),
	(8, 10, 2);
/*!40000 ALTER TABLE `evaluacionmodulo` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.evaluaciontema
DROP TABLE IF EXISTS `evaluaciontema`;
CREATE TABLE IF NOT EXISTS `evaluaciontema` (
  `idEvaluaciontema` int(11) NOT NULL AUTO_INCREMENT,
  `evaluacionEvaluaciontema` int(3) DEFAULT NULL,
  `idTema_Evaluaciontema` int(20) DEFAULT NULL,
  PRIMARY KEY (`idEvaluaciontema`) USING BTREE,
  KEY `idTema_Evaluaciontema` (`idTema_Evaluaciontema`) USING BTREE,
  CONSTRAINT `idTema_Evaluaciontema` FOREIGN KEY (`idTema_Evaluaciontema`) REFERENCES `tema` (`idTema`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.evaluaciontema: ~15 rows (aproximadamente)
DELETE FROM `evaluaciontema`;
/*!40000 ALTER TABLE `evaluaciontema` DISABLE KEYS */;
INSERT INTO `evaluaciontema` (`idEvaluaciontema`, `evaluacionEvaluaciontema`, `idTema_Evaluaciontema`) VALUES
	(1, 50, 2),
	(2, 50, 1),
	(3, 100, 4),
	(4, 30, 9),
	(5, 30, 10),
	(6, 40, 11),
	(7, 30, 12),
	(8, 30, 13),
	(9, 40, 14),
	(10, 30, 15),
	(11, 30, 16),
	(12, 40, 17),
	(13, 30, 18),
	(14, 30, 19),
	(15, 40, 20);
/*!40000 ALTER TABLE `evaluaciontema` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.eventosusuariocurso
DROP TABLE IF EXISTS `eventosusuariocurso`;
CREATE TABLE IF NOT EXISTS `eventosusuariocurso` (
  `idEventosUsuarioCurso` int(13) NOT NULL AUTO_INCREMENT,
  `idUsuarioPersonaCurso_eventos` int(13) DEFAULT NULL,
  `fechaInicioEvento` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaFinEvento` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `nombreEvento` varchar(255) DEFAULT NULL,
  `statusEvento` int(255) DEFAULT NULL,
  PRIMARY KEY (`idEventosUsuarioCurso`) USING BTREE,
  KEY `Eventos` (`idUsuarioPersonaCurso_eventos`) USING BTREE,
  CONSTRAINT `idUSuairoPersonaCurso` FOREIGN KEY (`idUsuarioPersonaCurso_eventos`) REFERENCES `usuariopersonacurso` (`idUsuarioPersonaCurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.eventosusuariocurso: ~8 rows (aproximadamente)
DELETE FROM `eventosusuariocurso`;
/*!40000 ALTER TABLE `eventosusuariocurso` DISABLE KEYS */;
INSERT INTO `eventosusuariocurso` (`idEventosUsuarioCurso`, `idUsuarioPersonaCurso_eventos`, `fechaInicioEvento`, `fechaFinEvento`, `nombreEvento`, `statusEvento`) VALUES
	(16, 6, '2019-12-07 03:48:58', '2019-12-10 09:48:58', 'Ejercicio 1', 1),
	(17, 6, '2019-06-11 17:56:41', '2019-06-14 22:56:42', 'Ejercicio 2', 1),
	(18, 6, '2019-07-11 06:43:11', '2019-07-14 11:43:11', 'excel prueba', 1),
	(19, 6, '2019-07-11 06:43:11', '2019-07-14 11:43:11', 'excel prueba', 1),
	(20, 6, '2019-07-11 06:43:11', '2019-07-14 11:43:11', 'excel prueba', 1),
	(21, 18, '2019-09-26 10:42:25', '2019-09-29 15:42:25', 'test', 1),
	(22, 6, '2019-12-13 13:59:11', '2019-12-16 14:59:12', 'Ejercicio 3', 1),
	(23, 19, '2019-12-13 16:21:29', '2020-12-13 16:21:29', 'Duración Curso Fundamentos de Node', 1),
	(24, 20, '2019-12-13 16:22:37', '2020-12-13 16:22:37', 'Duración Curso Administración de Proyectos', 1),
	(25, 20, '2019-12-13 16:23:42', '2019-12-16 16:23:42', 'Ejercicio 1', 1);
/*!40000 ALTER TABLE `eventosusuariocurso` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.examen
DROP TABLE IF EXISTS `examen`;
CREATE TABLE IF NOT EXISTS `examen` (
  `idExamen` int(14) NOT NULL AUTO_INCREMENT,
  `idModulo_Examen` int(2) DEFAULT NULL,
  `nombreExamen` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `evaluacionExamen` int(3) DEFAULT NULL,
  `duracionExamen` float(5,2) DEFAULT NULL,
  `statusExamen` int(1) DEFAULT NULL,
  PRIMARY KEY (`idExamen`) USING BTREE,
  KEY `idModulo_Examen` (`idModulo_Examen`) USING BTREE,
  CONSTRAINT `idModulo_Examen` FOREIGN KEY (`idModulo_Examen`) REFERENCES `modulo` (`idModulo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.examen: ~8 rows (aproximadamente)
DELETE FROM `examen`;
/*!40000 ALTER TABLE `examen` DISABLE KEYS */;
INSERT INTO `examen` (`idExamen`, `idModulo_Examen`, `nombreExamen`, `evaluacionExamen`, `duracionExamen`, `statusExamen`) VALUES
	(2, 6, 'Examen ytfg', 1, 30.00, 1),
	(3, 5, 'Examen 3', 2, 15.00, 1),
	(4, 3, 'Examen 4', 10, 105.00, 1),
	(5, 8, 'exqm', 10, 120.00, 1),
	(6, 10, 'exam mod 3', 2, 45.00, 1),
	(7, 2, 'nhvbjn', 100, 120.00, 1),
	(8, 17, 'Administración de Proyectos', 100, 30.00, 1),
	(9, 16, 'hgvbkhj', 100, 60.00, 1);
/*!40000 ALTER TABLE `examen` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.examenevalusuario
DROP TABLE IF EXISTS `examenevalusuario`;
CREATE TABLE IF NOT EXISTS `examenevalusuario` (
  `idExamenevalusuario` int(14) NOT NULL AUTO_INCREMENT,
  `idUsuarioPersonaCurso_Examenevalusuario` int(13) DEFAULT NULL,
  `idExamen_examenevalusuario` int(14) DEFAULT NULL,
  `calificacionExamenevalusuario` float(2,0) DEFAULT NULL,
  PRIMARY KEY (`idExamenevalusuario`) USING BTREE,
  KEY `idUsuarioPersonaCurso_Examenevalusuario` (`idUsuarioPersonaCurso_Examenevalusuario`) USING BTREE,
  KEY `idExamen_Examenevalusuario` (`idExamen_examenevalusuario`) USING BTREE,
  CONSTRAINT `idExamen_Examenevalusuario` FOREIGN KEY (`idExamen_examenevalusuario`) REFERENCES `examen` (`idExamen`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idUsuarioPersonaCurso_Examenevalusuario` FOREIGN KEY (`idUsuarioPersonaCurso_Examenevalusuario`) REFERENCES `usuariopersonacurso` (`idUsuarioPersonaCurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.examenevalusuario: ~6 rows (aproximadamente)
DELETE FROM `examenevalusuario`;
/*!40000 ALTER TABLE `examenevalusuario` DISABLE KEYS */;
INSERT INTO `examenevalusuario` (`idExamenevalusuario`, `idUsuarioPersonaCurso_Examenevalusuario`, `idExamen_examenevalusuario`, `calificacionExamenevalusuario`) VALUES
	(3, 6, 9, 2),
	(4, 6, 8, 1),
	(5, 6, 8, 1),
	(6, 6, 8, 4),
	(7, 6, 8, 4),
	(8, 6, 8, 3);
/*!40000 ALTER TABLE `examenevalusuario` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.formatodocumento
DROP TABLE IF EXISTS `formatodocumento`;
CREATE TABLE IF NOT EXISTS `formatodocumento` (
  `idFormatodocumento` int(2) NOT NULL AUTO_INCREMENT,
  `nombreFormatodocumento` varchar(70) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idFormatodocumento`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.formatodocumento: ~7 rows (aproximadamente)
DELETE FROM `formatodocumento`;
/*!40000 ALTER TABLE `formatodocumento` DISABLE KEYS */;
INSERT INTO `formatodocumento` (`idFormatodocumento`, `nombreFormatodocumento`) VALUES
	(1, 'mp4'),
	(2, 'vnd.openxmlformats-officedocument.wordprocessingml.document'),
	(3, 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
	(4, 'png'),
	(5, 'pdf'),
	(6, 'jpeg'),
	(7, 'gif');
/*!40000 ALTER TABLE `formatodocumento` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.grupo
DROP TABLE IF EXISTS `grupo`;
CREATE TABLE IF NOT EXISTS `grupo` (
  `idGrupo` int(11) NOT NULL AUTO_INCREMENT,
  `nombreGrupo` varchar(255) DEFAULT NULL,
  `persona_idPersona` int(4) NOT NULL,
  `statusGrupo` int(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idGrupo`) USING BTREE,
  KEY `fk_grupo_persona1_idx` (`persona_idPersona`) USING BTREE,
  CONSTRAINT `fk_grupo_persona1` FOREIGN KEY (`persona_idPersona`) REFERENCES `persona` (`idPersona`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla edutest2.grupo: ~3 rows (aproximadamente)
DELETE FROM `grupo`;
/*!40000 ALTER TABLE `grupo` DISABLE KEYS */;
INSERT INTO `grupo` (`idGrupo`, `nombreGrupo`, `persona_idPersona`, `statusGrupo`) VALUES
	(1, 'Primo', 3, 1),
	(2, 'Demo', 2, 1),
	(3, 'Demo2', 2, 1);
/*!40000 ALTER TABLE `grupo` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.grupousuario
DROP TABLE IF EXISTS `grupousuario`;
CREATE TABLE IF NOT EXISTS `grupousuario` (
  `idGrupousuario` int(11) NOT NULL AUTO_INCREMENT,
  `grupo_idGrupo` int(11) NOT NULL,
  `usuario_idUsuario` int(11) NOT NULL,
  `statusGrupousuario` int(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idGrupousuario`) USING BTREE,
  UNIQUE KEY `idgrupousuario_UNIQUE` (`idGrupousuario`) USING BTREE,
  KEY `fk_grupo_has_usuario_usuario1_idx` (`usuario_idUsuario`) USING BTREE,
  KEY `fk_grupo_has_usuario_grupo1_idx` (`grupo_idGrupo`) USING BTREE,
  CONSTRAINT `fk_grupo_has_usuario_grupo1` FOREIGN KEY (`grupo_idGrupo`) REFERENCES `grupo` (`idGrupo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_grupo_has_usuario_usuario1` FOREIGN KEY (`usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla edutest2.grupousuario: ~4 rows (aproximadamente)
DELETE FROM `grupousuario`;
/*!40000 ALTER TABLE `grupousuario` DISABLE KEYS */;
INSERT INTO `grupousuario` (`idGrupousuario`, `grupo_idGrupo`, `usuario_idUsuario`, `statusGrupousuario`) VALUES
	(2, 1, 4, 0),
	(3, 1, 3, 1),
	(4, 1, 2, 0),
	(5, 1, 1, 1);
/*!40000 ALTER TABLE `grupousuario` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.materialevalusuario
DROP TABLE IF EXISTS `materialevalusuario`;
CREATE TABLE IF NOT EXISTS `materialevalusuario` (
  `idMaterialevalusuario` int(20) NOT NULL AUTO_INCREMENT,
  `idEvaluacioncontenido_Materialevalusuario` int(15) DEFAULT NULL,
  `idUsuarioPersonaCurso_Materialevalusuario` int(13) DEFAULT NULL,
  `idFormatodocumento_Materialevalusuario` int(2) DEFAULT NULL,
  `nombreMaterialevalusuario` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `calificacionMaterialevalusuario` float(3,2) DEFAULT NULL,
  `fechaMaterialevalusuario` date DEFAULT NULL,
  `statusMaterialevalusuario` int(1) DEFAULT NULL,
  `intentoMaterialevalusuario` int(1) DEFAULT NULL,
  `idTema_Material` int(20) DEFAULT NULL,
  PRIMARY KEY (`idMaterialevalusuario`) USING BTREE,
  KEY `idEvaluacioncontenido_Materialevalusuario` (`idEvaluacioncontenido_Materialevalusuario`) USING BTREE,
  KEY `idUsuarioPersonaCurso_Materialevalusuario` (`idUsuarioPersonaCurso_Materialevalusuario`) USING BTREE,
  KEY `idFormatodocumento_Materialevalusuario` (`idFormatodocumento_Materialevalusuario`) USING BTREE,
  KEY `idTema_Eval` (`idTema_Material`) USING BTREE,
  CONSTRAINT `idEvaluacioncontenido_Materialevalusuario` FOREIGN KEY (`idEvaluacioncontenido_Materialevalusuario`) REFERENCES `evaluacioncontenido` (`idEvaluacioncontenido`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idFormatodocumento_Materialevalusuario` FOREIGN KEY (`idFormatodocumento_Materialevalusuario`) REFERENCES `formatodocumento` (`idFormatodocumento`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idTema_Eval` FOREIGN KEY (`idTema_Material`) REFERENCES `tema` (`idTema`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idUsuarioPersonaCurso_Materialevalusuario` FOREIGN KEY (`idUsuarioPersonaCurso_Materialevalusuario`) REFERENCES `usuariopersonacurso` (`idUsuarioPersonaCurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.materialevalusuario: ~3 rows (aproximadamente)
DELETE FROM `materialevalusuario`;
/*!40000 ALTER TABLE `materialevalusuario` DISABLE KEYS */;
INSERT INTO `materialevalusuario` (`idMaterialevalusuario`, `idEvaluacioncontenido_Materialevalusuario`, `idUsuarioPersonaCurso_Materialevalusuario`, `idFormatodocumento_Materialevalusuario`, `nombreMaterialevalusuario`, `calificacionMaterialevalusuario`, `fechaMaterialevalusuario`, `statusMaterialevalusuario`, `intentoMaterialevalusuario`, `idTema_Material`) VALUES
	(1, 1, 6, 5, 'Documento-1', 9.00, '2019-04-25', 1, 1, 9),
	(12, 10, 6, 5, '6-Colores Hexadecimales (2).pdf', 9.00, '2019-04-30', 1, 1, 10),
	(13, 12, 6, 5, '6-Nuevo doc 2019-04-01 12.08.54.pdf', 5.00, '2019-05-02', 1, 1, 11);
/*!40000 ALTER TABLE `materialevalusuario` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.medallamodulo
DROP TABLE IF EXISTS `medallamodulo`;
CREATE TABLE IF NOT EXISTS `medallamodulo` (
  `idMedallamodulo` int(11) NOT NULL AUTO_INCREMENT,
  `idModulo_Medallamodulo` int(15) DEFAULT NULL,
  `idUsuarioPersonaCurso_Medallamodulo` int(13) DEFAULT NULL,
  `idTipomedalla_Medallamodulo` int(1) DEFAULT NULL,
  `rangoinicialMedallamodulo` float(3,2) DEFAULT NULL,
  `rangofinalMedallamodulo` float(3,2) DEFAULT NULL,
  PRIMARY KEY (`idMedallamodulo`) USING BTREE,
  KEY `idModulo_Medallamodulo` (`idModulo_Medallamodulo`) USING BTREE,
  KEY `idUsuarioPersonaCurso_Medallamodulo` (`idUsuarioPersonaCurso_Medallamodulo`) USING BTREE,
  KEY `idTipomedalla_Medallamodulo` (`idTipomedalla_Medallamodulo`) USING BTREE,
  CONSTRAINT `idModulo_Medallamodulo` FOREIGN KEY (`idModulo_Medallamodulo`) REFERENCES `modulo` (`idModulo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idTipomedalla_Medallamodulo` FOREIGN KEY (`idTipomedalla_Medallamodulo`) REFERENCES `tipomedalla` (`idTipomedalla`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idUsuarioPersonaCurso_Medallamodulo` FOREIGN KEY (`idUsuarioPersonaCurso_Medallamodulo`) REFERENCES `usuariopersonacurso` (`idUsuarioPersonaCurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.medallamodulo: ~0 rows (aproximadamente)
DELETE FROM `medallamodulo`;
/*!40000 ALTER TABLE `medallamodulo` DISABLE KEYS */;
/*!40000 ALTER TABLE `medallamodulo` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.mensajes
DROP TABLE IF EXISTS `mensajes`;
CREATE TABLE IF NOT EXISTS `mensajes` (
  `id_mensaje` int(4) NOT NULL AUTO_INCREMENT,
  `mensaje` varchar(250) DEFAULT NULL,
  `time` varchar(250) DEFAULT NULL,
  `emisor` int(4) DEFAULT NULL,
  `receptor` int(4) DEFAULT NULL,
  `id_curso` int(4) DEFAULT NULL,
  `visto` varchar(255) DEFAULT NULL,
  `idConversacion` int(4) DEFAULT NULL,
  `rolMensaje` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_mensaje`) USING BTREE,
  KEY `fkconver` (`idConversacion`) USING BTREE,
  CONSTRAINT `fkconver` FOREIGN KEY (`idConversacion`) REFERENCES `conversacion` (`idConversacion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.mensajes: ~4 rows (aproximadamente)
DELETE FROM `mensajes`;
/*!40000 ALTER TABLE `mensajes` DISABLE KEYS */;
INSERT INTO `mensajes` (`id_mensaje`, `mensaje`, `time`, `emisor`, `receptor`, `id_curso`, `visto`, `idConversacion`, `rolMensaje`) VALUES
	(1, 'prueba uno', '2019-07-11 08:02', 1, 1, 10, '0', 1, 'alumno'),
	(2, 'Prueba de mensaje al instructor', '2019-12-12 17:14', 1, 1, 10, '0', 1, 'alumno'),
	(3, 'Mensaje de prueba para el alumno', '2019-12-12 17:25', 1, 1, 10, '0', 1, 'instructor'),
	(4, '', '2019-12-12 17:26', 1, 1, 10, '0', 1, 'instructor'),
	(5, 'Respondiendo el mensaje al instructor', '2019-12-12 17:33', 1, 1, 10, '0', 1, 'alumno');
/*!40000 ALTER TABLE `mensajes` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.mensajesusuarios
DROP TABLE IF EXISTS `mensajesusuarios`;
CREATE TABLE IF NOT EXISTS `mensajesusuarios` (
  `id_chatUsuarios` int(4) NOT NULL AUTO_INCREMENT,
  `mensaje` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `idemisor` int(4) DEFAULT NULL,
  `idreceptor` int(4) DEFAULT NULL,
  `idcurso` int(4) DEFAULT NULL,
  `visto` int(1) DEFAULT NULL,
  `idConversacion` int(6) DEFAULT NULL,
  PRIMARY KEY (`id_chatUsuarios`) USING BTREE,
  KEY `conver` (`idConversacion`) USING BTREE,
  CONSTRAINT `conver` FOREIGN KEY (`idConversacion`) REFERENCES `converusuario` (`idConverUser`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Volcando datos para la tabla edutest2.mensajesusuarios: ~12 rows (aproximadamente)
DELETE FROM `mensajesusuarios`;
/*!40000 ALTER TABLE `mensajesusuarios` DISABLE KEYS */;
INSERT INTO `mensajesusuarios` (`id_chatUsuarios`, `mensaje`, `time`, `idemisor`, `idreceptor`, `idcurso`, `visto`, `idConversacion`) VALUES
	(6, 'hola', '2019-07-08 18:02', 4, 1, 10, 0, 6),
	(7, 'hola2', '2019-07-08 18:03', 1, 4, 10, 0, 6),
	(8, 'prueba', '2019-07-10 18:57', 1, 4, 10, 0, 6),
	(9, 'preuba 2', '2019-07-10 18:59', 1, 4, 10, 0, 6),
	(10, 'te contesto amigo', '2019-07-10 19:04', 4, 1, 10, 0, 6),
	(11, 'hola soy iram', '2019-07-11 18:28', 1, 4, 10, 0, 6),
	(12, 'hola soy triple a', '2019-07-11 18:29', 4, 1, 10, 0, 6),
	(13, 'este es un ejemplo de mensaje para el alumno', '2019-12-12 16:07', 1, 4, 10, 0, 6),
	(14, 'Otro mensaje de prueba', '2019-12-12 16:10', 1, 4, 10, 0, 6),
	(15, 'Otro mensaje de prueba', '2019-12-12 16:11', 1, 4, 10, 0, 6),
	(16, 'Te respondo el mensaje de prueba', '2019-12-12 16:18', 4, 1, 10, 0, 6),
	(17, 'otro mensaje de prueba para ti', '2019-12-12 16:21', 4, 1, 10, 0, 6),
	(18, 'otro mensaje de prueba para ti de nuevo', '2019-12-12 16:25', 4, 1, 10, 0, 6),
	(19, 'prueba para notificacion', '2019-12-12 16:58', 1, 4, 10, 0, 6);
/*!40000 ALTER TABLE `mensajesusuarios` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.modulo
DROP TABLE IF EXISTS `modulo`;
CREATE TABLE IF NOT EXISTS `modulo` (
  `idModulo` int(15) NOT NULL AUTO_INCREMENT,
  `nombreModulo` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `numeroModulo` int(2) DEFAULT NULL,
  `idCurso_Modulo` int(8) DEFAULT NULL,
  `statusModulo` int(1) DEFAULT NULL,
  `duracionModulo` float(4,2) DEFAULT NULL,
  PRIMARY KEY (`idModulo`) USING BTREE,
  KEY `idCurso_Modulo` (`idCurso_Modulo`) USING BTREE,
  CONSTRAINT `idCurso_Modulo` FOREIGN KEY (`idCurso_Modulo`) REFERENCES `curso` (`idCurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.modulo: ~16 rows (aproximadamente)
DELETE FROM `modulo`;
/*!40000 ALTER TABLE `modulo` DISABLE KEYS */;
INSERT INTO `modulo` (`idModulo`, `nombreModulo`, `numeroModulo`, `idCurso_Modulo`, `statusModulo`, `duracionModulo`) VALUES
	(1, 'modulo 1', 2, 1, 1, 5.00),
	(2, 'Modulo 2', 1, 1, 1, 3.00),
	(3, 'php1', 2, 2, 1, 10.00),
	(4, 'php2', 1, 2, 1, 0.50),
	(5, 'modulo 3', 3, 1, 1, 2.00),
	(6, 'Fundamentos de Node', 4, 1, 1, 3.00),
	(8, 'mod 1', 3, 8, 1, 23.00),
	(9, 'mod2', 1, 8, 1, 78.00),
	(10, 'mod3', 2, 8, 1, 7.00),
	(11, 'php tres', 3, 2, 1, 99.99),
	(12, 'i', 1, 9, 1, 2.00),
	(13, 'p', 2, 9, 1, 6.00),
	(14, 'Conceptos básicos para la administración de proyectos', 1, 10, 1, 3.00),
	(15, 'Concepto sobre el liderazgo en la administración de proyectos', 2, 10, 1, 3.00),
	(16, 'Conceptos sobre los riesgos, evaluación de desempeño y estructura de equipos', 3, 10, 1, 3.00),
	(17, 'Relación con la toma de decisiones en la administración de proyectos conjunto la autoridad y poder', 4, 10, 1, 3.00);
/*!40000 ALTER TABLE `modulo` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.notificacionpersona
DROP TABLE IF EXISTS `notificacionpersona`;
CREATE TABLE IF NOT EXISTS `notificacionpersona` (
  `idNotifPersona` int(11) NOT NULL AUTO_INCREMENT,
  `msgNotifPersona` varchar(500) NOT NULL,
  `fechaNotifPersona` date NOT NULL,
  `idPersona` int(11) NOT NULL,
  `urlNotiPersona` varchar(255) NOT NULL,
  `statusNotiPersona` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idNotifPersona`) USING BTREE,
  KEY `fkPersona` (`idPersona`) USING BTREE,
  CONSTRAINT `fkPersona` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`idPersona`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.notificacionpersona: ~2 rows (aproximadamente)
DELETE FROM `notificacionpersona`;
/*!40000 ALTER TABLE `notificacionpersona` DISABLE KEYS */;
INSERT INTO `notificacionpersona` (`idNotifPersona`, `msgNotifPersona`, `fechaNotifPersona`, `idPersona`, `urlNotiPersona`, `statusNotiPersona`) VALUES
	(1, 'Nuevo Mensaje', '2019-07-11', 1, '/chatinstructor/1/1/10', 0),
	(2, 'Nuevo Mensaje', '2019-12-12', 1, '/chatinstructor/1/1/10', 0),
	(3, 'Nuevo Mensaje', '2019-12-12', 1, '/chatinstructor/1/1/10', 0);
/*!40000 ALTER TABLE `notificacionpersona` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.notificacionusuario
DROP TABLE IF EXISTS `notificacionusuario`;
CREATE TABLE IF NOT EXISTS `notificacionusuario` (
  `idNotifUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `msgNotifUsuario` varchar(500) NOT NULL,
  `fechaNotifUsuario` date NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `urlNotiUsuario` varchar(255) NOT NULL,
  `statusNotiUsuario` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idNotifUsuario`) USING BTREE,
  KEY `fkUsuario` (`idUsuario`) USING BTREE,
  CONSTRAINT `fkUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.notificacionusuario: ~25 rows (aproximadamente)
DELETE FROM `notificacionusuario`;
/*!40000 ALTER TABLE `notificacionusuario` DISABLE KEYS */;
INSERT INTO `notificacionusuario` (`idNotifUsuario`, `msgNotifUsuario`, `fechaNotifUsuario`, `idUsuario`, `urlNotiUsuario`, `statusNotiUsuario`) VALUES
	(1, 'Terminaste todo', '2019-06-15', 2, 'www.google.com', 1),
	(2, 'Esta es una prueba', '2029-06-15', 2, '', 1),
	(3, 'Nuevo Mensaje', '2019-07-08', 4, '/chatusers/4', 0),
	(4, 'Nuevo Mensaje', '2019-07-08', 4, '/chatusers/4', 0),
	(5, 'Nuevo Mensaje', '2019-07-08', 4, '/chatusers/4', 1),
	(6, 'Nuevo Mensaje', '2019-07-08', 2, '/chatusers/1', 1),
	(7, 'Nuevo Mensaje', '2019-07-08', 2, '/chatusers/1', 1),
	(8, 'Nuevo Mensaje', '2019-07-08', 4, '/chatusers/4', 1),
	(9, 'Nuevo Mensaje', '2019-07-10', 4, '/chatusers/4', 1),
	(10, 'Nuevo Mensaje', '2019-07-10', 4, '/chatusers/4', 0),
	(11, 'Nuevo Mensaje', '2019-07-10', 2, '/chatusers/1', 1),
	(12, 'Nuevo Mensaje', '2019-07-11', 4, '/chatusers/4', 1),
	(13, 'Nuevo Mensaje', '2019-07-11', 2, '/chatusers/1', 1),
	(14, 'Tu curso Administración de Proyectos, caducará en 3 días', '2019-11-12', 1, '/curso-alumno/6/10/10', 1),
	(15, 'Tu curso Administración de Proyectos, caducará en 1 día', '2019-11-12', 1, '/curso-alumno/6/10/10', 1),
	(16, 'Tu curso Administración de Proyectos, caducará hoy', '2019-11-12', 1, '/curso-alumno/6/10/10', 1),
	(17, 'Tu curso Programación PHP, caducará en 3 días', '2019-11-10', 1, '/curso-alumno/8/2/2', 1),
	(18, 'Nuevo Mensaje', '2019-12-12', 4, '/chatusers/4', 1),
	(19, 'Nuevo Mensaje', '2019-12-12', 4, '/chatusers/4', 1),
	(20, 'Nuevo Mensaje', '2019-12-12', 4, '/chatusers/4', 1),
	(21, 'Nuevo Mensaje', '2019-12-12', 1, '/chatusers/1', 1),
	(22, 'Nuevo Mensaje', '2019-12-12', 1, '/chatusers/1', 1),
	(23, 'Nuevo Mensaje', '2019-12-12', 1, '/chatusers/1', 1),
	(24, 'Nuevo Mensaje', '2019-12-12', 4, '/chatuser/1/4/10', 1),
	(25, 'Nuevo Mensaje', '2019-12-12', 1, '/curso-alumno/undefined/10/10', 1),
	(26, 'Nuevo Mensaje', '2019-12-12', 1, '/curso-alumno/undefined/10/10', 1);
/*!40000 ALTER TABLE `notificacionusuario` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.perfil
DROP TABLE IF EXISTS `perfil`;
CREATE TABLE IF NOT EXISTS `perfil` (
  `idPerfil` int(2) NOT NULL AUTO_INCREMENT,
  `nombrePerfil` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `statusPerfil` int(11) DEFAULT '1',
  PRIMARY KEY (`idPerfil`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.perfil: ~5 rows (aproximadamente)
DELETE FROM `perfil`;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
INSERT INTO `perfil` (`idPerfil`, `nombrePerfil`, `statusPerfil`) VALUES
	(1, 'Perfil 1', 1),
	(2, 'Prueba Perfil', 1),
	(3, 'Pureba tres', 1),
	(4, 'test', 1),
	(5, 'PDksa', 0),
	(6, 'Todo', 1);
/*!40000 ALTER TABLE `perfil` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.persona
DROP TABLE IF EXISTS `persona`;
CREATE TABLE IF NOT EXISTS `persona` (
  `idPersona` int(11) NOT NULL AUTO_INCREMENT,
  `nombrePersona` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apellidopaternoPersona` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apellidomaternoPersona` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `correoPersona` varchar(360) COLLATE utf8_unicode_ci DEFAULT NULL,
  `descripcionPersona` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `imagenPersona` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `statusPersona` int(1) DEFAULT NULL,
  `telefonoPersona` int(15) DEFAULT NULL,
  `contrasenaPersona` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idPersona`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.persona: ~7 rows (aproximadamente)
DELETE FROM `persona`;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` (`idPersona`, `nombrePersona`, `apellidopaternoPersona`, `apellidomaternoPersona`, `correoPersona`, `descripcionPersona`, `imagenPersona`, `statusPersona`, `telefonoPersona`, `contrasenaPersona`) VALUES
	(1, 'Gerardo', 'Zamudio', 'Gonzalez', 'gerbonito@tatata.com', 'Soy el mas bonito', '1-Captura de pantalla 2018-11-30 a la(s) 12.05.48.png', 1, 44, 'Hola'),
	(2, 'angie', 'Zamudio', 'Gonzalez', 'gerbonito@tatata.com', 'Soy el mas bonito', '2-bio.png', 1, 44, 's3456'),
	(3, 'yt', 'yt', 'yt', 'y', 'yt', 'default.png', 0, 0, 'VuBEpmNn'),
	(4, 'gf', 'gf', 'gf', 'gf', 'gf', 'default.png', 0, 0, 'PPCbZPcq'),
	(5, '1', '1', '1', '1', '1', '5-513337.jpg', 0, 1, '6JtqMZL3'),
	(6, 'Juans', 'Perez', 'Perez', 'juan.perez@perez.com', '', '38071996_10160513855895167_5977383720456290304_o.jpg', 0, 2147483647, 'MRmtNTNr'),
	(7, 'asdas5', 'das', 'adas', 'asdas@asdas.com', 'asdas', '7-1-Beedrill.png', 0, 2147483647, 'xwpLBwyY');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.personacurso
DROP TABLE IF EXISTS `personacurso`;
CREATE TABLE IF NOT EXISTS `personacurso` (
  `idPersonaCurso` int(11) NOT NULL AUTO_INCREMENT,
  `idPersona_PersonaCurso` int(4) DEFAULT NULL,
  `idCurso_PersonaCurso` int(8) DEFAULT NULL,
  PRIMARY KEY (`idPersonaCurso`) USING BTREE,
  KEY `idPersona_PersonaCurso` (`idPersona_PersonaCurso`) USING BTREE,
  KEY `idCurso_PersonaCurso` (`idCurso_PersonaCurso`) USING BTREE,
  CONSTRAINT `idCurso_PersonaCurso` FOREIGN KEY (`idCurso_PersonaCurso`) REFERENCES `curso` (`idCurso`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idPersona_PersonaCurso` FOREIGN KEY (`idPersona_PersonaCurso`) REFERENCES `persona` (`idPersona`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.personacurso: ~3 rows (aproximadamente)
DELETE FROM `personacurso`;
/*!40000 ALTER TABLE `personacurso` DISABLE KEYS */;
INSERT INTO `personacurso` (`idPersonaCurso`, `idPersona_PersonaCurso`, `idCurso_PersonaCurso`) VALUES
	(3, 1, 2),
	(4, 2, 1),
	(5, 1, 10),
	(8, 7, 8);
/*!40000 ALTER TABLE `personacurso` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.personacursoperfil
DROP TABLE IF EXISTS `personacursoperfil`;
CREATE TABLE IF NOT EXISTS `personacursoperfil` (
  `idPersonaCursoPerfil` int(4) NOT NULL AUTO_INCREMENT,
  `idPersonaCurso_PersonaCursoPerfil` int(11) DEFAULT NULL,
  `idPersonaPerfil_PersonaCursoPerfil` int(5) DEFAULT NULL,
  PRIMARY KEY (`idPersonaCursoPerfil`) USING BTREE,
  KEY `idPersonaCurso_PersonaCursoPerfil` (`idPersonaCurso_PersonaCursoPerfil`) USING BTREE,
  KEY `idPersonaPerfil_PersonaCursoPerfil` (`idPersonaPerfil_PersonaCursoPerfil`) USING BTREE,
  CONSTRAINT `idPersonaCurso_PersonaCursoPerfil` FOREIGN KEY (`idPersonaCurso_PersonaCursoPerfil`) REFERENCES `personacurso` (`idPersonaCurso`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idPersonaPerfil_PersonaCursoPerfil` FOREIGN KEY (`idPersonaPerfil_PersonaCursoPerfil`) REFERENCES `personaperfil` (`idPersonaPerfil`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.personacursoperfil: ~3 rows (aproximadamente)
DELETE FROM `personacursoperfil`;
/*!40000 ALTER TABLE `personacursoperfil` DISABLE KEYS */;
INSERT INTO `personacursoperfil` (`idPersonaCursoPerfil`, `idPersonaCurso_PersonaCursoPerfil`, `idPersonaPerfil_PersonaCursoPerfil`) VALUES
	(5, 3, 5),
	(6, 4, 6),
	(7, 5, 7);
/*!40000 ALTER TABLE `personacursoperfil` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.personaperfil
DROP TABLE IF EXISTS `personaperfil`;
CREATE TABLE IF NOT EXISTS `personaperfil` (
  `idPersonaPerfil` int(5) NOT NULL AUTO_INCREMENT,
  `idPersona_PersonaPerfil` int(4) DEFAULT NULL,
  `idPerfil_PersonaPerfil` int(2) DEFAULT NULL,
  PRIMARY KEY (`idPersonaPerfil`) USING BTREE,
  KEY `idPersona_PersonaPerfil` (`idPersona_PersonaPerfil`) USING BTREE,
  KEY `idPerfil_PersonaPerfil` (`idPerfil_PersonaPerfil`) USING BTREE,
  CONSTRAINT `idPerfil_PersonaPerfil` FOREIGN KEY (`idPerfil_PersonaPerfil`) REFERENCES `perfil` (`idPerfil`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idPersona_PersonaPerfil` FOREIGN KEY (`idPersona_PersonaPerfil`) REFERENCES `persona` (`idPersona`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.personaperfil: ~16 rows (aproximadamente)
DELETE FROM `personaperfil`;
/*!40000 ALTER TABLE `personaperfil` DISABLE KEYS */;
INSERT INTO `personaperfil` (`idPersonaPerfil`, `idPersona_PersonaPerfil`, `idPerfil_PersonaPerfil`) VALUES
	(2, 1, 3),
	(5, 1, 5),
	(6, 2, 2),
	(7, 1, 6),
	(8, 6, 2),
	(9, 6, 2),
	(10, 6, 2),
	(11, 6, 2),
	(12, 6, 2),
	(13, 6, 2),
	(14, 6, 2),
	(15, 6, 2),
	(16, 7, 2),
	(17, 7, 5),
	(18, 7, 4),
	(19, 7, 3);
/*!40000 ALTER TABLE `personaperfil` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.preguntaexamen
DROP TABLE IF EXISTS `preguntaexamen`;
CREATE TABLE IF NOT EXISTS `preguntaexamen` (
  `idPreguntaexamen` int(16) NOT NULL AUTO_INCREMENT,
  `idExamen_Preguntaexamen` int(11) DEFAULT NULL,
  `preguntaPreguntaexamen` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `statusPreguntaexamen` int(1) DEFAULT NULL,
  PRIMARY KEY (`idPreguntaexamen`) USING BTREE,
  KEY `idExamen_Preguntaexamen` (`idExamen_Preguntaexamen`) USING BTREE,
  CONSTRAINT `idExamen_Preguntaexamen` FOREIGN KEY (`idExamen_Preguntaexamen`) REFERENCES `examen` (`idExamen`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.preguntaexamen: ~15 rows (aproximadamente)
DELETE FROM `preguntaexamen`;
/*!40000 ALTER TABLE `preguntaexamen` DISABLE KEYS */;
INSERT INTO `preguntaexamen` (`idPreguntaexamen`, `idExamen_Preguntaexamen`, `preguntaPreguntaexamen`, `statusPreguntaexamen`) VALUES
	(1, 3, 'Pregunta testeo1', 1),
	(2, 2, '', 1),
	(3, 7, 'h', 1),
	(4, 7, 'dfgh', 1),
	(5, 7, 'ghj', 1),
	(6, 8, '¿Que es la administración de proyectos?', 1),
	(7, 8, '¿Que es el liderazgo?', 1),
	(8, 8, 'Procesos para la administración de riesgos ', 1),
	(9, 8, 'Factores Ambientales que afectan el conflicto', 1),
	(10, 8, '¿Qué es lo que implica delegación?', 1),
	(11, 8, 'Ventajas de la estructura de la organización', 1),
	(12, 8, 'Características de una buena administración de equipo de trabajo', 1),
	(13, 8, 'Tipos de Lideres principales', 1),
	(14, 8, 'Elementos de las estructuras organizacionales', 1),
	(15, 8, '¿Que es la toma de decisiones?', 1);
/*!40000 ALTER TABLE `preguntaexamen` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.prueba
DROP TABLE IF EXISTS `prueba`;
CREATE TABLE IF NOT EXISTS `prueba` (
  `idPrueba` int(11) NOT NULL AUTO_INCREMENT,
  `prueba` varchar(100) DEFAULT NULL,
  `otro` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idPrueba`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.prueba: ~13 rows (aproximadamente)
DELETE FROM `prueba`;
/*!40000 ALTER TABLE `prueba` DISABLE KEYS */;
INSERT INTO `prueba` (`idPrueba`, `prueba`, `otro`) VALUES
	(1, '1', 'prue1'),
	(2, '2', 'prue2'),
	(3, '3', 'prue3'),
	(4, '4', 'prue4'),
	(5, '5', 'prue5'),
	(6, '6', 'prue6'),
	(7, '7', 'prue7'),
	(8, '8', 'prue8'),
	(9, '9', 'prue9'),
	(10, '10', 'prue10'),
	(11, '11', 'prue11'),
	(12, '12', 'prue12'),
	(13, '13', 'prue13');
/*!40000 ALTER TABLE `prueba` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.publicidad
DROP TABLE IF EXISTS `publicidad`;
CREATE TABLE IF NOT EXISTS `publicidad` (
  `idPublicidad` int(11) NOT NULL AUTO_INCREMENT,
  `tituloPublicidad` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `descripcionPublicidad` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fechaPublicidad` date DEFAULT NULL,
  `imagenPublicidad` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `statusPublicidad` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idPublicidad`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.publicidad: ~3 rows (aproximadamente)
DELETE FROM `publicidad`;
/*!40000 ALTER TABLE `publicidad` DISABLE KEYS */;
INSERT INTO `publicidad` (`idPublicidad`, `tituloPublicidad`, `descripcionPublicidad`, `fechaPublicidad`, `imagenPublicidad`, `statusPublicidad`) VALUES
	(5, 'Prueba', 'Prueba', NULL, '5-1-charmander.jpg', '1'),
	(6, 'Prueba3', 'Prueba3', NULL, '6-1-IMG_0513.JPG', '1'),
	(7, 'Prueba', 'Prueba', NULL, '7-1-1-iram 002.jpg', '0');
/*!40000 ALTER TABLE `publicidad` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.requisito
DROP TABLE IF EXISTS `requisito`;
CREATE TABLE IF NOT EXISTS `requisito` (
  `idRequisito` int(3) NOT NULL AUTO_INCREMENT,
  `descripcionRequisito` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idSubcategoriacurso_Requisito` int(2) DEFAULT NULL,
  PRIMARY KEY (`idRequisito`) USING BTREE,
  KEY `idSubcategoriacurso_Requisito` (`idSubcategoriacurso_Requisito`) USING BTREE,
  CONSTRAINT `idSubcategoriacurso_Requisito` FOREIGN KEY (`idSubcategoriacurso_Requisito`) REFERENCES `subcategoriacurso` (`idSubcategoriacurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.requisito: ~7 rows (aproximadamente)
DELETE FROM `requisito`;
/*!40000 ALTER TABLE `requisito` DISABLE KEYS */;
INSERT INTO `requisito` (`idRequisito`, `descripcionRequisito`, `idSubcategoriacurso_Requisito`) VALUES
	(1, 'Conocimientos de php', 3),
	(2, 'Conocimientos básicos de Diseño', 3),
	(3, 'Conocimientos de Ajax', 3),
	(4, 'Conocimientos básicos de programación', 1),
	(5, 'Conocimientos avanzados de Java y todos los lenguajes, nada de noobs.', 14),
	(6, 'ghjk', 14),
	(7, 'aqw', 4);
/*!40000 ALTER TABLE `requisito` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.requisitocurso
DROP TABLE IF EXISTS `requisitocurso`;
CREATE TABLE IF NOT EXISTS `requisitocurso` (
  `idRequisitoCurso` int(11) NOT NULL AUTO_INCREMENT,
  `idCurso_RequisitoCurso` int(8) DEFAULT NULL,
  `descripcionRequisitoCurso` varchar(130) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idRequisitoCurso`) USING BTREE,
  KEY `idCurso_RequisitoCurso` (`idCurso_RequisitoCurso`) USING BTREE,
  CONSTRAINT `idCurso_RequisitoCurso` FOREIGN KEY (`idCurso_RequisitoCurso`) REFERENCES `curso` (`idCurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.requisitocurso: ~10 rows (aproximadamente)
DELETE FROM `requisitocurso`;
/*!40000 ALTER TABLE `requisitocurso` DISABLE KEYS */;
INSERT INTO `requisitocurso` (`idRequisitoCurso`, `idCurso_RequisitoCurso`, `descripcionRequisitoCurso`) VALUES
	(3, 2, 'Fundamentos básicos de programación orientada a objetos'),
	(10, 8, 'hjkl'),
	(11, 8, 'ghjkl'),
	(16, 1, 'Conocimientos previos de node'),
	(17, 9, 'p'),
	(18, 10, 'Conocimiento en el proceso general de administración'),
	(19, 10, 'Administración básica en recursos'),
	(20, 10, 'Manejo de costos'),
	(21, 11, 'asd'),
	(22, 11, 'dsa');
/*!40000 ALTER TABLE `requisitocurso` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.respuestaexamen
DROP TABLE IF EXISTS `respuestaexamen`;
CREATE TABLE IF NOT EXISTS `respuestaexamen` (
  `idRespuestaexamen` int(20) NOT NULL AUTO_INCREMENT,
  `idPreguntaexamen_Respuestaexamen` int(16) DEFAULT NULL,
  `respuestaRespuestaexamen` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `statusRespuestaexamen` int(1) DEFAULT NULL,
  `retroRespuestaexamen` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idRespuestaexamen`) USING BTREE,
  KEY `idPreguntaexamen_Respuestaexamen` (`idPreguntaexamen_Respuestaexamen`) USING BTREE,
  CONSTRAINT `idPreguntaexamen_Respuestaexamen` FOREIGN KEY (`idPreguntaexamen_Respuestaexamen`) REFERENCES `preguntaexamen` (`idPreguntaexamen`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.respuestaexamen: ~60 rows (aproximadamente)
DELETE FROM `respuestaexamen`;
/*!40000 ALTER TABLE `respuestaexamen` DISABLE KEYS */;
INSERT INTO `respuestaexamen` (`idRespuestaexamen`, `idPreguntaexamen_Respuestaexamen`, `respuestaRespuestaexamen`, `statusRespuestaexamen`, `retroRespuestaexamen`) VALUES
	(1, 1, 'MALA 1', 0, NULL),
	(2, 1, 'MALA 2', 0, NULL),
	(3, 1, 'MALA 3', 0, NULL),
	(4, 1, 'BUENAA', 1, NULL),
	(5, 2, '', 0, NULL),
	(6, 2, '', 0, NULL),
	(7, 2, '', 0, NULL),
	(8, 2, '', 1, NULL),
	(9, 3, 'kjh', 0, NULL),
	(10, 3, 'jh', 0, NULL),
	(11, 3, 'p', 0, NULL),
	(12, 3, 'hjjj', 1, NULL),
	(13, 4, 'ghj', 0, NULL),
	(14, 4, 'ghj', 0, NULL),
	(15, 4, 'ghj', 0, NULL),
	(16, 4, 'fghj', 1, NULL),
	(17, 5, 'ghj', 0, NULL),
	(18, 5, 'yui', 0, NULL),
	(19, 5, 'vbn', 0, NULL),
	(20, 5, 'ghj', 1, NULL),
	(21, 6, 'Es una capacidad estratégica de las organizaciones, que les permite vincular los resultados de los proyectos con las metas del negocio y así ser más competitivos en sus áreas.', 0, 'Las características de una buena administración está enfocada en dar una comunicación  adecuada conjunto con las herramientas necesarias para realizar proyectos exitosos'),
	(22, 6, 'Capacidad de poder administrar los proyectos de una manera efectiva y eficiente dentro de nuestra empresa. ', 0, 'Las características de una buena administración está enfocada en dar una comunicación  adecuada conjunto con las herramientas necesarias para realizar proyectos exitosos'),
	(23, 6, 'La capacidad de ver más allá de nuestras habilidades para llevar una mejor administración.', 0, 'Las características de una buena administración está enfocada en dar una comunicación  adecuada conjunto con las herramientas necesarias para realizar proyectos exitosos'),
	(24, 6, 'Es la aplicación de conocimientos, habilidades, herramientas y técnicas para realizar proyectos efectiva y eficientemente. ', 1, 'Las características de una buena administración está enfocada en dar una comunicación  adecuada conjunto con las herramientas necesarias para realizar proyectos exitosos'),
	(25, 7, 'Capacidad de aplicar los conocimientos, habilidades y metas para el negocio competitivo.', 0, 'Es una forma de poder dirigir, organizar un grupo y puesta en práctica las aptitudes necesarias para gerenciar grupos de personas '),
	(26, 7, 'Habilidades que tiene un individuo para formar equipos o poder influir en la forma de trabajar en una empresa.', 0, 'Es una forma de poder dirigir, organizar un grupo y puesta en práctica las aptitudes necesarias para gerenciar grupos de personas '),
	(27, 7, 'La forma de poder dirigir de manera efectiva y eficiente dentro de la empresa.', 0, 'Es una forma de poder dirigir, organizar un grupo y puesta en práctica las aptitudes necesarias para gerenciar grupos de personas '),
	(28, 7, 'Conjunto de habilidades gerenciales o directivas que un individuo tiene para influir en la forma de ser o actuar de las personas o en un grupo de trabajo determinado.', 1, 'Es una forma de poder dirigir, organizar un grupo y puesta en práctica las aptitudes necesarias para gerenciar grupos de personas '),
	(29, 8, 'Habilidad, Comunicación, Liderazgo y Competitividad.', 0, 'Los procesos son elementales para poder llevar a cabo una buena administración y a su vez ver los posibles riesgos que nos ayuden a ver que probabilidad e impacto hay dentro del ciclo de vida del proyecto '),
	(30, 8, 'Liderazgo y técnicas para realizar proyectos de manera efectiva.', 0, 'Los procesos son elementales para poder llevar a cabo una buena administración y a su vez ver los posibles riesgos que nos ayuden a ver que probabilidad e impacto hay dentro del ciclo de vida del proyecto '),
	(31, 8, 'Habilidades gerenciales o directivas para la administración de proyectos. ', 0, 'Los procesos son elementales para poder llevar a cabo una buena administración y a su vez ver los posibles riesgos que nos ayuden a ver que probabilidad e impacto hay dentro del ciclo de vida del proyecto '),
	(32, 8, 'Identificar, analizar, planificar y monitorear riesgos. ', 1, 'Los procesos son elementales para poder llevar a cabo una buena administración y a su vez ver los posibles riesgos que nos ayuden a ver que probabilidad e impacto hay dentro del ciclo de vida del proyecto '),
	(33, 9, 'Baja moral, reglas y regulaciones.', 0, 'Los factores ambientales son todas las condiciones de las que no se tiene control y que influyen o dirigen el proyecto '),
	(34, 9, 'Pobre comunicación tanto horizontal como vertical.', 0, 'Los factores ambientales son todas las condiciones de las que no se tiene control y que influyen o dirigen el proyecto '),
	(35, 9, 'Habilidades para poder dirigir a los individuos para formar equipos.', 0, 'Los factores ambientales son todas las condiciones de las que no se tiene control y que influyen o dirigen el proyecto '),
	(36, 9, 'Grupos grandes, el ruido, la monotonía y la asignación de restricciones.', 1, 'Los factores ambientales son todas las condiciones de las que no se tiene control y que influyen o dirigen el proyecto '),
	(37, 10, 'No se requiere tanta comunicación efectiva para ser mejor dentro de la empresa.', 0, 'Es una competencia compleja que requiere esfuerzo y método para conseguir su efectividad ya que es una de las habilidades más difíciles de adquirir '),
	(38, 10, 'Se requiere de comunicación efectiva entre los conocimientos de cada uno de los integrantes del equipo de trabajo.', 0, 'Es una competencia compleja que requiere esfuerzo y método para conseguir su efectividad ya que es una de las habilidades más difíciles de adquirir '),
	(39, 10, 'Capacidad de poder administrar los proyectos de manera efectiva.', 0, 'Es una competencia compleja que requiere esfuerzo y método para conseguir su efectividad ya que es una de las habilidades más difíciles de adquirir '),
	(40, 10, 'Delegación implica más que asignar tareas a miembros específicos de un equipo de proyecto.', 1, 'Es una competencia compleja que requiere esfuerzo y método para conseguir su efectividad ya que es una de las habilidades más difíciles de adquirir '),
	(41, 11, 'Ninguna persona es responsable por el proyecto total o las decisiones del equipo.', 0, 'La estructura organizacional es uno de los elementos que deben de tener en cuenta a la hora de gestionar un proyecto, ya que influye en la forma de dirigir los proyectos  '),
	(42, 11, 'La motivación de la gente es ideal dentro de los proyectos conjunto al positivismo.', 0, 'La estructura organizacional es uno de los elementos que deben de tener en cuenta a la hora de gestionar un proyecto, ya que influye en la forma de dirigir los proyectos  '),
	(43, 11, 'Organización funcional con iniciativas orientadas a lo funcional para el proyecto.', 0, 'La estructura organizacional es uno de los elementos que deben de tener en cuenta a la hora de gestionar un proyecto, ya que influye en la forma de dirigir los proyectos  '),
	(44, 11, 'Facilita el planeamiento, control, mejor control técnico y canales de comunicación bien\r\ndefinidos.', 1, 'La estructura organizacional es uno de los elementos que deben de tener en cuenta a la hora de gestionar un proyecto, ya que influye en la forma de dirigir los proyectos  '),
	(45, 12, 'Hay momentos para ser dinámicos y de manera rigurosa.', 0, 'Mejora tanto las competencias de cada uno de los miembros del equipo como al igual la interacción con los demás miembros'),
	(46, 12, 'Experto en conocimientos en la comunicación efectiva.', 0, 'Mejora tanto las competencias de cada uno de los miembros del equipo como al igual la interacción con los demás miembros'),
	(47, 12, 'Capacidad de poder administrar los proyectos', 0, 'Mejora tanto las competencias de cada uno de los miembros del equipo como al igual la interacción con los demás miembros'),
	(48, 12, 'Un buen proyecto necesita un líder y jugador, es el coach del equipo, ya que mejora la\r\ndistribución del trabajo y control del mismo.', 1, 'Mejora tanto las competencias de cada uno de los miembros del equipo como al igual la interacción con los demás miembros'),
	(49, 13, 'Miembros del equipo y que escucha a la gente que provee soporte en los esfuerzos del\r\nequipo.', 0, 'Un líder es aquel que genera confianza en su equipo de trabajo, quien el cual influye en las actividades de un grupo para alcanzar una meta '),
	(50, 13, 'Agrupar recursos de las empresas y aprovecharlos de la mejor manera posible.', 0, 'Un líder es aquel que genera confianza en su equipo de trabajo, quien el cual influye en las actividades de un grupo para alcanzar una meta '),
	(51, 13, 'Cumpliendo los objetivos marcados en las estrategias.', 0, 'Un líder es aquel que genera confianza en su equipo de trabajo, quien el cual influye en las actividades de un grupo para alcanzar una meta '),
	(52, 13, 'Líder situacional, líder centrado en la acción, Liderazgo autocrático, Liderazgo burocrático\r\netc.', 1, 'Un líder es aquel que genera confianza en su equipo de trabajo, quien el cual influye en las actividades de un grupo para alcanzar una meta '),
	(53, 14, 'Procedimientos, derecho de decidir y actuar.', 0, 'La estructura permite tener claras las tareas y políticas de la institución lo que le da a los miembros dirección y trabajar en equipo de manera efectiva '),
	(54, 14, 'Identificación de tareas particulares y asignación.', 0, 'La estructura permite tener claras las tareas y políticas de la institución lo que le da a los miembros dirección y trabajar en equipo de manera efectiva '),
	(55, 14, 'Sistematización de los procedimientos formales e informales.', 0, 'La estructura permite tener claras las tareas y políticas de la institución lo que le da a los miembros dirección y trabajar en equipo de manera efectiva '),
	(56, 14, 'Especialización, estandarización, coordinación y autoridad.', 1, 'La estructura permite tener claras las tareas y políticas de la institución lo que le da a los miembros dirección y trabajar en equipo de manera efectiva '),
	(57, 15, 'Es el planteamiento del modelo construido a partir de una simplificación del problema.', 0, 'La toma de decisiones se hace basada en experiencias previas, además cada persona tiene\r\nUna manera de afrontar la resolución de problemas \r\n'),
	(58, 15, 'Alcanzar objetivos operativos dentro de la organización.', 0, 'La toma de decisiones se hace basada en experiencias previas, además cada persona tiene\r\nUna manera de afrontar la resolución de problemas \r\n'),
	(59, 15, 'Tener objetivos estratégicos o tácticos para la decisión fundamental en la empresa.', 0, 'La toma de decisiones se hace basada en experiencias previas, además cada persona tiene\r\nUna manera de afrontar la resolución de problemas \r\n'),
	(60, 15, 'Es la selección de decisiones en el curso de acción al igual la percepción de la situación por\r\nparte del individuo o grupo de personas implicadas.', 1, 'La toma de decisiones se hace basada en experiencias previas, además cada persona tiene\r\nUna manera de afrontar la resolución de problemas \r\n');
/*!40000 ALTER TABLE `respuestaexamen` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.respuestausuario
DROP TABLE IF EXISTS `respuestausuario`;
CREATE TABLE IF NOT EXISTS `respuestausuario` (
  `idRespuestausuario` int(20) NOT NULL AUTO_INCREMENT,
  `idExamenevalusuario_Respuestausuario` int(14) DEFAULT NULL,
  `idPreguntaexamen` int(16) DEFAULT NULL,
  `respuestaRespuestausuario` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idRespuestausuario`) USING BTREE,
  KEY `idExamenevalusuario` (`idExamenevalusuario_Respuestausuario`) USING BTREE,
  KEY `idPreguntaexamen_Respuestausuario` (`idPreguntaexamen`) USING BTREE,
  CONSTRAINT `idExamenevalusuario` FOREIGN KEY (`idExamenevalusuario_Respuestausuario`) REFERENCES `examenevalusuario` (`idExamenevalusuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idPreguntaexamen_Respuestausuario` FOREIGN KEY (`idPreguntaexamen`) REFERENCES `preguntaexamen` (`idPreguntaexamen`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.respuestausuario: ~0 rows (aproximadamente)
DELETE FROM `respuestausuario`;
/*!40000 ALTER TABLE `respuestausuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `respuestausuario` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.rol
DROP TABLE IF EXISTS `rol`;
CREATE TABLE IF NOT EXISTS `rol` (
  `idRol` int(3) NOT NULL AUTO_INCREMENT,
  `nombreRol` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idRol`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.rol: ~23 rows (aproximadamente)
DELETE FROM `rol`;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` (`idRol`, `nombreRol`) VALUES
	(1, 'Crear Curso'),
	(2, 'Activar Curso'),
	(3, 'Editar Curso'),
	(4, 'Desactivar Curso'),
	(5, 'Dar de baja Curso'),
	(6, 'Asignar Instructor'),
	(7, 'Crear Rol'),
	(8, 'Asignar Rol'),
	(9, 'Editar Rol'),
	(10, 'Dar de baja Rol'),
	(11, 'Ver Roles'),
	(12, 'Crear Persona'),
	(13, 'Editar Persona'),
	(14, 'Dar de baja Persona'),
	(15, 'Ver Categorías'),
	(16, 'Modificar Categorías'),
	(17, 'Ver Especialidades'),
	(18, 'Modificar Especialidades'),
	(19, 'Editar Módulo'),
	(22, 'Dar de alta Persona'),
	(23, 'Ver Persona'),
	(24, 'Añadir Categoría'),
	(25, 'Añadir Especialidad');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.rolperfil
DROP TABLE IF EXISTS `rolperfil`;
CREATE TABLE IF NOT EXISTS `rolperfil` (
  `idRolPerfil` int(3) NOT NULL AUTO_INCREMENT,
  `idRol_RolPerfil` int(3) DEFAULT NULL,
  `idPerfil_RolPerfil` int(2) DEFAULT NULL,
  `status_RolPerfil` int(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idRolPerfil`) USING BTREE,
  KEY `idRol_RolPerfil` (`idRol_RolPerfil`) USING BTREE,
  KEY `idPerfil_RolPerfil` (`idPerfil_RolPerfil`) USING BTREE,
  CONSTRAINT `idPerfil_RolPerfil` FOREIGN KEY (`idPerfil_RolPerfil`) REFERENCES `perfil` (`idPerfil`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idRol_RolPerfil` FOREIGN KEY (`idRol_RolPerfil`) REFERENCES `rol` (`idRol`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.rolperfil: ~42 rows (aproximadamente)
DELETE FROM `rolperfil`;
/*!40000 ALTER TABLE `rolperfil` DISABLE KEYS */;
INSERT INTO `rolperfil` (`idRolPerfil`, `idRol_RolPerfil`, `idPerfil_RolPerfil`, `status_RolPerfil`) VALUES
	(3, 3, 2, 1),
	(4, 2, 2, 1),
	(5, 3, 3, 1),
	(6, 7, 3, 1),
	(8, 2, 3, 1),
	(9, 4, 3, 1),
	(11, 5, 3, 1),
	(12, 12, 4, 1),
	(13, 4, 2, 1),
	(14, 13, 4, 1),
	(15, 14, 4, 1),
	(16, 1, 3, 1),
	(17, 15, 4, 1),
	(19, 16, 5, 1),
	(20, 17, 5, 1),
	(22, 18, 5, 1),
	(23, 19, 5, 1),
	(26, 22, 5, 1),
	(27, 23, 5, 1),
	(28, 25, 6, 1),
	(29, 24, 6, 1),
	(30, 23, 6, 1),
	(31, 22, 6, 1),
	(32, 19, 6, 1),
	(33, 18, 6, 1),
	(34, 17, 6, 1),
	(35, 16, 6, 1),
	(36, 15, 6, 1),
	(37, 14, 6, 1),
	(38, 13, 6, 1),
	(39, 12, 6, 1),
	(40, 11, 6, 1),
	(41, 10, 6, 1),
	(42, 9, 6, 1),
	(43, 8, 6, 1),
	(44, 7, 6, 1),
	(45, 5, 6, 1),
	(46, 6, 6, 1),
	(47, 1, 6, 1),
	(48, 4, 6, 1),
	(49, 3, 6, 1),
	(50, 2, 6, 1);
/*!40000 ALTER TABLE `rolperfil` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.subcategoriacurso
DROP TABLE IF EXISTS `subcategoriacurso`;
CREATE TABLE IF NOT EXISTS `subcategoriacurso` (
  `idSubcategoriacurso` int(2) NOT NULL AUTO_INCREMENT,
  `idCategoriacurso_Subcategoriacurso` int(2) DEFAULT NULL,
  `nombreSubcategoriacurso` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idSubcategoriacurso`) USING BTREE,
  KEY `idCategoriacurso_Subcategoriacurso` (`idCategoriacurso_Subcategoriacurso`) USING BTREE,
  CONSTRAINT `idCategoriacurso_Subcategoriacurso` FOREIGN KEY (`idCategoriacurso_Subcategoriacurso`) REFERENCES `categoriacurso` (`idCategoriacurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.subcategoriacurso: ~15 rows (aproximadamente)
DELETE FROM `subcategoriacurso`;
/*!40000 ALTER TABLE `subcategoriacurso` DISABLE KEYS */;
INSERT INTO `subcategoriacurso` (`idSubcategoriacurso`, `idCategoriacurso_Subcategoriacurso`, `nombreSubcategoriacurso`) VALUES
	(1, 1, 'Node'),
	(2, 2, 'Ilustrator'),
	(3, 1, 'PHP'),
	(4, 2, 'o'),
	(5, 2, 'hola'),
	(6, 2, 'Holo'),
	(7, 2, 'buenas'),
	(8, 2, 'noches'),
	(9, 2, 'amigo'),
	(10, 2, 'ghj'),
	(11, 2, 'lm'),
	(12, 3, 'Planeación Estratégica'),
	(13, 11, 'Bonito'),
	(14, 1, 'Java'),
	(15, 10, 'ku');
/*!40000 ALTER TABLE `subcategoriacurso` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.tema
DROP TABLE IF EXISTS `tema`;
CREATE TABLE IF NOT EXISTS `tema` (
  `idTema` int(20) NOT NULL AUTO_INCREMENT,
  `nombreTema` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `idModulo_Tema` int(15) DEFAULT NULL,
  `descripcionTema` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `numeroTema` int(2) DEFAULT NULL,
  `statusTema` int(1) DEFAULT NULL,
  PRIMARY KEY (`idTema`) USING BTREE,
  KEY `idModulo_Tema` (`idModulo_Tema`) USING BTREE,
  CONSTRAINT `idModulo_Tema` FOREIGN KEY (`idModulo_Tema`) REFERENCES `modulo` (`idModulo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.tema: ~20 rows (aproximadamente)
DELETE FROM `tema`;
/*!40000 ALTER TABLE `tema` DISABLE KEYS */;
INSERT INTO `tema` (`idTema`, `nombreTema`, `idModulo_Tema`, `descripcionTema`, `numeroTema`, `statusTema`) VALUES
	(1, 'tema 1', 1, 'descripcion', 2, 1),
	(2, 'tema 2', 1, 'descripcion 2', 1, 1),
	(3, 'Tema 3', 1, 'desc 3', 3, 1),
	(4, 'nuevo tema', 6, 'nuevo', 1, 1),
	(5, 'otro nuevo tema', 6, 'No tiene descripcion', 2, 1),
	(6, 'Introduccion a php', 3, 'Que es y como usar php', 1, 1),
	(7, '¿Por que usar php?', 3, '', 2, 1),
	(8, 'yg', 10, 'hgv', 1, 1),
	(9, 'Fundamentos del proyecto', 14, 'Conocer las reglas y formas en que se desarrollara un proyecto con los conceptos básicos', 1, 1),
	(10, 'Equipos de trabajo en la administración de proyectos', 14, 'Se darán los conceptos básicos para la administración de proyectos', 2, 1),
	(11, 'Teoría de la organización y estructura', 14, 'Conocer la función de la organización en la administración de proyectos', 3, 1),
	(12, 'Liderazgo', 15, 'Conceptos teóricos del liderazgo de forma efectiva en las ciencias conductuales', 1, 1),
	(13, 'Manejo de conflictos', 15, 'Conceptos adquiridos en la relación del liderazgo a través del conocimiento de la comunicación y motivación', 2, 1),
	(14, 'Factor Humano', 15, 'Entender los roles de las entidades involucradas en la administración de proyectos', 3, 1),
	(15, 'Administración de Riesgos', 16, 'Entender los riesgos conforme a los proyectos', 1, 1),
	(16, 'Evaluación de Desempeño', 16, 'Mejorar la evaluación de desempeño dentro de los proyectos', 2, 1),
	(17, 'Balance Scorecard y Estructura de equipos', 16, 'Conocimiento básico para la gerencia de proyectos', 3, 1),
	(18, 'Toma de Decisión', 17, 'Fundamentos en la toma de decisiones en la percepción por parte de los individuos', 1, 1),
	(19, 'Tácticas del Poder Organizacional', 17, 'Procedimientos formales e informales para integrar las actividades.', 2, 1),
	(20, 'Empowerment', 17, 'Importancia de la comunicación en la formulación y evaluación de proyectos', 3, 1);
/*!40000 ALTER TABLE `tema` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.tipocurso
DROP TABLE IF EXISTS `tipocurso`;
CREATE TABLE IF NOT EXISTS `tipocurso` (
  `idTipocurso` int(2) NOT NULL AUTO_INCREMENT,
  `descripcionTipocurso` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idTipocurso`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.tipocurso: ~2 rows (aproximadamente)
DELETE FROM `tipocurso`;
/*!40000 ALTER TABLE `tipocurso` DISABLE KEYS */;
INSERT INTO `tipocurso` (`idTipocurso`, `descripcionTipocurso`) VALUES
	(1, 'Normal'),
	(2, 'Cerfificación');
/*!40000 ALTER TABLE `tipocurso` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.tipomedalla
DROP TABLE IF EXISTS `tipomedalla`;
CREATE TABLE IF NOT EXISTS `tipomedalla` (
  `idTipomedalla` int(1) NOT NULL AUTO_INCREMENT,
  `descripcionTipomedalla` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `imagenTipomedalla` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idTipomedalla`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.tipomedalla: ~0 rows (aproximadamente)
DELETE FROM `tipomedalla`;
/*!40000 ALTER TABLE `tipomedalla` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipomedalla` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.tipopago
DROP TABLE IF EXISTS `tipopago`;
CREATE TABLE IF NOT EXISTS `tipopago` (
  `idTipopago` int(1) NOT NULL AUTO_INCREMENT,
  `descripcionTipopago` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idTipopago`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.tipopago: ~0 rows (aproximadamente)
DELETE FROM `tipopago`;
/*!40000 ALTER TABLE `tipopago` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipopago` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.tipotarjeta
DROP TABLE IF EXISTS `tipotarjeta`;
CREATE TABLE IF NOT EXISTS `tipotarjeta` (
  `idTipotarjeta` int(1) NOT NULL AUTO_INCREMENT,
  `idTipopago_Tipotarjeta` int(1) DEFAULT NULL,
  `bancoTipotarjeta` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idTipotarjeta`) USING BTREE,
  KEY `idTipopago_Tipotarjeta` (`idTipopago_Tipotarjeta`) USING BTREE,
  CONSTRAINT `idTipopago_Tipotarjeta` FOREIGN KEY (`idTipopago_Tipotarjeta`) REFERENCES `tipopago` (`idTipopago`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.tipotarjeta: ~0 rows (aproximadamente)
DELETE FROM `tipotarjeta`;
/*!40000 ALTER TABLE `tipotarjeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipotarjeta` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.usuario
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombreUsuario` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apellidopaternoUsuario` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apellidomaternoUsuario` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `correoUsuario` varchar(360) COLLATE utf8_unicode_ci DEFAULT NULL,
  `contrasenaUsuario` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `imagenUsuario` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `statusUsuario` int(1) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.usuario: ~4 rows (aproximadamente)
DELETE FROM `usuario`;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`idUsuario`, `nombreUsuario`, `apellidopaternoUsuario`, `apellidomaternoUsuario`, `correoUsuario`, `contrasenaUsuario`, `imagenUsuario`, `statusUsuario`) VALUES
	(1, 'Otro nombre', 'otro paterno', 'Otro materno', 'otro@correo.com', 'hola', '1-descarga (1).jpg', 1),
	(2, '', '', '', '', '', 'default.png', 1),
	(3, 'gerardo', 'Zamudio', 'Gonzalez', 'gerardozamudio45@hotmail.com', '123', 'default.png', 1),
	(4, 'a', 'a', 'a', 'molten.salt.emp@gmail.com', 'Prueba22', 'default.png', 1),
	(5, 'Marco Antonio', 'Alducin', 'Garcia', 'marco.alducin@cihumana.com.mx', 'MAAGaicrag1692', '', 1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.usuariopersonacurso
DROP TABLE IF EXISTS `usuariopersonacurso`;
CREATE TABLE IF NOT EXISTS `usuariopersonacurso` (
  `idUsuarioPersonaCurso` int(13) NOT NULL AUTO_INCREMENT,
  `idUsuario_UsuarioPersonaCurso` int(11) DEFAULT NULL,
  `idPersonaCurso_UsuarioPersonCurso` int(11) DEFAULT NULL,
  `avanceUsuarioPersonaCurso` double(5,2) DEFAULT NULL,
  `fechainicioUsuarioPersonaCurso` date DEFAULT NULL,
  `fechaTerminoUsuarioPersonaCurso` date DEFAULT NULL,
  `statusUsuarioPersonaCurso` int(1) DEFAULT NULL,
  PRIMARY KEY (`idUsuarioPersonaCurso`) USING BTREE,
  KEY `idUsuario_UsuarioPersonaCurso` (`idUsuario_UsuarioPersonaCurso`) USING BTREE,
  KEY `idPersonaCurso_UsuarioPersonaCurso` (`idPersonaCurso_UsuarioPersonCurso`) USING BTREE,
  CONSTRAINT `idPersonaCurso_UsuarioPersonaCurso` FOREIGN KEY (`idPersonaCurso_UsuarioPersonCurso`) REFERENCES `personacurso` (`idPersonaCurso`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idUsuario_UsuarioPersonaCurso` FOREIGN KEY (`idUsuario_UsuarioPersonaCurso`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.usuariopersonacurso: ~9 rows (aproximadamente)
DELETE FROM `usuariopersonacurso`;
/*!40000 ALTER TABLE `usuariopersonacurso` DISABLE KEYS */;
INSERT INTO `usuariopersonacurso` (`idUsuarioPersonaCurso`, `idUsuario_UsuarioPersonaCurso`, `idPersonaCurso_UsuarioPersonCurso`, `avanceUsuarioPersonaCurso`, `fechainicioUsuarioPersonaCurso`, `fechaTerminoUsuarioPersonaCurso`, `statusUsuarioPersonaCurso`) VALUES
	(3, 4, 3, 35.00, '2019-01-16', '2020-01-16', 1),
	(6, 1, 5, 58.00, '2019-01-16', '2019-07-24', 1),
	(7, 4, 5, 0.00, '2019-01-24', '2020-01-24', 1),
	(8, 1, 3, 0.00, '2019-02-06', '2020-02-06', 1),
	(15, 4, 4, NULL, '2019-06-06', '2020-06-06', 1),
	(18, 1, 4, 0.00, '2019-08-08', '2020-08-08', 1),
	(19, 5, 4, 0.00, '2019-12-13', '2020-12-13', 1),
	(20, 5, 5, 8.00, '2019-12-13', '2020-12-13', 1);
/*!40000 ALTER TABLE `usuariopersonacurso` ENABLE KEYS */;

-- Volcando estructura para tabla edutest2.usuariotema
DROP TABLE IF EXISTS `usuariotema`;
CREATE TABLE IF NOT EXISTS `usuariotema` (
  `idUsuariotema` int(11) NOT NULL AUTO_INCREMENT,
  `tema_idTema` int(20) NOT NULL,
  `usuario_idUsuario` int(11) NOT NULL,
  `numeroModulo` int(11) NOT NULL,
  `statusVisto` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idUsuariotema`) USING BTREE,
  KEY `fk_usuarioTema_tema1_idx` (`tema_idTema`) USING BTREE,
  KEY `fk_usuarioTema_usuario1_idx` (`usuario_idUsuario`) USING BTREE,
  CONSTRAINT `fk_usuarioTema_tema1` FOREIGN KEY (`tema_idTema`) REFERENCES `tema` (`idTema`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarioTema_usuario1` FOREIGN KEY (`usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Volcando datos para la tabla edutest2.usuariotema: ~7 rows (aproximadamente)
DELETE FROM `usuariotema`;
/*!40000 ALTER TABLE `usuariotema` DISABLE KEYS */;
INSERT INTO `usuariotema` (`idUsuariotema`, `tema_idTema`, `usuario_idUsuario`, `numeroModulo`, `statusVisto`) VALUES
	(1, 9, 1, 0, 1),
	(2, 10, 1, 0, 1),
	(3, 11, 1, 0, 1),
	(4, 12, 1, 1, 1),
	(5, 13, 1, 1, 1),
	(6, 14, 1, 1, 1),
	(7, 15, 1, 2, 1),
	(8, 9, 5, 0, 1);
/*!40000 ALTER TABLE `usuariotema` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
