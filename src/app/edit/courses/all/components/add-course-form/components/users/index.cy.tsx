import { getUsersByNameHandler } from '@/msw/endpoints/get-user-by-name'
import { initWorker } from '@/msw/worker'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { Users } from '.'
import { InitialUsersField } from '../../../../data/states/add-course-form/users-field/initial'
import { usersFieldAtom } from '../../atoms'

const Initializer = () => {
  const setUsers = useSetAtom(usersFieldAtom)
  useEffect(() => {
    setUsers(InitialUsersField.self)
  }, [])
  return <></>
}

describe('<Users />', () => {
  const worker = initWorker('')

  before(() => {
    worker.start()
  })

  beforeEach(() => {
    cy.mount(<Users />)
  })

  afterEach(() => {
    worker.resetHandlers()
  })

  after(() => {
    worker.stop()
  })

  it('should be no user selected on the beginning', () => {
    cy.get('.user-badge').should('not.exist')
  })

  it('should not show error message when user found', () => {
    cy.get('input').type('richard_w{Enter}')
    cy.get('.error-message').should('not.exist')
  })

  it('should show 2 error message when user not found and no user selected', () => {
    worker.use(getUsersByNameHandler('')('404'))
    cy.get('input').type('richard_w{Enter}')
    cy.get('.error-message').should('have.length', 2)
  })

  it('should show 1 error message when user not found and 1 user selected', () => {
    worker.use(getUsersByNameHandler('')('404'))
    worker.use(getUsersByNameHandler('')('200 admin once'))
    cy.get('input').type('richard_w{Enter}')
    cy.get('.user-badge')
    cy.get('input').type('richard{Enter}')
    cy.get('.error-message').should('have.length', 1)
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

  it('should have 1 user selected after input 2 user name and delete 1', () => {
    cy.get('input').type('richard_w{enter}')
    cy.get('input').type('eric_s{enter}')
    cy.get('.user-badge button').first().click()
    cy.get('.user-badge').should('have.length', 1)
    cy.get('.user-badge').eq(0).should('contain', 'eric_s')
  })

  it('should show error message after input 1 user name and delete it', () => {
    cy.get('input').type('richard_w{enter}')
    cy.get('.user-badge button').first().click()
    cy.get('.error-message')
  })
})
