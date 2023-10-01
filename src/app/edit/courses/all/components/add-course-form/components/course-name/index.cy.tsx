import { getContainerEl } from 'cypress/react18'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import ReactDom from 'react-dom'
import { CourseName } from '.'
import { courseNameAtom } from '../../../../atoms'
import { InitialTextInput } from '../../../../data/states/add-course-form/text-input'

const Initializer = () => {
  const setCourseName = useSetAtom(courseNameAtom)
  useEffect(() => {
    setCourseName(InitialTextInput.self)
  }, [])

  return <></>
}

describe('<CourseName />', () => {
  beforeEach(() => {
    ReactDom.unmountComponentAtNode(getContainerEl())
    cy.mount(<Initializer />)
    cy.mount(<CourseName />)
  })
  it('should have empty input in the beginning', () => {
    cy.get('input').should('have.value', '')
  })
  it('should not show error message in the beginning', () => {
    cy.get('.error-message').should('not.exist')
  })
  it('should not show error message on blur when input is valid', () => {
    cy.get('input').type('He110 w0r1d')
    cy.get('.error-message').should('not.exist')
  })
  it('should show error message on blur when input is invalid', () => {
    cy.get('input').clear().focus().blur()
    cy.get('.error-message')
  })
  it('should show error message on change when input is invalid', () => {
    cy.get('input').type('1{backspace}')
    cy.get('.error-message')
  })
})
