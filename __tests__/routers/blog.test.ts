/**
 * @description router api test: blog
 */

import HttpC from '../../src/constants/http-c'
import { deleteArticle } from '../../src/service/article-service'
import { deleteCategory } from '../../src/service/category-service'
import { deleteTag } from '../../src/service/tag-service'
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

const testName = 'test_name'

let jwt: string
let testArticleId: string

describe('routers: /api/blog', () => {
  it('login user, should be success', async () => {
    const response = await server.post('/api/admin/login').send(`username=${userName}&password=${PASSWORD}`)
    jwt = response.body.data.jwt
    expect(response.body.code).toEqual(HttpC.SUCCESS)
  })

  // tag
  it('add tag, should be success', async () => {
    const response = await server.post('/api/tag').send(`name=${testName}`).set('Authorization', `Bearer ${jwt}`)
    expect(response.body.code).toEqual(HttpC.SUCCESS)
  })

  it('remove tag, should be success', async () => {
    const result = await deleteTag(testName)
    expect(result).not.toEqual(0)
  })

  it('get tags, should be success', async () => {
    const response = await server.get('/api/tags').set('Authorization', `Bearer ${jwt}`)
    expect(response.body.code).toEqual(HttpC.SUCCESS)
  })

  //  category
  it('add category, should be success', async () => {
    const response = await server.post('/api/category').send(`name=${testName}`).set('Authorization', `Bearer ${jwt}`)
    expect(response.body.code).toEqual(HttpC.SUCCESS)
  })

  it('remove category, should be success', async () => {
    const result = await deleteCategory(testName)
    expect(result).not.toEqual(0)
  })

  it('get categories, should be success', async () => {
    const response = await server.get('/api/categories').set('Authorization', `Bearer ${jwt}`)
    expect(response.body.code).toEqual(HttpC.SUCCESS)
  })

  // article
  it('add article, should be success', async () => {
    const response = await server
      .post('/api/article')
      .send(`title=${testName}&bannerImg=test`)
      .set('Authorization', `Bearer ${jwt}`)
    testArticleId = response.body.data.id
    expect(response.body.code).toEqual(HttpC.SUCCESS)
  })

  it('remove article, should be success', async () => {
    const result = await deleteArticle(testArticleId)
    expect(result).not.toEqual(0)
  })

  it('get articles, should be success', async () => {
    const response = await server.get('/api/articles').set('Authorization', `Bearer ${jwt}`)
    expect(response.body.code).toEqual(HttpC.SUCCESS)
  })
})
