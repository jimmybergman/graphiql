
const testQuery = `{
longDescriptionType {
  id
  image
  hasArgs
  test {
    id
    isTest
    __typename
  }
 }
}`

const mockSuccess = {
  "data": {
    "longDescriptionType": {
      "id": "abc123",
      "image": "/images/logo.svg",
      "hasArgs": "{\"defaultValue\":\"test default value\"}",
      "test": {
        "id": "abc123",
        "isTest": true,
        "__typename": "Test"
      }
    }
  }
}


describe('GraphiQL On Initialization', function() {
  it('Renders without error', function() {
    cy.visit(`/?query=${testQuery}`)
  })

   it('Executes a query that has the expected resut', function() {
    cy.get('.execute-button').click()
    cy.window().then((w) => {
      cy.expect(JSON.parse(w.g.resultComponent.viewer.getValue())).to.deep.equal(mockSuccess)
    })
  })

  it('Toggles doc pane off', function() {
    cy.get('.docExplorerWrap button.docExplorerHide').should('be.visible').click({ multiple: true })
    cy.get('.doc-explorer').should('not.exist')
  })

  it('Toggles doc pane', function() {
    cy.get('.docExplorerShow').should('be.visible').click()
    cy.get('.doc-explorer').should('be.visible')
  })
 
})
