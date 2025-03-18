import login from '../../fixtures/login.json';
import orders from '../../fixtures/orders.json';
import ingredients from '../../fixtures/ingredients.json';
describe('Тестирование общее', () => {
  beforeEach(() => {
    const mockAccessToken = 'mock-access-token';
    const mockRefreshToken = 'mock-refresh-token';
    cy.window().then((win) => {
      win.localStorage.setItem('accessToken', mockAccessToken);
      win.localStorage.setItem('refreshToken', mockRefreshToken);
    });

    cy.setCookie('accessToken', mockAccessToken);
    cy.setCookie('refreshToken', mockRefreshToken);

    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.intercept('POST', '**/orders', { fixture: 'orders.json' }).as(
      'createOrder'
    );

    cy.intercept('POST', '**/auth/login', { fixture: 'login.json' }).as(
      'login'
    );

    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');

    cy.visit('http://localhost:4000/');
  });

  describe('Перехватывать запрос на получение ингредиентов', () => {
    it('Должен перехватывать запрос на получение ингредиентов', () => {
      cy.wait('@getIngredients');
      cy.contains('Краторная булка N-200i').should('exist');
    });
  });
  describe('Перехватывает запрос на создание заказа', () => {
    it('Должен перехватывать запрос на создание заказа', () => {
      cy.get('[data-testid="create-order-button"]').click();
      cy.wait('@createOrder');
      cy.contains('Ваш заказ начали готовить').should('exist');
    });
  });

  describe('Перехватывает запрос на аутентификацию', () => {
    it('Должен перехватывать запрос на аутентификацию', () => {
      cy.visit('http://localhost:4000/login');
      cy.get('[data-testid="login-enter-password"]').type(login.password);
      cy.get('[data-testid="login-enter-username"]').type(login.email);
      cy.get('[data-testid="login-button"]').click();
      cy.location('pathname').should('eq', '/profile');
    });
  });

  describe('Создание заказа', () => {
    it('Должен создать заказ', () => {
      cy.wait('@getIngredients');
      cy.contains('Краторная булка N-200i').should('exist');
      cy.contains('Добавить').should('exist').click();
      cy.contains('Дождитесь готовности на орбитальной станции').should(
        'not.exist'
      );
      cy.contains(orders.order.number).should('not.exist');
      cy.contains('Оформить заказ').should('exist').click();
      cy.contains('Дождитесь готовности на орбитальной станции').should(
        'exist'
      );
    });
  });

  describe('Открытие модального окна c заказом', () => {
    it('Должен открывать модальное окно', () => {
      cy.wait('@getIngredients');
      cy.contains('Краторная булка N-200i').should('exist');
      cy.contains('Добавить').should('exist').click();
      cy.get('[data-cy="modal-close-button"]').should('not.exist');
      cy.contains('Оформить заказ').should('exist').click();
      cy.contains(orders.order.number).should('exist');
      cy.get('[data-cy="modal-close-button"]').should('exist');
    });
  });

  describe('Закрытие модального окна с заказом через крестик', () => {
    it('Должен закрывать модальное окно через крестик', () => {
      cy.wait('@getIngredients');
      cy.contains('Краторная булка N-200i').should('exist');
      cy.contains('Добавить').should('exist').click();
      cy.contains('Оформить заказ').should('exist').click();
      cy.contains(orders.order.number).should('exist');
      cy.get('[data-cy="modal-close-button"]').should('exist').click();
      cy.contains('Дождитесь готовности на орбитальной станции').should(
        'not.exist'
      );
      cy.get('[data-cy="modal-close-button"]').should('not.exist');
    });
  });

  describe('Очистка конструктора', () => {
    it('Должен очищать конструктор', () => {
      cy.wait('@getIngredients');
      cy.contains('Краторная булка N-200i').should('exist');
      cy.contains('Добавить').should('exist').click();
      cy.get('[data-cy="total-price-order"]').contains(
        ingredients.data[0].price * 2
      );
      cy.contains('Оформить заказ').should('exist').click();
      cy.contains(orders.order.number).should('exist');
      cy.get('[data-cy="modal-close-button"]').should('exist').click();
      cy.contains('Дождитесь готовности на орбитальной станции').should(
        'not.exist'
      );
      cy.get('[data-cy="total-price-order"]').should('exist').contains(0);
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });

  describe('Открытие модального окна c ингредиентом', () => {
    it('Должен открывать модальное окно', () => {
      const localhost = 'http://localhost:4000/';
      cy.url().should('eq', localhost);
      cy.wait('@getIngredients');
      cy.get(`[data-testid=${ingredients.data[0]._id}]`).click();
      const url = `ingredients/${ingredients.data[0]._id}`;
      cy.url().should('eq', localhost + url);
    });
  });

  describe('Закрытие модального окна c ингредиентом', () => {
    it('Должен закрывать модальное окно', () => {
      const localhost = 'http://localhost:4000/';
      cy.url().should('eq', localhost);
      cy.wait('@getIngredients');
      cy.get(`[data-testid=${ingredients.data[0]._id}]`).click();
      const url = `ingredients/${ingredients.data[0]._id}`;
      cy.url().should('eq', localhost + url);
      cy.get('[data-cy="modal-close-button"]').should('exist').click();
      cy.url().should('eq', localhost);
    });
  });

  after(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
