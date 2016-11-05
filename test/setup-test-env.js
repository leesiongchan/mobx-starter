import browserEnv from 'browser-env';

// Skip cert verification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Simulate browser environment
browserEnv(['window', 'document', 'navigator']);

// Ignore CSS imports
require.extensions['.css'] = () => null;
