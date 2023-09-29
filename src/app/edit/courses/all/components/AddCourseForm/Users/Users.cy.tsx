import { Users } from '.'

describe('<Users />', () => {
  beforeEach(() => {
    cy.mount(<Users />)
  })

  it('should be no user selected on the beginning', () => {
    cy.get('.user-badge').should('not.exist')
  })

  it('should have 1 user selected when input valid user name and press enter', () => {
    cy.get('input').type('richard_w{enter}')
    cy.get('.user-badge').should('have.length', 1)
  })

  it('should have 1 user selected when input valid user name and click add', () => {
    cy.get('input').type('richard_w')
    cy.get('button').click()
    cy.get('.user-badge').should('have.length', 1)
  })
})
