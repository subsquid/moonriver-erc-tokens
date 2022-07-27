import { BigNumber } from 'ethers';
import { ContractStandard, FToken } from '../../model';
import { Context } from '../../processor';
import { addTimeout } from '@subsquid/util-timeout';
import { contractCallTimeout } from '../../config';
import { TokenDetails } from '../../common/types';

import * as contracts from '../contracts';

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

export async function getTokenDetails({
  tokenId = null,
  contractAddress,
  contractStandard,
  blockHeight,
  ctx
}: {
  tokenId?: BigNumber | null;
  contractAddress: string;
  contractStandard: ContractStandard;
  blockHeight: number;
  ctx: Context;
}): Promise<TokenDetails> {
  let contractInst = null;
  switch (contractStandard) {
    case ContractStandard.ERC20:
      contractInst = contracts.getContractErc20({
        blockHeight,
        contractAddress,
        ctx
      });
      break;
    case ContractStandard.ERC721:
      contractInst = contracts.getContractErc721({
        blockHeight,
        contractAddress,
        ctx
      });
      break;
    case ContractStandard.ERC1155:
      contractInst = contracts.getContractErc1155({
        blockHeight,
        contractAddress,
        ctx
      });
      break;
    default:
  }

  if (!contractInst) throw new Error('contractInst is null');

  let name: string | null = null;
  let symbol: string | null = null;
  let decimals: number | null = null;
  let uri: string | null = null;

  try {
    name =
      'name' in contractInst
        ? await addTimeout(contractInst.name(), contractCallTimeout)
        : null;
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
  try {
    if ('uri' in contractInst && tokenId) {
      uri = await addTimeout(contractInst.uri(tokenId), contractCallTimeout);
    } else if ('tokenURI' in contractInst && tokenId) {
      uri = await addTimeout(
        contractInst.tokenURI(tokenId),
        contractCallTimeout
      );
    }
  } catch (e) {
    console.log(e);
  }

  return {
    name: getDecoratedCallResult(name),
    symbol: getDecoratedCallResult(symbol),
    decimals,
    uri
  };
}
