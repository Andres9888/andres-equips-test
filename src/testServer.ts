import { rest } from "msw"
import { setupServer } from "msw/node"

const server = setupServer(
  rest.get("http://localhost:8080/users", (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        "body": [
          {
          "uuid": "4e059bd8-2d93-41e9-9305-e9922f945e5f",
          "name": "Tony Earley",
          "email": "tearley2@plala.or.jp"
        },
        {
          "uuid": "ca456b9f-cd7c-414f-85f8-99534cfa4356",
          "name": "Bibby Eschelle",
          "email": "beschelle3@sohu.com"
        },
        {
          "uuid": "a2ee3f67-2c01-4f9c-be0f-ff3b98474173",
          "name": "Astrid Gillan",
          "email": "agillan0@acquirethisname.com"
        }]})
    )
  }),

  beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

export { server, rest }