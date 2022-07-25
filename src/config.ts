require('dotenv').config();

export const batchSize = process.env.BATCH_SIZE
  ? parseInt(process.env.BATCH_SIZE)
  : 60;

export const contractCallTimeout = process.env.CONTRACT_CALL_TIMEOUT
    ? parseInt(process.env.CONTRACT_CALL_TIMEOUT)
    : 5;

export const chainNode =
  process.env.CHAIN_NODE || 'wss://wss.api.moonriver.moonbeam.network';

