// Environment variable validation and utilities
export const validateEnvironment = () => {
  const requiredEnvVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ];

  const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }
};

// Get environment variables with validation
export const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value || defaultValue!;
};

// Supabase environment variables
export const supabaseConfig = {
  url: getEnvVar('VITE_SUPABASE_URL'),
  anonKey: getEnvVar('VITE_SUPABASE_ANON_KEY'),
};

// Validate environment on module load
validateEnvironment();