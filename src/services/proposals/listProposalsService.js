import { rpcService } from '@services/rpcService';
import { telosWorks, telosDecide, maxLimit } from '@configs/telosConfig';
import { nameToUint64 } from '@utils/handleEosioName';

export async function listProposalsService({ ballotName, projectId }) {
  const rpc = rpcService();

  let { rows: proposals } = await rpc.get_table_rows({
    code: telosWorks.contractName,
    scope: telosWorks.scope,
    table: 'proposals',
    limit: maxLimit,
    json: true,
    reverse: false,
    show_payer: false,

    index_position: 2,
    lower_bound: projectId,
    upper_bound: projectId,
    key_type: 'i64',
  });

  if (ballotName) {
    const {
      rows: [ballot],
    } = await rpc.get_table_rows({
      code: telosDecide.contractName,
      table: 'ballots',
      scope: telosDecide.contractName,
      lower_bound: ballotName,
      limit: 1,
      json: true,
    });

    proposals = proposals.map((proposal) => {
      const option = ballot.options.find(
        (option) => Number(nameToUint64(option.key)) === proposal.proposal_id
      );

      return {
        votes: option?.value.replace('.0000 VOTE', '') || '0',
        ...proposal,
      };
    });
  }

  return proposals;
}
