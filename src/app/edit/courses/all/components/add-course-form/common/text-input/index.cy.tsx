import { getContainerEl } from 'cypress/react18'
import ReactDom from 'react-dom'
import { TextInput } from '.'
import { initialTextInput } from './data'

describe('<Description />', () => {
  beforeEach(() => {
    ReactDom.unmountComponentAtNode(getContainerEl())
    cy.mount(
      <TextInput
        textInput={initialTextInput}
        setTextInput={cy.stub().as('setTextInput')}
        id={'test'}
        placeholder={'test'}
        limit={{ minLen: 1, maxLen: 50 }}
        title={'test'}
      />
    )
  })
  it('should have empty input in the beginning', () => {
    cy.get('input').should('have.value', '')
  })
  it('should setTextInput on blur', () => {
    cy.get('input').clear().focus().blur()
    cy.get('@setTextInput').should('be.called')
  })
  it('should setTextInput on change', () => {
    cy.get('input').type('1{backspace}')
    cy.get('@setTextInput').should('be.called')
  })
})
