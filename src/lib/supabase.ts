import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: any;

if (!supabaseUrl || !supabaseAnonKey) {
  if (!import.meta.env.PROD) {
    // In development, provide a stub to avoid crashes
    console.warn('⚠️ Supabase credentials not found. Using stub client for development.');
    
    // Create a chainable query builder stub
    const createQueryBuilder = () => ({
      select: () => createQueryBuilder(),
      eq: () => createQueryBuilder(),
      order: () => createQueryBuilder(),
      limit: () => createQueryBuilder(),
      single: async () => ({ data: null, error: null }),
      then: async () => ({ data: null, error: null }),
    });

    supabase = {
      from: () => ({
        select: () => createQueryBuilder(),
        insert: async () => ({ data: null, error: null }),
        update: async () => ({ data: null, error: null }),
        delete: async () => ({ error: null }),
      }),
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signOut: async () => ({ error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      channel: () => ({
        on: function() { return this; },
        subscribe: function() { 
          return { 
            unsubscribe: async () => {} 
          }; 
        },
        unsubscribe: async () => {},
      }),
      storage: {
        from: () => ({
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
          download: async () => ({ data: null, error: null }),
          upload: async () => ({ data: null, error: null }),
        }),
      },
    };
  } else {
    throw new Error('Missing Supabase credentials in environment variables');
  }
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
