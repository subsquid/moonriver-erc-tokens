import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import {Collection} from "./collection.model"
import {Account} from "./account.model"

@Entity_()
export class NfToken {
  constructor(props?: Partial<NfToken>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  nativeId!: string

  @Index_()
  @Column_("text", {nullable: true})
  name!: string | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  symbol!: string | undefined | null

  @Index_()
  @ManyToOne_(() => Collection, {nullable: false})
  collection!: Collection

  @Column_("text", {nullable: true})
  uri!: string | undefined | null

  @Index_()
  @ManyToOne_(() => Account, {nullable: false})
  currentOwner!: Account
}
