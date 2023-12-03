CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(2048),
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` varchar(191),
	CONSTRAINT `Category_id_pk` PRIMARY KEY(`id`),
	CONSTRAINT `Category_name_key` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `code` (
	`id` varchar(191) NOT NULL,
	`url` varchar(256) NOT NULL,
	`type` varchar(256) NOT NULL,
	`component_id` varchar(191) NOT NULL,
	CONSTRAINT `Code_id_pk` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `componentSetItem` (
	`id` int AUTO_INCREMENT NOT NULL,
	`component_set_id` varchar(191) NOT NULL,
	`component_id` varchar(191) NOT NULL,
	CONSTRAINT `ComponentSetItem_id_pk` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `componentSet` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` varchar(191),
	`price` double NOT NULL,
	`created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `ComponentSet_id_pk` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `component` (
	`id` varchar(191) NOT NULL,
	`creator_id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` varchar(191),
	`price` double NOT NULL,
	`free` tinyint NOT NULL DEFAULT 0,
	`created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updated_at` datetime(3) NOT NULL,
	`category_id` varchar(191) NOT NULL,
	CONSTRAINT `Component_id_pk` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dependency` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`command` varchar(191) NOT NULL,
	`code_id` varchar(191) NOT NULL,
	CONSTRAINT `Dependency_id_pk` PRIMARY KEY(`id`),
	CONSTRAINT `Dependency_name_key` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `plan` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text NOT NULL,
	`price` double NOT NULL,
	`created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `Plan_id_pk` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `purchase` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`component_set_id` varchar(191),
	`component_id` varchar(191),
	`amount` double NOT NULL,
	`purchase_date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`stripe_checkout_session_id` varchar(191),
	`stripe_payment_id` varchar(191),
	`payment_status` varchar(191),
	CONSTRAINT `Purchase_id_pk` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `review` (
	`id` int AUTO_INCREMENT NOT NULL,
	`component_id` varchar(191) NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`rating` int NOT NULL,
	`comment` varchar(191),
	`created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `Review_id_pk` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `userSubscription` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(191) NOT NULL,
	`plan_id` int NOT NULL,
	`start_date` datetime(3) NOT NULL,
	`end_date` datetime(3),
	`status` varchar(191) NOT NULL,
	`created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updated_at` datetime(3) NOT NULL,
	`stripe_checkout_session_id` varchar(191),
	`stripe_payment_id` varchar(191),
	`payment_status` varchar(191),
	CONSTRAINT `UserSubscription_id_pk` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT (now()),
	`image` varchar(255),
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `User_email_key` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE INDEX `Code_component_id_idx` ON `code` (`component_id`);--> statement-breakpoint
CREATE INDEX `ComponentSetItem_component_set_id_idx` ON `componentSetItem` (`component_set_id`);--> statement-breakpoint
CREATE INDEX `ComponentSetItem_component_id_idx` ON `componentSetItem` (`component_id`);--> statement-breakpoint
CREATE INDEX `Component_creator_id_idx` ON `component` (`creator_id`);--> statement-breakpoint
CREATE INDEX `Component_name_idx` ON `component` (`name`);--> statement-breakpoint
CREATE INDEX `Component_category_id_idx` ON `component` (`category_id`);--> statement-breakpoint
CREATE INDEX `Dependency_code_id_idx` ON `dependency` (`code_id`);--> statement-breakpoint
CREATE INDEX `Purchase_component_set_id_idx` ON `purchase` (`component_set_id`);--> statement-breakpoint
CREATE INDEX `Purchase_component_id_idx` ON `purchase` (`component_id`);--> statement-breakpoint
CREATE INDEX `Purchase_user_id_idx` ON `purchase` (`user_id`);--> statement-breakpoint
CREATE INDEX `Review_component_id_idx` ON `review` (`component_id`);--> statement-breakpoint
CREATE INDEX `Review_user_id_idx` ON `review` (`user_id`);--> statement-breakpoint
CREATE INDEX `UserSubscription_user_id_idx` ON `userSubscription` (`user_id`);--> statement-breakpoint
CREATE INDEX `UserSubscription_plan_id_idx` ON `userSubscription` (`plan_id`);