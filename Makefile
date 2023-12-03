DB_URL=mysql://root:root@localhost:3306/ui-trade?charset=utf8mb4&parseTime=True&loc=Local

introspect:
	npx drizzle-kit introspect:mysql --config=drizzle.config.ts

generate:
	npx drizzle-kit generate:mysql --config=drizzle.config.ts

migrate:
	pnpm tsx src/db/migrate.ts

.PHONY: introspect migrate
