import { Column, Entity, PrimaryColumn, Unique } from 'typeorm'
import BaseModel from './base-model'

@Entity()
@Unique(['id'])
export class Article extends BaseModel {
  @PrimaryColumn()
  id!: string
  @Column({ comment: '标签名称' })
  title!: string
  @Column({ comment: '图片', nullable: true })
  bannerImg?: string
  @Column({ comment: '分类, 分类名称', nullable: true })
  category?: string
  @Column({ comment: '标签， 标签名称中间用 , 隔开', nullable: true })
  tags?: string
  @Column({ comment: '是否显示, 默认显示', default: true })
  show!: boolean
  @Column({ comment: '文章内容 md 格式', type: 'text', nullable: true })
  content?: string
}
