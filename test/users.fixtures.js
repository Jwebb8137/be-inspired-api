function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'testingwizard',          
      first_name: 'Zee',
      last_name: 'Wizard',
    },
    {
      id: 2,
      username: 'PBurgers',
      first_name: 'Penelope',
      last_name: 'McBurgers',
    },
    {
      id: 3,
      username: 'YoshiMan',
      first_name: 'Yoshi',
      last_name: 'theMan',
    },
    {
      id: 4,
      username: 'MarioDude',
      first_name: 'Mario',
      last_name: 'TheDude'
    }
  ];
}

module.exports = {
  makeUsersArray,
}