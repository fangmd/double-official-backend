/**
 * @description tag 相关操作
 */

import { getRepository } from 'typeorm'
import { Tag } from '../db/model/tag'
import getUniqueID from '../utils/snowflake'

/**
 * 添加 tag
 */
export async function createTag(name: string) {
  const rep = getRepository(Tag)
  const tag = new Tag()
  tag.id = `${getUniqueID()}`
  tag.name = name
  return rep.save(tag)
}

/**
 * 获取所有 tag
 */
export async function queryTags() {
  const rep = getRepository(Tag)
  return rep.find()
}

/**
 * 删除 tag
 */
export async function deleteTag(name?: string) {
  const rep = getRepository(Tag)
  const whereOpt: any = {}
  if (name) {
    whereOpt.name = name
  }
  return rep.delete(whereOpt)
}
