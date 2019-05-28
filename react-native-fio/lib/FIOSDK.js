"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transactions_1 = require("./transactions/Transactions");
const queries = require("./transactions/queries");
const SignedTransactions = require("./transactions/signed");
const constants_1 = require("./utils/constants");
const MockRegisterFioAddress_1 = require("./transactions/signed/MockRegisterFioAddress");
const { Ecc } = require('fiojs');
const fiojs_1 = require("fiojs");
class FIOSDK {
    constructor(privateKey, publicKey, baseUrl, io, fetchjson, registerMockUrl = '') {
        this.transactions = new Transactions_1.Transactions();
        this.io = io;
        Transactions_1.Transactions.baseUrl = baseUrl;
        Transactions_1.Transactions.FioProvider = fiojs_1.Fio;
        Transactions_1.Transactions.io = io;
        Transactions_1.Transactions.fetchJson = fetchjson;
        this.registerMockUrl = registerMockUrl;
        this.privateKey = privateKey;
        this.publicKey = publicKey;
        for (let accountName of constants_1.Constants.rawAbiAccountName) {
            this.getAbi(accountName).then(response => {
                Transactions_1.Transactions.abiMap.set(response.account_name, response);
            }).catch(error => {
                throw error;
            });
        }
    }
    static createPrivateKeyPair() {
        return __awaiter(this, void 0, void 0, function* () {
            const privateOwnerKey = yield Ecc.PrivateKey.randomKey();
            const fioOwnerKey = privateOwnerKey.toString();
            const privateActiveKey = yield Ecc.PrivateKey.randomKey();
            const fioKey = privateActiveKey.toString();
            return { fioOwnerKey, fioKey };
        });
    }
    static derivedPublicKey(fioOwnerKey, fioKey) {
        const publicKey = Ecc.privateToPublic(fioKey);
        let ownerPublicKey;
        if (fioOwnerKey) {
            ownerPublicKey = Ecc.privateToPublic(fioOwnerKey);
        }
        return { publicKey, ownerPublicKey };
    }
    getFioPublicAddress() {
        return 'publicFioAddress';
    }
    registerFioAddress(fioAddress) {
        let registerFioAddress = new SignedTransactions.RegisterFioAddress(fioAddress);
        return registerFioAddress.execute(this.privateKey, this.publicKey);
    }
    registerFioDomain(fioDomain) {
        let registerFioDomain = new SignedTransactions.RegisterFioDomain(fioDomain);
        return registerFioDomain.execute(this.privateKey, this.publicKey);
    }
    addPublicAddress(fioAddress, tokenCode, publicAddress, maxFee) {
        let addPublicAddress = new SignedTransactions.AddPublicAddress(fioAddress, tokenCode, publicAddress, maxFee);
        return addPublicAddress.execute(this.privateKey, this.publicKey);
    }
    recordSend(recordSendRequest) {
        let recordSend = new SignedTransactions.RecordSend(recordSendRequest);
        return recordSend.execute(this.privateKey, this.publicKey);
    }
    rejectFundsRequest(fioRequestId, maxFee) {
        let rejectFundsRequest = new SignedTransactions.RejectFundsRequest(fioRequestId, maxFee);
        return rejectFundsRequest.execute(this.privateKey, this.publicKey);
    }
    requestFunds(payerFioAddress, payeeFioAddress, payeePublicAddress, amount, tokenCode, metaData, maxFee) {
        let requestNewFunds = new SignedTransactions.RequestNewFunds(payerFioAddress, payeeFioAddress, payeePublicAddress, tokenCode, amount, metaData, maxFee);
        return requestNewFunds.execute(this.privateKey, this.publicKey);
    }
    isAvailable(fioName) {
        let availabilityCheck = new queries.AvailabilityCheck(fioName);
        return availabilityCheck.execute(this.publicKey);
    }
    getFioBalance(fioPublicAddress) {
        let getFioBalance = new queries.GetFioBalance(fioPublicAddress);
        return getFioBalance.execute(this.publicKey);
    }
    getFioNames(fioPublicKey) {
        let getNames = new queries.GetNames(fioPublicKey);
        return getNames.execute(this.publicKey);
    }
    getpendingFioRequests(fioPublicKey) {
        let pendingFioRequests = new queries.PendingFioRequests(fioPublicKey);
        return pendingFioRequests.execute(this.publicKey);
    }
    getSentFioRequests(fioPublicKey) {
        let sentFioRequest = new queries.SentFioRequests(fioPublicKey);
        return sentFioRequest.execute(this.publicKey);
    }
    getPublicAddress(fioAddress, tokenCode) {
        let publicAddressLookUp = new queries.PublicAddressLookUp(fioAddress, tokenCode);
        return publicAddressLookUp.execute(this.publicKey);
    }
    transferTokens(payeePublicKey, amount, maxFee) {
        let transferTokens = new SignedTransactions.TransferTokens(payeePublicKey, amount, maxFee);
        return transferTokens.execute(this.privateKey, this.publicKey);
    }
    getFee(endPoint, fioAddress = "") {
        let fioFee = new queries.GetFee(endPoint, fioAddress);
        return fioFee.execute(this.publicKey);
    }
    getAbi(accountName) {
        let abi = new queries.GetAbi(accountName);
        return abi.execute(this.publicKey);
    }
    registerFIOAddressOnBehalfOfUser(fioAddress, publicKey) {
        let server = this.registerMockUrl; // "mock.dapix.io/mockd/DEV2"
        let mockRegisterFioAddress = new MockRegisterFioAddress_1.MockRegisterFioAddress(fioAddress, publicKey, server);
        return mockRegisterFioAddress.execute();
    }
    getMultiplier() {
        return constants_1.Constants.multiplier;
    }
}
exports.FIOSDK = FIOSDK;
