const { configure } = require('@serenity-js/core');
const { Cucumber } = require('@serenity-js/cucumber');

configure({
  crew: [
    new Cucumber(),
    // Agrega otros "crew" que desees, como el navegador
  ],
  serenity: {
    dialect: 'cucumber', // Esto configura Serenity para que use Cucumber
  }
});
