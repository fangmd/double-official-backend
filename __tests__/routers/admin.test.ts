/**
 * @description router api test: admin
 */

import HttpC from '../../src/constants/http-c'
import server, { safeShutdown, initAll } from '../_server'

beforeAll(async () => {
  await initAll()
})

afterAll(async (done) => {
  await safeShutdown()
  done()
})

const userName = `admin`
const PASSWORD = 'admin'
let jwt: String

describe('routers: /api/admin', () => {
  it('login user, should be success', async () => {
    const response = await server.post('/api/admin/login').send(`username=${userName}&password=${PASSWORD}`)
    jwt = response.body.data.jwt
    expect(response.body.code).toEqual(HttpC.SUCCESS)
  })
})
