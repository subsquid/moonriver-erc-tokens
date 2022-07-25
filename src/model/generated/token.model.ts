import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import {ContractStandard} from "./_contractStandard"

@Entity_()
export class Token {
  constructor(props?: Partial<Token>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("text", {nullable: true})
  name!: string | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  symbol!: string | undefined | null

  @Column_("int4", {nullable: true})
  decimals!: number | undefined | null

  @Index_()
  @Column_("varchar", {length: 6, nullable: true})
  contractStandard!: ContractStandard | undefined | null

  @Index_()
  @Column_("text", {nullable: false})
  contractAddress!: string
}
