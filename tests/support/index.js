// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';

const path = require('path');
const fileName = path.basename(Cypress.spec.name, path.extname(Cypress.spec.name));
const videosFolder = Cypress.config('videosFolder').replace(/\\/g, '/');
const artifacts = path.join(videosFolder, '../cdplogs');

beforeEach(() => {
  cy.log('Loading...');
  cy.loadApp();
});

afterEach(() => {
  cy.task('storeConsoleLogs', path.join(artifacts, `${fileName}.log`));
  cy.task('storeNetworkLogs', path.join(artifacts, `${fileName}.log`));
});
