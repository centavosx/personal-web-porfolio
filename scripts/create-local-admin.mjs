// Creates the admin login for the local Docker stack. Never used in production.
//
//   node scripts/create-local-admin.mjs
import { createHmac } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const URL = "http://localhost:54321";
const EMAIL = "admin@portfolio.test";
const PASSWORD = "local-admin-password";
// Supabase's published demo secret, as set in docker-compose.yml.
const JWT_SECRET = "super-secret-jwt-token-with-at-least-32-characters-long";

const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
const unsigned = `${encode({ alg: "HS256", typ: "JWT" })}.${encode({ role: "service_role", iss: "supabase-demo", exp: 1983812996 })}`;
const serviceKey = `${unsigned}.${createHmac("sha256", JWT_SECRET).update(unsigned).digest("base64url")}`;

const client = createClient(URL, serviceKey, { auth: { persistSession: false } });

const { data: created, error: createError } = await client.auth.admin.createUser({
  email: EMAIL,
  password: PASSWORD,
  email_confirm: true,
});

let userId = created?.user?.id;
if (createError) {
  const { data, error } = await client.auth.admin.listUsers();
  if (error) throw error;
  userId = data.users.find((user) => user.email === EMAIL)?.id;
  if (!userId) throw createError;
}

const { error } = await client.from("admin").upsert({ user_id: userId });
if (error) throw error;

console.log(`Local admin ready: ${EMAIL} / ${PASSWORD}`);
