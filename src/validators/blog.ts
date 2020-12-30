/**
 * @description blog 相关接口参数校验
 */
import { IsNotEmpty } from 'class-validator'

/**
 * 添加 tag & category
 */
export class AddTagOrAddCategory {
  @IsNotEmpty()
  name?: string
}

/**
 * 添加 article
 */
export class AddArticle {
  @IsNotEmpty()
  title?: string
  // bannerImg?: string
  // category?: string
  // tags?: string
  // content?: string
}
