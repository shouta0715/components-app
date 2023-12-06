import { AdapterAccount } from "@auth/core/adapters";
import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import {
  mysqlTable,
  index,
  primaryKey,
  unique,
  varchar,
  int,
  double,
  datetime,
  timestamp,
  boolean,
  text,
} from "drizzle-orm/mysql-core";

/* 
************************************************************
  Auth.js v5 schema 
************************************************************
 */

export const users = mysqlTable(
  "user",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("emailVerified", {
      mode: "date",
      fsp: 3,
    }).defaultNow(),
    image: varchar("image", { length: 255 }),
  },
  (table) => {
    return {
      userIdPk: primaryKey({ columns: [table.id], name: "User_id_pk" }),
      userEmailKey: unique("User_email_key").on(table.email),
    };
  }
);

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({
      columns: [vt.identifier, vt.token],
    }),
  })
);

/*
************************************************************
  App schema
************************************************************
*/

export const categories = mysqlTable(
  "category",
  {
    id: varchar("id", { length: 128 })
      .notNull()
      .$defaultFn(() => createId()),
    name: varchar("name", { length: 50 }).notNull(),
    description: text("description"),
  },
  (table) => {
    return {
      categoryIdPk: primaryKey({ columns: [table.id], name: "Category_id_pk" }),
      categoryNameKey: unique("Category_name_key").on(table.name),
    };
  }
);

export const codes = mysqlTable(
  "code",
  {
    id: varchar("id", { length: 128 })
      .notNull()
      .$defaultFn(() => createId()),
    fileId: varchar("file_id", { length: 128 }).notNull(),
    type: varchar("type", { length: 50 }).notNull(),
    componentId: varchar("component_id", { length: 128 }).notNull(),
  },
  (table) => {
    return {
      componentIdIdx: index("Code_component_id_idx").on(table.componentId),
      codeIdPk: primaryKey({ columns: [table.id], name: "Code_id_pk" }),
    };
  }
);

export const components = mysqlTable(
  "component",
  {
    id: varchar("id", { length: 128 })
      .notNull()
      .$defaultFn(() => createId()),
    creatorId: varchar("creator_id", { length: 255 }).notNull(),
    name: varchar("name", { length: 50 }).notNull(),
    description: text("description"),
    price: double("price").notNull().default(0),
    free: boolean("free").default(false).notNull(),
    createdAt: datetime("created_at", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .onUpdateNow()
      .notNull(),

    categoryId: varchar("category_id", { length: 128 }).notNull(),
  },
  (table) => {
    return {
      creatorIdIdx: index("Component_creator_id_idx").on(table.creatorId),
      nameIdx: index("Component_name_idx").on(table.name),
      categoryIdIdx: index("Component_category_id_idx").on(table.categoryId),
      componentIdPk: primaryKey({
        columns: [table.id],
        name: "Component_id_pk",
      }),
    };
  }
);

export const componentSets = mysqlTable(
  "componentSet",
  {
    id: varchar("id", { length: 128 })
      .notNull()
      .$defaultFn(() => createId()),
    creatorId: varchar("creator_id", { length: 255 }).notNull(),
    name: varchar("name", { length: 50 }).notNull(),
    description: text("description"),
    price: double("price").notNull().default(0),
    createdAt: datetime("created_at", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .onUpdateNow()
      .notNull(),
  },
  (table) => {
    return {
      componentSetIdPk: primaryKey({
        columns: [table.id],
        name: "ComponentSet_id_pk",
      }),
    };
  }
);

export const componentSetItems = mysqlTable(
  "componentSetItem",
  {
    id: int("id").autoincrement().notNull(),
    componentSetId: varchar("component_set_id", { length: 128 }).notNull(),
    componentId: varchar("component_id", { length: 128 }).notNull(),
  },
  (table) => {
    return {
      componentSetIdIdx: index("ComponentSetItem_component_set_id_idx").on(
        table.componentSetId
      ),
      componentIdIdx: index("ComponentSetItem_component_id_idx").on(
        table.componentId
      ),
      componentSetItemIdPk: primaryKey({
        columns: [table.id],
        name: "ComponentSetItem_id_pk",
      }),
    };
  }
);

export const dependencies = mysqlTable(
  "dependency",
  {
    id: varchar("id", { length: 128 })
      .notNull()
      .$defaultFn(() => createId()),
    name: varchar("name", { length: 50 }).notNull(),
    command: varchar("command", { length: 255 }).notNull(),
    codeId: varchar("code_id", { length: 128 }).notNull(),
  },
  (table) => {
    return {
      codeIdIdx: index("Dependency_code_id_idx").on(table.codeId),
      dependencyIdPk: primaryKey({
        columns: [table.id],
        name: "Dependency_id_pk",
      }),
      dependencyNameKey: unique("Dependency_name_key").on(table.name),
    };
  }
);

export const purchases = mysqlTable(
  "purchase",
  {
    id: int("id").autoincrement().notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    componentSetId: varchar("component_set_id", { length: 128 }),
    componentId: varchar("component_id", { length: 128 }),
    amount: double("amount").notNull().default(0),
    purchaseDate: datetime("purchase_date", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    stripeCheckoutSessionId: varchar("stripe_checkout_session_id", {
      length: 255,
    }),
    stripePaymentId: varchar("stripe_payment_id", { length: 255 }),
    paymentStatus: varchar("payment_status", { length: 255 }),
  },
  (table) => {
    return {
      componentSetIdIdx: index("Purchase_component_set_id_idx").on(
        table.componentSetId
      ),
      componentIdIdx: index("Purchase_component_id_idx").on(table.componentId),
      userIdIdx: index("Purchase_user_id_idx").on(table.userId),
      purchaseIdPk: primaryKey({ columns: [table.id], name: "Purchase_id_pk" }),
    };
  }
);

export const reviews = mysqlTable(
  "review",
  {
    id: int("id").autoincrement().notNull(),
    componentId: varchar("component_id", { length: 128 }).notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    rating: int("rating").notNull(),
    comment: varchar("comment", { length: 255 }),
    createdAt: datetime("created_at", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .onUpdateNow()
      .notNull(),
  },
  (table) => {
    return {
      componentIdIdx: index("Review_component_id_idx").on(table.componentId),
      userIdIdx: index("Review_user_id_idx").on(table.userId),
      reviewIdPk: primaryKey({ columns: [table.id], name: "Review_id_pk" }),
    };
  }
);
