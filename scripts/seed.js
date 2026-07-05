#!/usr/bin/env node

import { Pool } from 'pg';
import bcryptjs from 'bcryptjs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seedDatabase() {
  const client = await pool.connect();

  try {
    console.log('🌱 Seeding database...');

    // Create test user
    const passwordHash = await bcryptjs.hash('Test@1234', 10);
    const result = await client.query(
      `INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING id`,
      ['test@nexus.dev', 'Test User', passwordHash]
    );

    console.log(`  ✅ Created test user: test@nexus.dev`);
    console.log(`  🔑 Password: Test@1234`);
    console.log(`  📍 User ID: ${result.rows[0].id}`);

    console.log('✨ Database seeding completed!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await client.end();
    await pool.end();
  }
}

seedDatabase();
