/**
 * @description nodejs 脚本, 同步 md 文件到数据库
 *
 * 运行脚本: export NODE_ENV=development && ts-node src/db/double-blog-sync.ts
 */

import { initEnv } from '../env'
initEnv()
import { dbInit } from './mysql'
import fs from 'fs'
import path from 'path'
import { createArticleFromFile } from '../service/article-service'

const fileDir = '/Users/double/Documents/blog/double-official-md'

/**
 * 解析文件内容 并存储到数据库
 * @param {string} filePath 文件地址
 */
async function parseFileAndSaveToDB(filePath: string) {
  const data = fs.readFileSync(filePath, 'utf-8')
  let title: string = ''
  let tags: string | undefined
  let category: string | undefined
  let content: string | undefined
  let dateStr: string | undefined

  const header = data.match(/---[.\\n\s\S]*---/)
  if (header) {
    const lines = header[0].split('\n')
    for (const line of lines) {
      const line2 = line.split(': ')
      if (line2.length > 0) {
        if (line2[0].startsWith('title')) {
          title = line2[1]
        }
        if (line2[0].startsWith('tags')) {
          tags = line2[1].replace('[', '').replace(']', '')
        }
        if (line2[0].startsWith('categories')) {
          category = line2[1]
        }
        if (line2[0].startsWith('date')) {
          dateStr = line2[1]
        }
      }
    }

    content = data.replace(header[0], '')
  }
  if (title) {
    const result = await createArticleFromFile(title, undefined, category, tags, content, dateStr)
    if (result) {
      console.log(`save or update: ${filePath}`)
    }
  }
}

/**
 * 递归查找所有 md 文件
 * README.md 和 TODO 开头的文件除外
 * @param fileDirInner 文件夹地址
 * @param fileList 文件 array
 */
async function getFiles(fileDirInner: string, fileList: string[]) {
  const fl = fs.readdirSync(fileDirInner)
  fl.forEach((name) => {
    if (name === 'README.md') {
      return
    }
    if (name.startsWith('TODO')) {
      return
    }
    var filePath = path.join(fileDirInner, name)
    var stat = fs.statSync(filePath)
    if (stat.isFile()) {
      fileList.push(filePath)
    } else if (stat.isDirectory()) {
      getFiles(filePath, fileList)
    }
  })
  return
}

async function initSQL() {
  const connection = await dbInit()

  console.log(`start parse director: ${fileDir}`)
  // 获取 文件列表
  const fileList: string[] = []

  getFiles(fileDir, fileList)

  for (const f of fileList) {
    await parseFileAndSaveToDB(f)
  }

  console.log(fileList)
  // 循环 解析文件内容 并存储到数据库

  process.exit()
}

initSQL()
