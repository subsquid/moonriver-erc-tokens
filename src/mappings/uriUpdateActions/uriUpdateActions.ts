import { NfToken, UriUpdateAction } from '../../model';
import * as utils from '../utils';

export function createUriUpdateActions({
  id,
  token,
  newValue
}: {
  id: string;
  token: NfToken;
  newValue: string | null;
}): UriUpdateAction {
  const block = utils.common.blockContextManager.getCurrentBlock();

  return new UriUpdateAction({
    id,
    token,
    newValue,
    timestamp: new Date(block.timestamp),
    blockNumber: BigInt(block.height.toString())
  });
}
