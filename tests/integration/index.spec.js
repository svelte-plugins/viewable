const testConfig = {
  retries: {
    runMode: 3,
    openMode: 0
  }
};

describe('viewable.spec.js', testConfig, () => {
  it('should load the viewer', () => {
    cy.get('#obstructions').then((element) => expect(element).to.exist);
  });
});
