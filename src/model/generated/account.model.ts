import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {FtTransfer} from "./ftTransfer.model"
import {NftTransfer} from "./nftTransfer.model"
import {NFToken} from "./nfToken.model"
import {Collection} from "./collection.model"

@Entity_()
export class Account {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("int4", {nullable: false})
  ftTransfersTotalCount!: number

  @OneToMany_(() => FtTransfer, e => e.from)
  ftTransfersSent!: FtTransfer[]

  @Index_()
  @Column_("int4", {nullable: false})
  ftTransfersSentCount!: number

  @OneToMany_(() => FtTransfer, e => e.to)
  ftTransfersReceived!: FtTransfer[]

  @Index_()
  @Column_("int4", {nullable: false})
  ftTransfersReceivedCount!: number

  @Index_()
  @Column_("int4", {nullable: false})
  nftTransfersTotalCount!: number

  @OneToMany_(() => NftTransfer, e => e.from)
  nftTransfersSent!: NftTransfer[]

  @Index_()
  @Column_("int4", {nullable: false})
  nftTransfersSentCount!: number

  @OneToMany_(() => NftTransfer, e => e.to)
  nftTransfersReceived!: NftTransfer[]

  @Index_()
  @Column_("int4", {nullable: false})
  nftTransfersReceivedCount!: number

  @OneToMany_(() => NFToken, e => e.currentOwner)
  ownedTokens!: NFToken[]

  @OneToMany_(() => Collection, e => e.currentOwner)
  ownedCollections!: Collection[]
}
