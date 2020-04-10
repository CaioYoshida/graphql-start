const users = [
  { id: 1, name: 'Caio', email: 'caio@yoshida.com.br' },
  { id: 2, name: 'Juliana', email: 'juliana@yoshida.com.br' },
]

module.exports={
  Query: {
    users: () => users,
    user: () => users[0],
  },

  Mutation: {
    createUser: () => users[0],
  },
}