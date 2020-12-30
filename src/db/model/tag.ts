import { Column, Entity, PrimaryColumn, Unique } from 'typeorm'
import BaseModel from './base-model'

@Entity()
@Unique(['name', 'id'])
export class Tag extends BaseModel {
  @PrimaryColumn()
  id!: string
  @Column({ comment: '标签名称' })
  name!: string
}
