import { PublicAddress } from './PublicAddress'

export type FioFeeRatio = {
    end_point: string;
    value: number;
};

export const FioAddPubAddressActionAccount = 'fio.address';
export const FioAddPubAddressActionName = 'addaddress';
export type FioAddPubAddressActionData = {
    fio_address: string;
    public_addresses: Array<PublicAddress>;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioBurnExpiredActionAccount = 'fio.address';
export const FioBurnExpiredActionName = 'burnexpired';
export type FioBurnExpiredActionData = {};

export const FioClaimBPRewardsActionAccount = 'fio.treasury';
export const FioClaimBPRewardsActionName = 'bpclaim';
export type FioClaimBPRewardsActionData = {
    fio_address: string;
    actor?: string;
};

export const FioNewFundsRequestActionAccount = 'fio.reqopt';
export const FioNewFundsRequestActionName = 'newfundsreq';
export type FioNewFundsRequestActionData = {
    payer_fio_address: string;
    payee_fio_address: string;
    content: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioPayTpidRewardsActionAccount = 'fio.treasury';
export const FioPayTpidRewardsActionName = 'tpidclaim';
export type FioPayTpidRewardsActionData = {
    actor?: string;
};

export const FioProxyVoteActionAccount = 'eosio';
export const FioProxyVoteActionName = 'voteproxy';
export type FioProxyVoteActionData = {
    proxy: string;
    fio_address: string;
    actor?: string;
    max_fee?: number;
};

export const FioRecordObtDataActionAccount = 'fio.reqopt';
export const FioRecordObtDataActionName = 'recordobt';
export type FioRecordObtDataActionData = {
    payee_fio_address: string;
    content: string;
    fio_request_id: number;
    max_fee: number;
    tpid: string;
    actor: string;
};

export const FioRegisterFioAddressActionAccount = 'fio.address';
export const FioRegisterFioAddressActionName = 'regaddress';
export type FioRegisterFioAddressActionData = {
    fio_address: string;
    owner_fio_public_key: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioRegisterFioDomainActionAccount = 'fio.address';
export const FioRegisterFioDomainActionName = 'regdomain';
export type FioRegisterFioDomainActionData = {
    fio_domain: string;
    owner_fio_public_key: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioRegisterProducerActionAccount = 'eosio';
export const FioRegisterProducerActionName = 'regproducer';
export type FioRegisterProducerActionData = {
    fio_address: string;
    fio_pub_key: string;
    url: string;
    location: number;
    actor?: string;
    max_fee?: number;
};

export const FioRegisterProxyActionAccount = 'eosio';
export const FioRegisterProxyActionName = 'regproxy';
export type FioRegisterProxyActionData = {
    fio_address: string;
    actor?: string;
    max_fee?: number;
};

export const FioRejectFundsRequestActionAccount = 'fio.reqobt';
export const FioRejectFundsRequestActionName = 'rejectfndreq';
export type FioRejectFundsRequestActionData = {
    fio_request_id: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioRenewFioAddressActionAccount = 'fio.address';
export const FioRenewFioAddressActionName = 'renewaddress';
export type FioRenewFioAddressActionData = {
    fio_address: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioRenewFioDomainActionAccount = 'fio.address';
export const FioRenewFioDomainActionName = 'renewdomain';
export type FioRenewFioDomainActionData = {
    fio_address: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioSetFioDomainPublicActionAccount = 'fio.address';
export const FioSetFioDomainPublicActionName = 'setdomainpub';
export type FioSetFioDomainPublicActionData = {
    fio_domain: string;
    is_public: number;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioSubmitBundledTransactionActionAccount = 'fio.fee';
export const FioSubmitBundledTransactionActionName = 'bundlevote';
export type FioSubmitBundledTransactionActionData = {
    bundled_transactions: number;
    actor?: string;
};

export const FioSubmitFeeMultiplierActionAccount = 'fio.fee';
export const FioSubmitFeeMultiplierActionName = 'setfeemult';
export type FioSubmitFeeMultiplierActionData = {
    multiplier: number;
    actor?: string;
};

export const FioSubmitFeeRatiosActionAccount = 'fio.fee';
export const FioSubmitFeeRatiosActionName = 'setfeevote';
export type FioSubmitFeeRatiosActionData = {
    fee_ratios: Array<FioFeeRatio>;
    actor?: string;
};

export const FioTransferTokensPubKeyActionAccount = 'fio.token';
export const FioTransferTokensPubKeyActionName = 'trnsfiopubky';
export type FioTransferTokensPubKeyActionData = {
    payee_public_key: string;
    amount: string;
    max_fee?: number;
    tpid?: string;
    actor?: string;
};

export const FioUnregisterProducerActionAccount = 'eosio';
export const FioUnregisterProducerActionName = 'unregprod';
export type FioUnregisterProducerActionData = {
    fio_address: string;
    actor?: string;
    max_fee?: number;
};

export const FioUnregisterProxyActionAccount = 'eosio';
export const FioUnregisterProxyActionName = 'unregproxy';
export type FioUnregisterProxyActionData = {
    fio_address: string;
    actor?: string;
    max_fee?: number;
};

export const FioVoteProducerActionAccount = 'eosio';
export const FioVoteProducerActionName = 'voteproducer';
export type FioVoteProducerActionData = {
    producers: Array<String>;
    fio_address: string;
    actor?: string;
    max_fee?: number;
};

export type FioActionData =
    | FioAddPubAddressActionData
    | FioBurnExpiredActionData
    | FioClaimBPRewardsActionData
    | FioNewFundsRequestActionData
    | FioPayTpidRewardsActionData
    | FioProxyVoteActionData
    | FioRecordObtDataActionData
    | FioRegisterFioAddressActionData
    | FioRegisterFioDomainActionData
    | FioRegisterProducerActionData
    | FioRegisterProxyActionData
    | FioRejectFundsRequestActionData
    | FioRenewFioAddressActionData
    | FioRenewFioDomainActionData
    | FioSetFioDomainPublicActionData
    | FioSubmitBundledTransactionActionData
    | FioSubmitFeeMultiplierActionData
    | FioSubmitFeeRatiosActionData
    | FioTransferTokensPubKeyActionData
    | FioUnregisterProducerActionData
    | FioUnregisterProxyActionData
    | FioVoteProducerActionData;
