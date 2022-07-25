import { Account, ContractStandard, Token } from '../model';
import { addTimeout } from '@subsquid/util-timeout';
import { getContractInstance } from './contract';
import { Context } from '../processor';
import {contractCallTimeout} from "../config";

export function createAccount(id: string): Account {
  return new Account({
    transfersTotalCount: 0,
    transfersSentCount: 0,
    transfersReceivedCount: 0,
    id
  });
}

function getDecoratedCallResult(rawValue: string | null): string | null {
  const decoratedValue: string | null = rawValue;

  if (!rawValue || typeof rawValue !== 'string') return null;

  const regex = new RegExp(/^\d{10}\.[\d|\w]{4}$/);

  /**
   * This test is required for contract call results
   * like this - "0006648936.1ec7" which must be saved as null
   */
  if (regex.test(rawValue)) return null;

  return decoratedValue ? decoratedValue.replace(/\0/g, '') : decoratedValue;
}

export async function createToken({
  tokenId,
  contractAddress,
  contractStandard,
  blockHeight,
  ctx
}: {
  tokenId: string;
  contractAddress: string;
  contractStandard: ContractStandard;
  blockHeight: number;
  ctx: Context;
}): Promise<Token> {
  const contractInst = getContractInstance({
    ctx,
    blockHeight,
    contractStandard,
    contractAddress
  });
  if (!contractInst) throw new Error();

  let name = null;
  let symbol = null;
  let decimals = null;

  try {
    name = await addTimeout(contractInst.name(), contractCallTimeout);
  } catch (e) {
    console.log(e);
  }
  try {
    symbol = await addTimeout(contractInst.symbol(), contractCallTimeout);
  } catch (e) {
    console.log(e);
  }
  try {
    decimals =
      contractStandard === ContractStandard.ERC20 && 'decimals' in contractInst
        ? await addTimeout(contractInst.decimals(), contractCallTimeout)
        : null;
  } catch (e) {
    console.log(e);
  }

  return new Token({
    id: tokenId,
    name: getDecoratedCallResult(name),
    symbol: getDecoratedCallResult(symbol),
    decimals,
    contractStandard,
    contractAddress
  });
}
