"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrepareTransaction = void 0;
const RawAction_1 = require("../../entities/RawAction");
const RawTransaction_1 = require("../../entities/RawTransaction");
const Transactions_1 = require("../Transactions");
class PrepareTransaction extends Transactions_1.Transactions {
    constructor() {
        super();
        this.transaction = new RawTransaction_1.RawTransaction();
    }
    execute(account, action, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const privky = new Array();
            privky.push(this.privateKey);
            const chain = yield this.getChainInfo().catch((error) => console.error('chain:: ' + error));
            const block = yield this.getBlock(chain).catch((error) => console.error('block: ' + error));
            this.transaction.ref_block_num = block.block_num & 0xffff;
            this.transaction.ref_block_prefix = block.ref_block_prefix;
            const expiration = new Date(chain.head_block_time + 'Z');
            expiration.setSeconds(expiration.getSeconds() + 180);
            const expirationStr = expiration.toISOString();
            this.transaction.expiration = expirationStr.substr(0, expirationStr.length - 1);
            const rawaction = new RawAction_1.RawAction();
            rawaction.account = account;
            Object.assign(rawaction, action);
            this.transaction.actions.push(rawaction);
            this.transaction.transaction_extensions = data;
            return Transactions_1.Transactions.FioProvider.prepareTransaction({
                transaction: this.transaction,
                chainId: chain.chain_id,
                privateKeys: privky,
                abiMap: Transactions_1.Transactions.abiMap,
                textDecoder: new TextDecoder(),
                textEncoder: new TextEncoder(),
            });
        });
    }
}
exports.PrepareTransaction = PrepareTransaction;
