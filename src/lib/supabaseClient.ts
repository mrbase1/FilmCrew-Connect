import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kjzrfzloqnzgfgmzzrsi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqenJmemxvcW56Z2ZnbXp6cnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0NjU5OTEsImV4cCI6MjA0NTA0MTk5MX0.9hvpg-T5_uVfcAxIw73kTlXre9_L096WF-cwTE7S1U8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);