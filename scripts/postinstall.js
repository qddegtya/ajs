// This script runs after npm install
// It's designed to be safe and not cause installation failures

// Only run in development environment
if (process.env.NODE_ENV === 'development') {
  try {
    // You can add development-only setup here
    console.log('AJS development environment setup completed')
  } catch (error) {
    // Never fail the installation
    console.warn('Optional development setup skipped:', error.message)
  }
}
