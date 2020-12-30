/**
 * @description article 相关操作
 */

import { getRepository } from 'typeorm'
import { Article } from '../db/model/article'
import getUniqueID from '../utils/snowflake'

/**
 * 添加一个文章
 * @param title 标题
 * @param bannerImg img
 * @param category 分类
 * @param tags tags
 * @param content 内容
 */
export async function createArticle(
  title: string,
  bannerImg?: string,
  category?: string,
  tags?: string,
  content?: string
) {
  const rep = getRepository(Article)
  const article = new Article()
  article.id = `${getUniqueID()}`
  article.title = title
  article.bannerImg = bannerImg
  article.category = category
  article.tags = tags
  article.content = content

  return rep.save(article)
}

/**
 * 获取 article
 * TODO: add query params
 */
export async function queryArticles() {
  const rep = getRepository(Article)
  return rep.find()
}

/**
 * 删除 Article
 */
export async function deleteArticle(id?: string) {
  const rep = getRepository(Article)
  const whereOpt: any = {}
  if (id) {
    whereOpt.id = id
  }
  return rep.delete(whereOpt)
}
