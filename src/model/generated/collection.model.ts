import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {ContractStandard} from "./_contractStandard"
import {NFToken} from "./nfToken.model"
import {Account} from "./account.model"

@Entity_()
export class Collection {
  constructor(props?: Partial<Collection>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("varchar", {length: 7, nullable: false})
  collectionType!: ContractStandard

  @Index_()
  @Column_("text", {nullable: false})
  contractAddress!: string

  @OneToMany_(() => NFToken, e => e.collection)
  nfts!: NFToken[]

  @Index_()
  @ManyToOne_(() => Account, {nullable: false})
  currentOwner!: Account

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  createdAtBlock!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date
}
