import { Column, Entity, PrimaryColumn, Unique } from 'typeorm'
import BaseModel from './base-model'

@Entity()
@Unique(['id'])
export class Tag extends BaseModel {
  @PrimaryColumn()
  id!: string
  @Column({ comment: '标签名称', unique: true })
  name!: string
}
