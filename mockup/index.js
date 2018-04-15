const users = require('./data/users')();
const items = require('./data/items')();

exports.data = async () => ({
  users: users,
  items: items,
  userList: {
    success: true,
    data: users
  },
  account: {},
  session: {}
});

exports.routes = {
  '/mock/api/*': '/$1',
  '/user/list': '/userList', // non-restful api can use custom route to rescue
  '/login/account': '/session'
};
