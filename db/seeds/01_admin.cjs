/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
exports.seed = async function(knex) {
  // creates admin user
  const adminEmail = 'admin@email.com';
  const adminName = 'superAdmin';
  const adminPassword = 'password';

  const checkExistingAdmin = await knex("users").where({email: adminEmail}).first();
  if(checkExistingAdmin) {
    console.log("Admin already exists");
    return;
  }
  const passowrdHash = await bcrypt.hash(adminPassword, SALT_ROUNDS);

  // insert admin user into db
  await knex("users").insert({
    name: adminName,
    email: adminEmail,
    role: "admin",
    password_hash: passowrdHash
  })

  console.log("Admin created successfully")
};
