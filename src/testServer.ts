import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get(
    'https://banks.data.fdic.gov/api/institutions?offset=0&fields=NAME,ADDRESS,ASSET,ESTYMD,STNAME,ZIP&sort_by=NAME&sort_order=ASC&limit=16&search=NAME:test',
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          body: [
            {
              meta: {
                total: 27801,
                parameters: {
                  filters: '',
                  fields: 'NAME,ADDRESS,ASSET,ESTYMD,STNAME,ZIP',
                  limit: '16',
                  offset: '0',
                },
                index: {
                  name: 'institutions_20211213234247',
                  createTimestamp: '2021-12-14T02:28:44Z',
                },
              },
              data: [
                {
                  data: {
                    ZIP: '64461',
                    ADDRESS: 'Main Street',
                    STNAME: 'Missouri',
                    ASSET: 5042,
                    ESTYMD: '03/05/1955',
                    NAME: '102 Valley Bank',
                    ID: '17405',
                  },
                  score: 2,
                  highlight: {
                    'PRIORNAME1.raw': ['<em>Citizens</em> <em>Bank</em> <em>of</em> <em>Hopkins</em>'],
                    'NAME.raw': ['<em>102</em> <em>Valley</em> <em>Bank</em>'],
                  },
                },
              ],
              totals: {
                count: 27801,
              },
            },
          ],
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };
