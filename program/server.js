const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

const todos = [];

router.get('/todos', ctx => {
  ctx.body = todos;
});

router.post('/todos', ctx => {
  const todo = ctx.request.body;
  todos.push(todo);
  ctx.body = todo;
});

router.put('/todos/:id', ctx => {
  const id = ctx.params.id;
  const todo = ctx.request.body;
  todos[id] = todo;
  ctx.body = todo;
});

router.delete('/todos/:id', ctx => {
  const id = ctx.params.id;
  todos.splice(id, 1);
  ctx.status = 204;
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
