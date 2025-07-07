/* global jest */
process.env.EXPO_PUBLIC_SUPABASE_URL = 'https://argdofipbptqofwrlgyn.supabase.co';
process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZ2RvZmlwYnB0cW9md3JsZ3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMDkwNzEsImV4cCI6MjA2Njg4NTA3MX0.geQpHmOXvh9-AwVrVO4Yqs8IPNC-MAUsif7g4cQ3GYc';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
