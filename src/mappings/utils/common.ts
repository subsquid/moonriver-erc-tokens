import { TransferType } from '../../model';
import { BigNumber } from 'ethers';

export const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';

export function getTokenEntityId(address: string, tokenId?: string): string {
  return `${address.substring(0, 6)}-${address.substring(
    address.length - 6,
    address.length
  )}${tokenId ? `-${tokenId}` : ''}`;
}

export function getNftTransferEntityId(
  eventId: string,
  tokenId: string
): string {
  return `${eventId}-${tokenId}`;
}

export function getAccountTransferEntityId(
  accountId: string,
  transferId: string
): string {
  return `${accountId}-${transferId}`;
}

export const isMint = (from: string, to: string) => {
  return from === EMPTY_ADDRESS && to !== EMPTY_ADDRESS;
};

export const isBurn = (from: string, to: string) => {
  return to === EMPTY_ADDRESS && from !== EMPTY_ADDRESS;
};

export const getTransferType = (from: string, to: string): TransferType => {
  if (isMint(from, to)) {
    return TransferType.MINT;
  }
  if (isBurn(from, to)) {
    return TransferType.BURN;
  }

  return TransferType.TRANSFER;
};

export const getTokenTotalSupply = (
  currentAmount: BigInt,
  newAmount: BigInt,
  txType: TransferType
): bigint => {
  const newValue =
    txType === TransferType.MINT
      ? BigInt(
          BigNumber.from(currentAmount)
            .add(BigNumber.from(newAmount))
            .toString()
        )
      : BigInt(
          BigNumber.from(currentAmount)
            .sub(BigNumber.from(newAmount))
            .toString()
        );

  return newValue >= 0 ? newValue : BigInt(0);
};

export const getTokenBurnedStatus = (currentAmount: BigInt): boolean => {
  return currentAmount <= BigInt(0);
};
