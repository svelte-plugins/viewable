describe('obstructions.spec.js', () => {
  const firstRule = '40% of the element was visible for at least 2 consecutive seconds. #whenFourtyForTwo';
  const secondRule = '50% of the element was visible for at least 4 consecutive seconds. #whenFiftyForFour';
  const thirdRule = '100% of the element was visible for at least 6 consecutive seconds. #whenHundredForSix';

  it('should detect obstructions and pause any rules that do not meet minimum viewable thresholds', () => {
    cy.scrollTo(0, 1300, { duration: 800 });

    cy.wait(500);

    cy.findByTestId('toggle-obstructions').click();

    cy.scrollTo(0, 800, { duration: 400 });

    cy.wait(1000);

    cy.scrollTo(0, 760, { duration: 800 });

    cy.findByTestId('middle').contains(firstRule);

    cy.wait(500);

    cy.viewport(420, 768);

    cy.scrollTo(0, 820, { duration: 800 });

    cy.wait(2000);

    cy.findByTestId('toggle-obstructions').click();

    cy.wait(3000);

    cy.findByTestId('middle').contains(secondRule);

    cy.wait(1000);

    cy.findByTestId('toggle-obstructions').click();

    cy.scrollTo(420, 820, { duration: 400 });

    cy.wait(1000);

    cy.viewport(1024, 768);

    cy.findByTestId('toggle-obstructions').click();

    cy.wait(6000);

    cy.findByTestId('middle').contains(thirdRule);
  });
});
