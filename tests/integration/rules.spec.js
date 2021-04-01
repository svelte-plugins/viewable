describe('rules.spec.js', () => {
  const firstRule = '40% of the element was visible for at least 2 consecutive seconds. #whenFourtyForTwo';
  const secondRule = '50% of the element was visible for at least 4 consecutive seconds. #whenFiftyForFour';
  const thirdRule = '100% of the element was visible for at least 6 consecutive seconds. #whenHundredForSix';

  it('should execute all rules', () => {
    cy.scrollTo(0, 1300, { duration: 800 });

    cy.wait(500);

    cy.scrollTo(0, 800, { duration: 400 });

    cy.findByTestId('middle').contains(firstRule);

    cy.wait(1000);

    cy.scrollTo(0, 10, { duration: 800 });

    cy.wait(1000);

    cy.findByTestId('top').contains(firstRule);

    cy.scrollTo(0, 1600, { duration: 800 });

    cy.findByTestId('bottom').contains(firstRule);

    cy.wait(4000);

    cy.findByTestId('bottom').contains(secondRule);

    cy.findByTestId('bottom').contains(thirdRule);

    cy.scrollTo(0, 500, { duration: 800 });

    cy.wait(3000);

    cy.findByTestId('top').contains(secondRule);

    cy.findByTestId('middle').contains(secondRule);

    cy.scrollTo(0, 480, { duration: 1000 });

    cy.wait(3000);

    cy.findByTestId('top').contains(thirdRule);

    cy.scrollTo(0, 640, { duration: 1000 });

    cy.wait(6000);

    cy.findByTestId('middle').contains(thirdRule);
  });
});
