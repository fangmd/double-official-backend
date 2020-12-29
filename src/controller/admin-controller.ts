/**
 * @description admin C 层
 */

import { Context } from 'koa'
import HttpC from '../constants/http-c'
import UserService from '../service/user-service'
import HttpResult from '../utils/http-result'
import JwtUtils from '../utils/jwt-utils'

export default class AdminController {
  /**
   * login
   */
  public static async login(ctx: Context) {
    const { username, password } = ctx.request.body
    const userInfo = await UserService.findUser(username!, password)
    if (!userInfo) {
      ctx.body = HttpResult.fail(HttpC.USER_NOT_EXIST)
      return
    }
    ctx.body = HttpResult.success({
      username: userInfo.username,
      jwt: JwtUtils.sign({ username: userInfo.username, id: userInfo.id }),
    })
  }
}
