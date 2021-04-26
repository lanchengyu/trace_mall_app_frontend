import db from '../utils/localstorage'
const state = {
  article: localStorage['article'] ? JSON.parse(localStorage['article']) : [],
  collections: localStorage['collections']
    ? JSON.parse(localStorage['collections'])
    : [],
  carts: localStorage['carts'] ? JSON.parse(localStorage['carts']) : [],
  orders: localStorage['orders'] ? JSON.parse(localStorage['orders']) : [],
  todos: localStorage['todos'] ? JSON.parse(localStorage['todos']) : [],
  currentAddress: localStorage['currentAddress']
    ? JSON.parse(localStorage['currentAddress'])
    : {},
  mallUser: db.get('MALL_USER'),
  token: db.get('USER_TOKEN'),
  expireTime: db.get('EXPIRE_TIME'),
  user: db.get('USER'),
  permissions: db.get('PERMISSIONS'),
  roles: db.get('ROLES'),
  batch: db.get('BATCH'),
  recruitScrollY:db.get('recruitScrollY'),
  order:db.get('ORDER')
}

export default state
