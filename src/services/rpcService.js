import { JsonRpc } from 'eosjs';
import { nodeUrl } from '@configs/telosConfig';

export function rpcService() {
  const isServerSide = typeof window === 'undefined';
  const rpc = isServerSide
    ? new JsonRpc(nodeUrl, { fetch })
    : new JsonRpc(nodeUrl);

  return rpc;
}
