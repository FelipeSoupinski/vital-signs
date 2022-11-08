beforeEach(() => {
  cy.visit('http://localhost:8080/')
})

describe('empty spec', () => {
  it('Should have project title', () => {
    cy.get('[data-cy="project-title"]')
  })

  it('Should have projects button', () => {
    cy.get('[data-cy="projects"]')
  })

  it('Should have project register', () => {
    cy.get('[data-cy="project-register"]')
  })

  it('Should have a project search', () => {
    cy.get('[data-cy="project-search"]')
  })

})