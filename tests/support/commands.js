// https://github.com/testing-library/cypress-testing-library
import '@testing-library/cypress/add-commands';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loadApp', () => {
  cy.visit('http://localhost:3000');
});

Cypress.Commands.add('isInViewport', { prevSubject: true }, (subject) => {
  const bottom = Cypress.$(cy.state('window')).height();
  const rect = subject[0].getBoundingClientRect();

  expect(rect.top).to.be.greaterThan(0);
  expect(rect.top).not.to.be.greaterThan(bottom);
  expect(rect.bottom).to.be.greaterThan(0);
  expect(rect.bottom).not.to.be.greaterThan(bottom);

  return subject;
});

Cypress.Commands.add('isNotInViewport', { prevSubject: true }, (subject) => {
  const bottom = Cypress.$(cy.state('window')).height();
  const rect = subject[0].getBoundingClientRect();

  expect(rect.top).to.be.greaterThan(bottom);
  expect(rect.bottom).to.be.greaterThan(bottom);
  expect(rect.bottom).to.be.greaterThan(bottom);

  return subject;
});
