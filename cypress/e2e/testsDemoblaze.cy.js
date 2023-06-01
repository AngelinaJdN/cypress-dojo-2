import { faker } from '@faker-js/faker';

describe('Achat sur Demoblaze', () => {
  const username = faker.name.firstName()+"159";
  const password = faker.internet.password();

  it('Création de compte', () => {
    cy.visit('https://www.demoblaze.com/'); //Ouvrir le site
    cy.get('[data-target="#signInModal"]').click(); //Cliquer sur "Sign up"
    cy.get('#sign-username').type(username, {force: true}).should('have.value', username); //Sélectionner le champs "username" et entrer un nom d'utilisateur
    cy.get('#sign-password').type(password, {force: true}).should('have.value', password); //Sélectionner le champs "password" et entrer un mot de passe
    cy.get('[onclick="register()"]').click(); // Cliquer sur le bouton "Sign up"
    cy.intercept('POST', 'https://api.demoblaze.com/signup', {statusCode: 200});
  });

  it('Se connecter et réaliser un achat', () => {
    cy.visit('https://www.demoblaze.com/'); //Ouvrir le site
    cy.login(username, password); //Utiliser la commande login pour se connecter
    cy.get(':nth-child(1) > .card > .card-block > .card-title > .hrefch').click(); //Cliquer sur le premier produit de la liste pour ouvrir la page produit
    cy.get('[onclick="addToCart(1)"]').click(); //Cliquer sur "Add to cart"
    cy.intercept('POST', 'https://api.demoblaze.com/addtocart', {statusCode: 200});
    cy.get('#cartur').click(); //Cliquer sur "Cart" pour accéder au panier
    cy.get('.col-lg-1 > .btn').click() //Cliquer sur "Place Order"
    cy.get('#name').type(username); //Sélectionner le champs "name" et entrer un prénom
    cy.get('#country').type(faker.address.country()); //Sélectionner le champs "country" et entrer un pays
    cy.get('#city').type(faker.address.city()); //Sélectionner le champs "city" et entrer une ville
    cy.get('#card').type(faker.finance.creditCardNumber()); //Sélectionner le champs "credit card" et entrer un numéro de carte de paiement
    cy.get('#month').type(faker.date.month()); //Sélectionner le champs "month" et entrer un mois
    cy.get('#year').type("2024"); //Sélectionner le champs "year" et entrer une année
    cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click(); //Cliquer sur "Purchase"
    cy.screenshot()
  });

})