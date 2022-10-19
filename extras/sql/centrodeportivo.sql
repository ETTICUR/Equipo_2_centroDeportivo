-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2022 a las 00:56:00
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


DROP DATABASE IF EXISTS centrodeportivo;
CREATE DATABASE centrodeportivo;
USE centrodeportivo;

--
-- Base de datos: `centrodeportivo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `afternoonshift_productos`
--

CREATE TABLE `afternoonshift_productos` (
  `id` int(11) NOT NULL,
  `horaTurno` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `afternoonshift_productos`
--

INSERT INTO `afternoonshift_productos` (`id`, `horaTurno`) VALUES
(1, 'de 14:00Hs a 15:00Hs'),
(2, 'de 15:00Hs a 16:00Hs'),
(3, 'de 16:00Hs a 17:00Hs'),
(4, 'de 17:00Hs a 18:00Hs'),
(5, 'Sin turnos por la tarde');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_producto`
--

CREATE TABLE `categoria_producto` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria_producto`
--

INSERT INTO `categoria_producto` (`id`, `name`) VALUES
(1, 'Aeróbico'),
(2, 'Combinado'),
(3, 'Relax'),
(4, 'Fuerza'),
(6, 'Recuperación');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE `generos` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`id`, `name`) VALUES
(1, 'Masculino'),
(2, 'Femenino'),
(3, 'Otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `morningshift_productos`
--

CREATE TABLE `morningshift_productos` (
  `id` int(11) NOT NULL,
  `horaTurno` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `morningshift_productos`
--

INSERT INTO `morningshift_productos` (`id`, `horaTurno`) VALUES
(1, 'de 08:00Hs a 09:00Hs'),
(2, 'de 09:00Hs a 10:00Hs'),
(3, 'de 10:00Hs a 11:00Hs'),
(4, 'de 11:00Hs a 12:00Hs'),
(5, 'Sin turnos por la mañana');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nigthshift_productos`
--

CREATE TABLE `nigthshift_productos` (
  `id` int(11) NOT NULL,
  `horaTurno` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `nigthshift_productos`
--

INSERT INTO `nigthshift_productos` (`id`, `horaTurno`) VALUES
(1, 'de 18:00Hs a 19:00Hs'),
(2, 'de 19:00Hs a 20:00Hs'),
(3, 'de 20:00Hs a 21:00Hs'),
(4, 'de 21:00Hs a 22:00Hs'),
(5, 'Sin turnos por la noche');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `id_category` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `id_morningShift` int(11) NOT NULL,
  `id_afternoonShift` int(11) NOT NULL,
  `id_nigthShift` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `name`, `id_category`, `price`, `image`, `description`, `id_morningShift`, `id_afternoonShift`, `id_nigthShift`) VALUES
(17, ' YOGA        ', 3, 6000, '/images/products/yoga.png', 'Es una práctica que conecta el cuerpo, la respiración y la mente. Esta práctica utiliza posturas físicas, ejercicios de respiración y meditación para mejorar la salud general.', 1, 5, 1),
(18, '     FUNCIONAL     ', 1, 5000, '/images/products/funcional.png', 'El entrenamiento funcional se basa en realizar ejercicios que se adaptan a los movimientos naturales del cuerpo humano para trabajar de forma global músculos y articulaciones combinando el entrenamiento de fuerza con aeróbico en circuito combinados.', 5, 4, 4),
(20, 'CROSS TRAINNING', 1, 5000, '/images/products/coreTrainning.png', 'Es un tipo de entrenamiento en el que se realizan diversos ejercicios de diferentes disciplinas (halterofilia, atletismo y gimnasia, entre otros) que se ejecutan de forma mecánica y controlada para introducir nuevos movimientos, siempre intentando evitar lesiones.', 1, 2, 5),
(21, 'MUSCULACIÓN', 2, 3500, '/images/products/pesas.png', 'Es una actividad física basada generalmente en ejercicio físico de media a alta intensidad, con la finalidad encontrar un equilibrio muscular entre los segmentos corporales, generalmente realizando estímulos anaeróbicos.', 2, 4, 4),
(22, 'PILETA', 1, 4000, '/images/products/pileta.png', 'Los ejercicios se hacen sumergidos, aquí se practican sobre tablas flotantes llamadas AquaBase sobre las que los usuarios se balancean mientras cumplen con su rutina.', 1, 2, 2),
(23, 'CROSSFIT', 4, 6500, '/images/products/crossfit.png', 'CrossFit se define como un sistema de entrenamiento de fuerza y acondicionamiento basado en ejercicios funcionales constantemente variados realizados a una alta intensidad.', 2, 3, 4),
(24, 'ZUMBA', 1, 5200, '/images/products/zumba.png', 'Es una disciplina deportiva que se imparte en clases dirigidas en la que se realizan ejercicios aeróbicos al ritmo de música latina (merengue, samba, reggaeton, cumbia y salsa) con la finalidad de perder peso de forma divertida.', 2, 3, 5),
(25, '  REHABILITACIÓN  ', 6, 4500, '/images/products/rehabilitacion.png', 'Cuidado que usted recibe para recuperar, mantener o mejorar las capacidades físicas que necesita para la vida diaria pérdidas por enfermedad, accidentes o por efectos secundarios de algún tratamiento médico.', 1, 5, 1),
(26, 'SPINNING', 1, 4800, '/images/products/spinning.png', 'Es un ejercicio aeróbico y cardiovascular que se realiza sobre una bicicleta estática en el que se trabaja el tren inferior: las piernas y los glúteos. Su finalidad principal es perder peso y la tonificación de los músculos, además de mejorar la fuerza y la resistencia.', 3, 2, 3),
(27, 'ADULTO MAYOR', 4, 3600, '/images/products/adultoMayor.png', 'Actividad formada por una serie de ejercicios especialmente diseñados para ejercitar todas las partes del cuerpo. Son actividades de resistencia, o aeróbicas, cuyo fin es incrementar capacidad respiratoria, cardíaca y muscular.', 2, 2, 5),
(28, 'STEP', 1, 4000, '/images/products/step.png', 'El trabajo con step es un ejercicio aeróbico que se basa en subir y bajar a dicha plataforma siguiendo el ritmo de la música y realizando, al mismo tiempo, una serie de pasos o coreografías.', 4, 4, 2),
(29, 'STRONG', 1, 5000, '/images/products/strong.png', 'Ha sido creado por los mismos creadores del zumba, pero con algunas diferencias. Los ejercicios que se practican en el strong van dirigidos a quemar grasa, construir masa muscular y tonificar todo el cuerpo, especialmente las abdominales, piernas y glúteos.', 2, 2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_eliminados`
--

CREATE TABLE `productos_eliminados` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `id_category` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `id_morningShift` int(11) NOT NULL,
  `id_afternoonShift` int(11) NOT NULL,
  `id_nigthShift` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` char(20) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `id_genero` int(11) NOT NULL,
  `edad` int(11) NOT NULL,
  `id_actividad` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `fotoPerfil` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `passwordConfirm` varchar(200) NOT NULL,
  `condiciones` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `id_genero`, `edad`, `id_actividad`, `email`, `fotoPerfil`, `password`, `passwordConfirm`, `condiciones`) VALUES
('02578bd2-d48f-4d79-8', 'Marcela', 'Viano', 2, 52, 3, 'marcelaviano@gmail.com', '/images/users/1665675575257_user.jpg', '$2a$10$/BRaVpUOQh0HhQw./oQ7ceaIrkIy6CwICXHupEtOzhjbtz2bQ3RUe', '$2a$10$64M1lJ3Rgi5o52oMS298duArPuo0Pm016mpIoicV3mrYm.UtCoq4q', 'on'),
('2a5eceb5-7007-463e-a', 'Luciano Ezequiel', 'Festa', 3, 30, 2, 'lucianoefesta@hotmail.com', '/images/users/1665672668131_user.jpg', '$2a$10$3/1OnvIrP4wiQeSqQX.XwuDWtdJpsriFFqPcGaZFjzaElakrh28GS', '$2a$10$z/T8wfu2uISA059SmpT8OeH0GHlq/KyE.zmqp0sLsIWgdJZyb1.vO', 'on'),
('ab508ce6-b352-430e-b', 'admin', 'admin', 3, 99, 2, 'admin@centrodeportivo.com.ar', '/images/users/1665760911603_user.png', '$2a$10$BC6MIUeeTjBIE7RVLTUUTeiekLZ8QINxI1grTxvSRATbIJNSHn2hi', '$2a$10$V.M3tMtRdBbW7pDvRxZGG.f4GB91/QNC6YkfLQxQthmRtnRypEPPC', 'on'),
('eb6bf5ce-29de-4b24-9', 'Lucas Manuel', 'Festa', 1, 29, 2, 'lucasfesta@hotmail.es', '/images/users/1665672740010_user.png', '$2a$10$sDyTFIdHVrsddlZ2tKA1s.KDuw5aDpVVwC1pe2We1ovyfP2d0Ioqi', '$2a$10$J2eAO0cd1.dMxnPODSlwJek3E/Svby0HcaJIB4eaCB7gFrtOWu/Om', 'on');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `afternoonshift_productos`
--
ALTER TABLE `afternoonshift_productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categoria_producto`
--
ALTER TABLE `categoria_producto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `morningshift_productos`
--
ALTER TABLE `morningshift_productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `nigthshift_productos`
--
ALTER TABLE `nigthshift_productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_morningShift` (`id_morningShift`),
  ADD KEY `id_afternoonShift` (`id_afternoonShift`),
  ADD KEY `id_nigthShift` (`id_nigthShift`),
  ADD KEY `id_category` (`id_category`);

--
-- Indices de la tabla `productos_eliminados`
--
ALTER TABLE `productos_eliminados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`),
  ADD KEY `id_morningShift` (`id_morningShift`),
  ADD KEY `id_afternoonShift` (`id_afternoonShift`),
  ADD KEY `id_nigthShift` (`id_nigthShift`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_genero` (`id_genero`),
  ADD KEY `id_actividad` (`id_actividad`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `afternoonshift_productos`
--
ALTER TABLE `afternoonshift_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `categoria_producto`
--
ALTER TABLE `categoria_producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `morningshift_productos`
--
ALTER TABLE `morningshift_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `nigthshift_productos`
--
ALTER TABLE `nigthshift_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `categoria_producto` (`id`),
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_morningShift`) REFERENCES `morningshift_productos` (`id`),
  ADD CONSTRAINT `productos_ibfk_3` FOREIGN KEY (`id_afternoonShift`) REFERENCES `afternoonshift_productos` (`id`),
  ADD CONSTRAINT `productos_ibfk_4` FOREIGN KEY (`id_nigthShift`) REFERENCES `nigthshift_productos` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_genero`) REFERENCES `generos` (`id`),
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`id_actividad`) REFERENCES `categoria_producto` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
