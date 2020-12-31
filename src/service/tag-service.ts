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
  const tagDB = await queryTags(name)
  if(tagDB){
    return tagDB
  }
  const tag = new Tag()
  tag.id = `${getUniqueID()}`
  tag.name = name
  return rep.save(tag)
}

/**
 * 添加 tag
 */
export async function createTags(names: string) {
  const tagNames = names.split(',')
  for (const name of tagNames) {
    const catResults = await queryTags(name)
    if (!(catResults != null && catResults.length > 0)) {
      await createTag(name)
    }
  }
}

/**
 * 获取所有 tag
 * @param name 标签名称
 */
export async function queryTags(name?: string) {
  const rep = getRepository(Tag)
  const where: any = {}
  if (name) {
    where.name = name
  }
  return rep.find({ where })
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
