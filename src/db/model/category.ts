import { Column, Entity, PrimaryColumn, Unique } from 'typeorm'
import BaseModel from './base-model'

@Entity()
@Unique(['name', 'id'])
export class Category extends BaseModel {
  @PrimaryColumn()
  id!: string
  @Column({ comment: '分类名称' })
  name!: string
}
