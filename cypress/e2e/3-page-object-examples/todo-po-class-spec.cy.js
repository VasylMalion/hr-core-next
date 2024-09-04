beforeEach(() => {
  todoPage.navigateToHome();
})

it('displays two todo items by default', () => {
  todoPage.validateTodoCount(2)
  todoPage.validateTodoText(1, 'Pay electric bill')
  todoPage.validateTodoText(2, 'Walk the dog')
})
