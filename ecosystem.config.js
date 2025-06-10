module.exports = {
  apps: [
    {
      name: 'ingest-api',
      script: './dist/apps/ingest-api/main.js',
    },
    {
      name: 'event-processor',
      script: './dist/apps/event-processor/main.js',
    },
  ],
};
