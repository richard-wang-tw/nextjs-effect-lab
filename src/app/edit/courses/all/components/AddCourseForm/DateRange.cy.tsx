import { getContainerEl } from 'cypress/react18'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import ReactDom from 'react-dom'
import {
  dateRangeAtom,
  initialDateRange,
} from '../../data/addCourseForm/dateRange'
import { DateRange } from './DateRange'

const Initializer = () => {
  const setDateRange = useSetAtom(dateRangeAtom)
  useEffect(() => {
    setDateRange(initialDateRange)
  }, [])

  return <></>
}

describe('<CourseName />', () => {
  beforeEach(() => {
    ReactDom.unmountComponentAtNode(getContainerEl())
    cy.mount(<Initializer />)
    cy.mount(<DateRange now={() => new Date('2023-09-01T00:00:00.000Z')} />)
  })
  it('should be empty in the beginning', () => {
    cy.get('input').each((input) => cy.wrap(input).should('have.value', ''))
  })
  it('should not show error message when dates are valid', () => {
    cy.get('input').eq(0).clear().type('2023 / 09 /24{Enter}')
    cy.get('input').eq(1).clear().type('2023 / 09 /30{Enter}')
    cy.get('label').click()
    cy.get('.error-message').should('not.exist')
  })
  it('should show error message when dates are invalid', () => {
    cy.get('input').eq(0).clear().type('2023 / 08 /24{Enter}')
    cy.get('input').eq(1).clear().type('2023 / 09 /30{Enter}')
    cy.get('label').click()
    cy.get('.error-message', { timeout: 500 })
  })
  it('should show error message when dates cleared after select', () => {
    cy.get('input').eq(0).clear().type('2023 / 08 /24{Enter}')
    cy.get('input').eq(1).clear().type('2023 / 09 /30{Enter}')
    cy.get('label').click()
    cy.get('input').eq(0).clear().type('{Enter}')
    cy.get('label').click()
    cy.get('.error-message', { timeout: 500 })
  })
})
