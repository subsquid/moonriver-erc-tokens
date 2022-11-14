import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {FtTransfer} from "./ftTransfer.model"
import {Account} from "./account.model"
import {TransferDirection} from "./_transferDirection"

@Entity_()
export class AccountFtTransfer {
  constructor(props?: Partial<AccountFtTransfer>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => FtTransfer, {nullable: true})
  transfer!: FtTransfer | undefined | null

  @Index_()
  @ManyToOne_(() => Account, {nullable: true})
  account!: Account

  @Column_("varchar", {length: 4, nullable: true})
  direction!: TransferDirection | undefined | null
}
