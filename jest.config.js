module.exports = {
  globalSetup: "jest-pg/src/setupDatabase",
  globalTeardown: "jest-pg/src/teardownDatabase"
}