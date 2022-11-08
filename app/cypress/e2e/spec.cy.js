beforeEach(() => {
  cy.visit('http://localhost:8080/')
})

describe('Should have items', () => {
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

  it('Should have a project list', () => {
    cy.get('[data-cy="projects-list"]')
  })

})

describe('Should search items', () => {
  it('Should search a project', () => {
    cy.get('[data-cy="project-search"]').type('Angular.js')
    cy.get('[data-cy="projects-list"]').find('td').contains('Angular.js')
  })
})

describe('Should go to links', () => {
  it('Should go to projects', () => {
    cy.get('[data-cy="projects"]').click()
    cy.url().should('include', '/projects')
  })

  it('Should go to project register', () => {
    cy.get('[data-cy="project-register"]').click()
    cy.url().should('include', '/project-register')
  })
})

describe('Should validate inputs for project register', () => {
  it('Should have inputs', () => {
    cy.get('[data-cy="project-register"]').click()
    cy.get('[data-cy="project-name"]')
    cy.get('[data-cy="project-tag-so"]')
    cy.get('[data-cy="project-link-gh"]')
  })

  it('Should validate required fields', () => {
    cy.get('[data-cy="project-register"]').click()
    cy.get('[data-cy="btn-submit"]').click()
    cy.get('[data-cy="project-name-container"]').find('div.v-messages__message').contains('This field is required')
    cy.get('[data-cy="project-tag-so-container"]').find('div.v-messages__message').contains('This field is required')
    cy.get('[data-cy="project-link-gh-container"]').find('div.v-messages__message').contains('This field is required')
  })
})

describe('Should view project info', () => {
  it('Should navigate from projects list to project info', () => {
    cy.get('[data-cy="projects"]').click()
    cy.get('[data-cy="projects-list"]').find('td').contains('angularjs').parent('tr').click()
    cy.url().should('include', '/projects/angularjs')
    cy.get('[data-cy="project-info-chart"]')
  })
})
