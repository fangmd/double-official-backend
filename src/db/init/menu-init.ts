/**
 * @description 初始化 tag
 * 运行脚本：export NODE_ENV=development && ts-node src/db/init/menu-init.ts
 */
import { initEnv } from '../../env'
initEnv()

import { MenuService } from '../../service/menu-service'
import { dbInit } from '../mysql'

export async function initMenu() {
  await MenuService.removeAll()

  // menu blog
  await MenuService.addMenu(1, 0, 1, 'BlogManage', 'fa-circle-o', 'BlogManage')
  await MenuService.addMenu(11, 1, 1, 'TagManage', 'fa-circle-o', 'TagManage')
  await MenuService.addMenu(12, 1, 2, 'CategoryManage', 'fa-circle-o', 'CategoryManage')
  await MenuService.addMenu(13, 1, 3, 'ArticleManage', 'fa-circle-o', 'ArticleManage')
}

async function initTag() {
  await dbInit()

  await initMenu()
}

initTag()
