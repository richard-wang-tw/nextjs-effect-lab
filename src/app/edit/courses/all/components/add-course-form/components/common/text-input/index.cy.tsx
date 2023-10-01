import { TextInputLimit } from '@/app/edit/courses/all/data/events/text-input-event'
import { InitialTextInput } from '@/app/edit/courses/all/data/states/add-course-form/text-input'
import { getContainerEl } from 'cypress/react18'
import ReactDom from 'react-dom'
import { TextInput } from '.'

describe('<Description />', () => {
  beforeEach(() => {
    ReactDom.unmountComponentAtNode(getContainerEl())
    cy.mount(
      <TextInput
        textInput={InitialTextInput.self}
        setTextInput={cy.stub().as('setTextInput')}
        id={'test'}
        placeholder={'test'}
        limit={TextInputLimit.of({ minLen: 1, maxLen: 50 })}
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
