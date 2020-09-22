import { RawAction } from '../../entities/RawAction';
import { RawTransaction } from '../../entities/RawTransaction';
import { Transactions } from '../Transactions';


export class PrepareTransaction extends Transactions {
    transaction: RawTransaction
    constructor() {
        super();
        this.transaction = new RawTransaction();
    }

    async execute(account: string, action: string, data: any): Promise<any> {
        const privky: string[] = new Array<string>();
        privky.push(this.privateKey);
        const chain = await this.getChainInfo().catch((error) =>
            console.error('chain:: ' + error)
        );
        const block = await this.getBlock(chain).catch((error) =>
            console.error('block: ' + error)
        );
        
        this.transaction.ref_block_num = block.block_num & 0xffff;
        this.transaction.ref_block_prefix = block.ref_block_prefix;
        const expiration = new Date(chain.head_block_time + 'Z');
        expiration.setSeconds(expiration.getSeconds() + 180);
        const expirationStr = expiration.toISOString();
        this.transaction.expiration = expirationStr.substr(
            0,
            expirationStr.length - 1
        );

        const rawaction = new RawAction();
        rawaction.account = account;
        Object.assign(rawaction, action);
        this.transaction.actions.push(rawaction);

        this.transaction.transaction_extensions = data;

        return Transactions.FioProvider.prepareTransaction({
            transaction: this.transaction,
            chainId: chain.chain_id,
            privateKeys: privky,
            abiMap: Transactions.abiMap,
            textDecoder: new TextDecoder(),
            textEncoder: new TextEncoder(),
        });
    }
}