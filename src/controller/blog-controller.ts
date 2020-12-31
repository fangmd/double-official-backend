/**
 * @description blog 相关接口
 */

import { Context } from 'koa'
import { createArticle, queryArticles } from '../service/article-service'
import { createCategory, queryCategories } from '../service/category-service'
import { createTag, queryTags } from '../service/tag-service'
import HttpResult from '../utils/http-result'

/**
 * 获取所有 tag
 */
export async function getTags(ctx: Context) {
  const result = await queryTags()
  ctx.body = HttpResult.success({ list: result })
}

/**
 * add tag
 */
export async function addTag(ctx: Context) {
  const { name } = ctx.request.body
  const result = await createTag(name)
  if (!result) {
    ctx.body = HttpResult.fail()
    return
  }
  ctx.body = HttpResult.success()
}

/**
 * 获取所有 Category
 */
export async function getCategories(ctx: Context) {
  const result = await queryCategories()
  ctx.body = HttpResult.success({ list: result })
}

/**
 * add category
 */
export async function addCategory(ctx: Context) {
  const { name } = ctx.request.body
  const result = await createCategory(name)
  if (!result) {
    ctx.body = HttpResult.fail()
    return
  }
  ctx.body = HttpResult.success()
}

/**
 * 获取所有 article
 */
export async function getArticles(ctx: Context) {
  const { category } = ctx.request.query
  const result = await queryArticles(undefined, undefined, category)
  ctx.body = HttpResult.success({ list: result })
}

/**
 * 获取 article 详情
 */
export async function getArticleDetail(ctx: Context) {
  const { id } = ctx.request.query
  const result = await queryArticles(undefined, id)
  ctx.body = HttpResult.success(result[0] ?? {})
}

/**
 * add article
 */
export async function addArticle(ctx: Context) {
  const { title, bannerImg, category, tags, content } = ctx.request.body
  const article = await createArticle(title, bannerImg, category, tags, content)
  if (!article) {
    ctx.body = HttpResult.fail()
    return
  }
  ctx.body = HttpResult.success(article)
}
