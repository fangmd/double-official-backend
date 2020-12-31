/**
 * @description blog 相关接口
 */

import Router from 'koa-router'
import {
  addArticle,
  addCategory,
  addTag,
  getArticles,
  getCategories,
  getTags,
  getArticleDetail,
} from '../controller/blog-controller'
import { genValidator } from '../middleware/validator'
import { AddArticle, AddTagOrAddCategory, GetArticle } from '../validators/blog'

const router = new Router()

router.prefix('/api/blog')

router.get('/tags', getTags)
router.post('/tag', genValidator(AddTagOrAddCategory), addTag)
router.get('/categories', getCategories)
router.post('/category', genValidator(AddTagOrAddCategory), addCategory)

router.get('/articles', getArticles)
router.post('/article', genValidator(AddArticle), addArticle)
router.get('/article', genValidator(GetArticle), getArticleDetail)

export default router
