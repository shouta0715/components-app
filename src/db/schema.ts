import { AdapterAccount } from "@auth/core/adapters";
import { sql } from "drizzle-orm";
import {
  mysqlTable,
  index,
  primaryKey,
  unique,
  varchar,
  text,
  int,
  double,
  tinyint,
  datetime,
  timestamp,
} from "drizzle-orm/mysql-core";

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
export const categories = mysqlTable(
  "category",
  {
    id: varchar("id", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    description: varchar("description", { length: 191 }),
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
    id: varchar("id", { length: 191 }).notNull(),
    url: varchar("url", { length: 256 }).notNull(),
    type: varchar("type", { length: 256 }).notNull(),
    componentId: varchar("component_id", { length: 191 }).notNull(),
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
    id: varchar("id", { length: 191 }).notNull(),
    creatorId: varchar("creator_id", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    description: varchar("description", { length: 191 }),
    price: double("price").notNull(),
    free: tinyint("free").default(0).notNull(),
    createdAt: datetime("created_at", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime("updated_at", { mode: "string", fsp: 3 }).notNull(),
    categoryId: varchar("category_id", { length: 191 }).notNull(),
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
    id: varchar("id", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    description: varchar("description", { length: 191 }),
    price: double("price").notNull(),
    createdAt: datetime("created_at", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime("updated_at", { mode: "string", fsp: 3 }).notNull(),
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
    componentSetId: varchar("component_set_id", { length: 191 }).notNull(),
    componentId: varchar("component_id", { length: 191 }).notNull(),
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
    id: varchar("id", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    command: varchar("command", { length: 191 }).notNull(),
    codeId: varchar("code_id", { length: 191 }).notNull(),
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

export const plans = mysqlTable(
  "plan",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    description: text("description").notNull(),
    price: double("price").notNull(),
    createdAt: datetime("created_at", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime("updated_at", { mode: "string", fsp: 3 }).notNull(),
  },
  (table) => {
    return {
      planIdPk: primaryKey({ columns: [table.id], name: "Plan_id_pk" }),
    };
  }
);

export const purchases = mysqlTable(
  "purchase",
  {
    id: int("id").autoincrement().notNull(),
    userId: varchar("user_id", { length: 191 }).notNull(),
    componentSetId: varchar("component_set_id", { length: 191 }),
    componentId: varchar("component_id", { length: 191 }),
    amount: double("amount").notNull(),
    purchaseDate: datetime("purchase_date", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    stripeCheckoutSessionId: varchar("stripe_checkout_session_id", {
      length: 191,
    }),
    stripePaymentId: varchar("stripe_payment_id", { length: 191 }),
    paymentStatus: varchar("payment_status", { length: 191 }),
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
    componentId: varchar("component_id", { length: 191 }).notNull(),
    userId: varchar("user_id", { length: 191 }).notNull(),
    rating: int("rating").notNull(),
    comment: varchar("comment", { length: 191 }),
    createdAt: datetime("created_at", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime("updated_at", { mode: "string", fsp: 3 }).notNull(),
  },
  (table) => {
    return {
      componentIdIdx: index("Review_component_id_idx").on(table.componentId),
      userIdIdx: index("Review_user_id_idx").on(table.userId),
      reviewIdPk: primaryKey({ columns: [table.id], name: "Review_id_pk" }),
    };
  }
);

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),

  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const userSubscriptions = mysqlTable(
  "userSubscription",
  {
    id: int("id").autoincrement().notNull(),
    userId: varchar("user_id", { length: 191 }).notNull(),
    planId: int("plan_id").notNull(),
    startDate: datetime("start_date", { mode: "string", fsp: 3 }).notNull(),
    endDate: datetime("end_date", { mode: "string", fsp: 3 }),
    status: varchar("status", { length: 191 }).notNull(),
    createdAt: datetime("created_at", { mode: "string", fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime("updated_at", { mode: "string", fsp: 3 }).notNull(),
    stripeCheckoutSessionId: varchar("stripe_checkout_session_id", {
      length: 191,
    }),
    stripePaymentId: varchar("stripe_payment_id", { length: 191 }),
    paymentStatus: varchar("payment_status", { length: 191 }),
  },
  (table) => {
    return {
      userIdIdx: index("UserSubscription_user_id_idx").on(table.userId),
      planIdIdx: index("UserSubscription_plan_id_idx").on(table.planId),
      userSubscriptionIdPk: primaryKey({
        columns: [table.id],
        name: "UserSubscription_id_pk",
      }),
    };
  }
);

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);
