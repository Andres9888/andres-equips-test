import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('http://localhost:8080/users', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        body: [
          {
            uuid: '4e059bd8-2d93-41e9-9305-e9922f945e5f',
            name: 'Tony Earley',
            email: 'tearley2@plala.or.jp',
          },
          {
            uuid: 'ca456b9f-cd7c-414f-85f8-99534cfa4356',
            name: 'Bibby Eschelle',
            email: 'beschelle3@sohu.com',
          },
          {
            uuid: 'a2ee3f67-2c01-4f9c-be0f-ff3b98474173',
            name: 'Astrid Gillan',
            email: 'agillan0@acquirethisname.com',
          },
        ],
      })
    );
  }),
  rest.get('http://localhost:8080/applications', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        body: [
          {
            uuid: '48632ed3-3591-48d0-9de1-ffe1857b9a4d',
            userUuid: 'ca456b9f-cd7c-414f-85f8-99534cfa4356',
            requestedAmount: 34012,
          },
          {
            uuid: '7db92fc0-5101-4611-a684-5a5745c84cc3',
            userUuid: 'a2ee3f67-2c01-4f9c-be0f-ff3b98474173',
            requestedAmount: 35943,
          },
        ],
      })
    );
  }),

  rest.get('http://localhost:8080/payments', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        body: [
          {
            uuid: '8722073f-6520-44b7-a6ab-f04de644324d',
            applicationUuid: '01b35179-134c-4bb1-af36-a9663c009fcd',
            paymentMethod: 'ACH',
            paymentAmount: 44798,
          },
          {
            uuid: 'f7fc4977-8976-4042-a578-041104f668c9',
            applicationUuid: '7db92fc0-5101-4611-a684-5a5745c84cc3',
            paymentMethod: 'ACH',
            paymentAmount: 35943,
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };
