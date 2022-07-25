import { Account, ContractStandard, Token } from '../model';
import { addTimeout } from '@subsquid/util-timeout';
import { getContractInstance } from './contract';
import { Context } from '../processor';
import { BigNumber } from 'ethers';
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
  tokenIdBn,
  contractAddress,
  contractStandard,
  blockHeight,
  ctx
}: {
  tokenId: string;
  tokenIdBn?: BigNumber;
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

  console.log(
    '---uri - ',
    'uri' in contractInst && tokenIdBn
      ? await contractInst.uri(tokenIdBn)
      : 'not_a_function'
  );

  let name: string | null = null;
  let symbol: string | null = null;
  let decimals: number | null = null;

  try {
    name =
      'name' in contractInst ? await addTimeout(contractInst.name(), contractCallTimeout) : null;
  } catch (e) {
    console.log(e);
  }
  try {
    symbol =
      'symbol' in contractInst
        ? await addTimeout(contractInst.symbol(), contractCallTimeout)
        : null;
  } catch (e) {
    console.log(e);
  }
  try {
    decimals =
      'decimals' in contractInst
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
