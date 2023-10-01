import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { Users } from '.'
import { UsersField, usersFieldAtom } from './data'
const Initializer = () => {
  const setUsers = useSetAtom(usersFieldAtom)
  useEffect(() => {
    setUsers(UsersField.init)
  }, [])
  return <></>
}

const last = (strings: string[]) =>
  strings.length - 1 > 0 ? strings[strings.length - 1] : ''

const intercept = () =>
  cy.intercept('/api/v1/users/*', (req) => {
    console.log(last(req.url.split('/')))
    return req.reply({
      statusCode: 200,
      body: {
        _tag: 'Administrator',
        name: last(req.url.split('/')),
      },
    })
  })

describe('<Users />', () => {
  beforeEach(() => {
    cy.mount(<Initializer />)
    cy.mount(<Users />)
  })

  it('should be no user selected on the beginning', () => {
    cy.get('.user-badge').should('not.exist')
  })

  it('should show error message when user not found', () => {
    cy.get('input').type('richard_w{enter}')
    cy.get('.error-message')
  })

  it('should have 1 user selected when input user name and press enter', () => {
    intercept()
    cy.get('input').type('richard_w{enter}')
    cy.get('.user-badge').should('have.length', 1)
    cy.get('.user-badge').first().should('contain', 'richard_w')
    cy.get('input').should('have.value', '')
  })

  it('should have 2 user selected when input user name and press enter', () => {
    intercept()
    cy.get('input').type('richard_w{enter}')
    intercept()
    cy.get('input').type('eric_s{enter}')
    cy.get('.user-badge').should('have.length', 2)
    cy.get('.user-badge').eq(0).should('contain', 'richard_w')
    cy.get('.user-badge').eq(1).should('contain', 'eric_s')
  })
})
