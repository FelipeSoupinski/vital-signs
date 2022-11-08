describe('empty spec', () => {
  it('Should have project title', () => {
    cy.visit('http://localhost:8080/')
    cy.get('[data-cy="project-title"]')
  })
})