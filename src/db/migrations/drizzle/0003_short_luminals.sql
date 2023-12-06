ALTER TABLE `code` RENAME COLUMN `url` TO `file_id`;--> statement-breakpoint
ALTER TABLE `code` MODIFY COLUMN `type` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `code` MODIFY COLUMN `file_id` varchar(128) NOT NULL;