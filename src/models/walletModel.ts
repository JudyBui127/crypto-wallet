import * as bitcoin from "bitcoinjs-lib";
import * as bip39 from "bip39";
import * as CryptoJS from "crypto-js";

export const BTC_NETWORK = (network: BTC_NETWORK_TYPE) =>
  network === "mainnet" ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
export type BTC_NETWORK_TYPE = "mainnet" | "testnet";
export interface WALLET {
  getPrivateKey: Function;
  getPublicKey: Function;
  getAddress: Function;
  getKeyPair: Function;
}
function initBTCWallet(words: string, network: BTC_NETWORK_TYPE): WALLET {
  const seed = mnemonicToSeed(words);
  const wallet = initHDWallet(seed, network);

  const basePath = "m/0'/0'";
  const derivePath = wallet.derivePath(basePath);

  function getKeyPair(index = 0) {
    const derivedKey = derivePath.derive(index);
    return derivedKey.keyPair;
  }
  function getPrivateKey(index: number): string {
    return getKeyPair(index).toWIF();
  }
  function getPublicKey(index = 0): string {
    return derivePath.derive(index).getPublicKeyBuffer().toString("hex");
  }
  function getAddress(index = 0): string {
    return wallet.derivePath(basePath).derive(index).getAddress();
  }
  return {
    getKeyPair,
    getPrivateKey,
    getPublicKey,
    getAddress,
  };
}

function importBTCWallet(wif: string, network: BTC_NETWORK_TYPE): WALLET {
  const ECPair = ecPairFromWIF(wif, network);
  function getKeyPair(index = 0) {
    return ECPair;
  }
  function getPrivateKey(index: number): string {
    return ECPair.toWIF();
  }
  function getPublicKey(index = 0): string {
    return ECPair.getPublicKeyBuffer().toString("hex");
  }
  function getAddress(index = 0): string {
    return ECPair.getAddress();
  }
  return {
    getKeyPair,
    getPrivateKey,
    getPublicKey,
    getAddress,
  };
}

function mnemonicToSeed(words: string) {
  return bip39.mnemonicToSeedSync(words);
}
// function seedToMnemonic(seed) {
// }

function initHDWallet(seed, network: BTC_NETWORK_TYPE) {
  return bitcoin.HDNode.fromSeedHex(seed, BTC_NETWORK(network));
}

function ecPairFromWIF(key, network: BTC_NETWORK_TYPE) {
  return bitcoin.ECPair.fromWIF(key, BTC_NETWORK(network));
}

// --------------------------------- External Uses ---------------------------//
export function generateSeed() {
  return bip39.generateMnemonic();
}

export function verifyMnemonic(words) {
  return bip39.validateMnemonic(words);
}

export function encryptPassphrase(
  encryptKey: string,
  password: string
): string {
  return CryptoJS.AES.encrypt(encryptKey, password).toString();
}
export function decrypt(token, password) {
  try {
    return CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(token, password));
  } catch (error) {
    return false;
  }
}
export { initBTCWallet, importBTCWallet };
