import { defineConfig } from 'cypress'
const sqlServer = require('cypress-sql-server')
//import '@cypress/code-coverage/support'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //require('@cypress/code-coverage/task')(on, config)
      // allows db data to be accessed in tests
      const dbSettings = {
        userName: 'test',
        password: 'test',
        server: '127.0.0.1',
        options: {
          database: 'reise-app',
          rowCollectionOnRequestCompletion: true,
          trustedConnection: true,
          multipleActiveResultSets: true,
          trustServerCertificate: true,
        },
      }

      // code from /plugins/index.js
      const tasks = sqlServer.loadDBPlugin(dbSettings)
      on('task', tasks)

      return config
    },
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
