// ResQ — Supabase connection (browser-safe values only).
// 1. Copy this file to `config.js` (config.js is git-ignored).
// 2. Paste your values from Supabase → Project Settings → API Keys.
//
// Use ONLY the Project URL and the *publishable* (anon) key here.
// NEVER put the secret / service-role key or the database password in any frontend file.
window.RESQ_CONFIG = {
  SUPABASE_URL: "PASTE_PROJECT_URL_HERE",            // e.g. https://your-project-ref.supabase.co
  SUPABASE_ANON_KEY: "PASTE_PUBLISHABLE_KEY_HERE"    // e.g. sb_publishable_...
};
