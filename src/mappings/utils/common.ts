import { TransferType } from '../../model';

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
