/**
 * @description article 相关操作
 */

import { getRepository } from 'typeorm'
import { Article } from '../db/model/article'
import getUniqueID from '../utils/snowflake'
import { createCategory } from './category-service'
import { createTags } from './tag-service'

/**
 * 添加一个文章
 * 如果 category 不存在就自动创建
 * 如果 tag 不存在就自动创建
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
  content?: string,
  dateStr?: string
) {
  const rep = getRepository(Article)
  const article = new Article()
  article.id = `${getUniqueID()}`
  article.title = title
  article.bannerImg = bannerImg
  article.category = category
  article.tags = tags
  article.content = content
  article.dateStr = dateStr

  // 如果 category 不存在就自动创建
  if (category) {
    await createCategory(category)

    // const catResults = await queryCategories(category)
    // if (!(catResults != null && catResults.length > 0)) {
    //   await createCategory(category)
    // }
  }

  // 如果 tag 不存在就自动创建
  if (tags) {
    await createTags(tags)
  }

  return rep.save(article)
}

/**
 * 获取 article
 * TODO: add query params
 */
export async function queryArticles(title?: string) {
  const rep = getRepository(Article)
  const where: any = {}
  if (title) {
    where.title = title
  }
  return rep.find({ where })
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

/**
 * 脚本解析文件后保存到数据库
 * 1. title 查询 Article, 存在就比较 dateStr， dateStr 不一致就更新，dateStr 一致就不用更新
 * 2. title 查询 Article，没有查到就直接保存
 */
export async function createArticleFromFile(
  title: string,
  bannerImg?: string,
  category?: string,
  tags?: string,
  content?: string,
  dateStr?: string
) {
  const rep = getRepository(Article)
  const articleDB = await queryArticles(title)
  if (articleDB && articleDB.length > 0) {
    if (dateStr !== articleDB[0].dateStr) {
      if (category) {
        await createCategory(category ?? '')
      }
      if (tags) {
        await createTags(tags ?? '')
      }
      articleDB[0].title = title
      if (tags) {
        articleDB[0].tags = tags
      }
      if (category) {
        articleDB[0].category = category
      }
      if (content) {
        articleDB[0].content = content
      }
      if (dateStr) {
        articleDB[0].dateStr = dateStr
      }
      if (bannerImg) {
        articleDB[0].bannerImg = bannerImg
      }
      rep.save(articleDB[0])
    }
  } else {
    return createArticle(title, bannerImg, category, tags, content, dateStr)
  }
  return
}
