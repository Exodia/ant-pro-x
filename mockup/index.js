const users = require('./data/users')();
const items = require('./data/items')();
const rules = require('./data/rules')();

exports.data = async () => ({
  users,
  items,
  rules,
  userList: {
    success: true,
    data: users
  },
  account: {},
  session: {},
  'deletedRules': []
});

exports.routes = {
  '/mock/api/*': '/$1',
  '/user/list': '/userList', // non-restful api can use custom route to rescue
  '/login/account': '/session'
};
