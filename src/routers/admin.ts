/**
 * @description admin 相关接口
 */

import Router from 'koa-router'
import AdminController from '../controller/admin-controller'
import { genValidator } from '../middleware/validator'
import { UserLogin } from '../validators/user'

const router = new Router()

router.prefix('/api/admin')

router.post('/login', genValidator(UserLogin), AdminController.login)

export default router
