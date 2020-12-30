/**
 * @description category 相关操作
 */

import { getRepository } from 'typeorm'
import { Category } from '../db/model/category'
import getUniqueID from '../utils/snowflake'

/**
 * 添加 category
 */
export async function createCategory(name: string) {
  const rep = getRepository(Category)
  const category = new Category()
  category.id = `${getUniqueID()}`
  category.name = name
  return rep.save(category)
}

/**
 * 获取所有 category
 */
export async function queryCategories(name?: string) {
  const rep = getRepository(Category)
  const where: any = {}
  if (name) {
    where.name = name
  }
  return rep.find({ where })
}

/**
 * 删除 category
 */
export async function deleteCategory(name?: string) {
  const rep = getRepository(Category)
  const whereOpt: any = {}
  if (name) {
    whereOpt.name = name
  }
  return rep.delete(whereOpt)
}
