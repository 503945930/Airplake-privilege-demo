const express = require('express')
const app = express()

// 角色  路由  method 配置
let config = {
  'pathMap': {
    '/users': 'my:test:users'
  },
  'roleMap': {
    'root': {
      '*': [ 'get', 'post', 'put', 'delete' ] // root can access all
    },
    'role1': {
      'my:test:users': [ 'get' ]
    },
    'role2': {
      'my:test:users': [ 'get', 'post' ]
    }
  }
}

const airplakePrivilege = require('airplake-privilege')({
  config: config,
  contextToRoles: (ctx, done) => {
    done(null, ['role2'])// 这里需要将当前角色取出来
  }
})

app.use(airplakePrivilege) // 需要放在所有路由之前

app.get('/users', function (req, res) {
  res.send('/get Hello World')
})
app.post('/users', function (req, res) {
  res.send('/post Hello World')
})
app.put('/users', function (req, res) {
  res.send('/put Hello World')
})
app.delete('/users', function (req, res) {
  res.send('/delete Hello World')
})

app.listen(3000)
