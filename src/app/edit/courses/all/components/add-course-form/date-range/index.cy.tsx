import { clockAtom } from '@/service/atoms'
import { testClock } from '@/service/clock'
import { getContainerEl } from 'cypress/react18'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import ReactDom from 'react-dom'
import { DateRange } from '.'
import { dateRangeAtom, initialDateRange } from './data'

const Initializer = () => {
  const setDateRange = useSetAtom(dateRangeAtom)
  const setClock = useSetAtom(clockAtom)
  useEffect(() => {
    setClock(testClock)
    setDateRange(initialDateRange)
  }, [])

  return <></>
}

describe('<CourseName />', () => {
  beforeEach(() => {
    ReactDom.unmountComponentAtNode(getContainerEl())
    cy.mount(<Initializer />)
    cy.mount(<DateRange />)
  })
  it('should be empty in the beginning', () => {
    cy.get('input').each((input) => cy.wrap(input).should('have.value', ''))
  })
  it('should not show error message when dates are valid', () => {
    cy.get('input').eq(0).clear().type('2000 / 01 / 02{Enter}')
    cy.get('input').eq(1).clear().type('2000 / 01 / 03{Enter}')
    cy.get('label').click()
    cy.get('.error-message').should('not.exist')
  })
  it('should show error message when dates are invalid', () => {
    cy.get('input').eq(0).clear().type('1999 / 12 / 31{Enter}')
    cy.get('input').eq(1).clear().type('2000 / 01 / 02{Enter}')
    cy.get('label').click()
    cy.get('.error-message', { timeout: 500 })
  })
  it('should show error message when dates cleared after select', () => {
    cy.get('input').eq(0).clear().type('2000 / 01 / 02{Enter}')
    cy.get('input').eq(1).clear().type('2000 / 01 / 03{Enter}')
    cy.get('label').click()
    cy.get('input').eq(0).clear().type('{Enter}')
    cy.get('label').click()
    cy.get('.error-message', { timeout: 500 })
  })
})
