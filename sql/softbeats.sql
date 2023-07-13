-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 13/07/2023 às 19:00
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `softbeats`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `neighborhood` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `complement` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `address`
--

INSERT INTO `address` (`id`, `client_id`, `cep`, `state`, `city`, `neighborhood`, `street`, `number`, `complement`) VALUES
(2, 49, '16050-630', 'SP', 'Araçatuba', 'Dona Amélia', 'Carlos de Campos', '552', ''),
(4, 53, '16050-630', 'SP', 'Araçatuba', 'Dona Amélia', 'Carlos de Campos', '552', ''),
(5, 54, '16050600', 'SP', 'Araçatuba', 'Dona Amélia', 'Rua Álvares de Azevedo', '300', 'de 382/383 a 1270/1271');

-- --------------------------------------------------------

--
-- Estrutura para tabela `beats`
--

CREATE TABLE `beats` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `gender_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `audio` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `beats`
--

INSERT INTO `beats` (`id`, `user_id`, `category_id`, `gender_id`, `description`, `name`, `image`, `audio`) VALUES
(1, 1, 10, 4, 'Beat brabo.', 'Beat do Mario', 'https://img.elo7.com.br/product/zoom/F2478F/adesivo-quadrado-5x5-cm-adesivo-quadrado.jpg', 'http://localhost:3001/uploads/5a714ed544fcc84363d536d235177468.mp3'),
(2, 1, 10, 4, 'teste', 'Mario 2', 'https://m.media-amazon.com/images/I/51iepufy27S._AC_UF894,1000_QL80_.jpg', 'http://localhost:3001/uploads/e1a7973c9116eb6a1e0dfb510acd1c66.mp3');

-- --------------------------------------------------------

--
-- Estrutura para tabela `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double(10,2) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categories`
--

INSERT INTO `categories` (`id`, `user_id`, `name`, `price`, `description`) VALUES
(2, 1, 'Secundária', 40.00, 'Descrição teste 2!'),
(7, 10, 'Lease', 80.00, 'Beat lease'),
(8, 10, 'Exclusivo', 300.00, 'Beat exclusivo'),
(9, 10, 'Encomenda', 1000.00, 'Beat por encomenda'),
(10, 1, 'Lease', 80.00, 'Beat lease'),
(11, 1, 'Exclusivo', 300.00, 'Beat exclusivo');

-- --------------------------------------------------------

--
-- Estrutura para tabela `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `instagram` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `clients`
--

INSERT INTO `clients` (`id`, `user_id`, `name`, `email`, `telephone`, `instagram`) VALUES
(49, 1, 'Teste Para retornar', 'adoviado@gmail.com', '(18) 64646-6464', '@duadoviado'),
(53, 1, 'Teste Para retornar', 'adoviado@gmail.com', '(18) 64646-6464', '@duadoviado'),
(54, 1, 'Villy Oliveira Rosa', 'villy@hotmail.com', '18988169921', '@villyrosa');

-- --------------------------------------------------------

--
-- Estrutura para tabela `genders`
--

CREATE TABLE `genders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `genders`
--

INSERT INTO `genders` (`id`, `user_id`, `name`, `description`) VALUES
(2, 1, 'Terror', 'TESTEEEEE'),
(4, 1, 'Trap', 'Gênero foda');

-- --------------------------------------------------------

--
-- Estrutura para tabela `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `beat_id` int(11) NOT NULL,
  `price` double(10,2) NOT NULL,
  `datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Villy Oliveira Rosa', 'villyrosa@gmail.com', '$2b$10$tBSjrX/fHp5k7Jz1xPZ.8O965rBcuDVlhHeglpSXQTXq8P8LUB5zi'),
(10, 'teste', 'teste@gmail.com', '$2b$10$jylSntwwhCaqaYeGvJfUNuir5Hyk4Oa9YFtVpuS2ofiVC0C.CeifC');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `address_ibfk_1` (`client_id`);

--
-- Índices de tabela `beats`
--
ALTER TABLE `beats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `gender_id` (`gender_id`);

--
-- Índices de tabela `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clients_ibfk_1` (`user_id`);

--
-- Índices de tabela `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `beat_id` (`beat_id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `beats`
--
ALTER TABLE `beats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de tabela `genders`
--
ALTER TABLE `genders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`);

--
-- Restrições para tabelas `beats`
--
ALTER TABLE `beats`
  ADD CONSTRAINT `beats_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `beats_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `beats_ibfk_3` FOREIGN KEY (`gender_id`) REFERENCES `genders` (`id`);

--
-- Restrições para tabelas `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Restrições para tabelas `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Restrições para tabelas `genders`
--
ALTER TABLE `genders`
  ADD CONSTRAINT `genders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Restrições para tabelas `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`),
  ADD CONSTRAINT `sales_ibfk_3` FOREIGN KEY (`beat_id`) REFERENCES `beats` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
