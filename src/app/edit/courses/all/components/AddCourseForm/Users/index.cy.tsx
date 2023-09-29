import { Option } from 'effect'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { Users } from '.'
import { usersAtom } from '../../../data/addCourseForm/users'

const Initializer = () => {
  const setUsersAtom = useSetAtom(usersAtom)
  useEffect(() => {
    setUsersAtom(Option.none())
  }, [])
  return <></>
}

describe('<Users />', () => {
  beforeEach(() => {
    cy.mount(<Initializer />)
    cy.mount(<Users />)
  })

  it('should be no user selected on the beginning', () => {
    cy.get('.user-badge').should('not.exist')
  })

  it('should have 1 user selected when input user name and press enter', () => {
    cy.get('input').type('richard_w{enter}')
    cy.get('.user-badge').should('have.length', 1)
    cy.get('.user-badge').first().should('contain', 'richard_w')
    cy.get('input').should('have.value', '')
  })

  it('should have 2 user selected when input user name and press enter', () => {
    cy.get('input').type('richard_w{enter}')
    cy.get('input').type('eric_s{enter}')
    cy.get('.user-badge').should('have.length', 2)
    cy.get('.user-badge').eq(0).should('contain', 'richard_w')
    cy.get('.user-badge').eq(1).should('contain', 'eric_s')
  })

  it('should have 2 user selected when input user name and click add button', () => {
    cy.get('input').type('richard_w')
    cy.get('button').contains('Add').click()
    cy.get('input').type('eric_s')
    cy.get('button').contains('Add').click()
    cy.get('.user-badge').should('have.length', 2)
    cy.get('.user-badge').eq(0).should('contain', 'richard_w')
    cy.get('.user-badge').eq(1).should('contain', 'eric_s')
  })
})
