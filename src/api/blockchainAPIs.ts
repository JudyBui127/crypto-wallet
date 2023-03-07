import { getFunctionName } from "@mui/utils/getDisplayName";
import axios, { AxiosError, AxiosInstance } from "axios";
import { BLOCKCHAIN_ENDPOINT } from "../utils/config";

// Developers: API request limits increased to 28,000 requests per 8 hour period and 600 requests per 5 minute period." / Twitter.Oct 17, 2013

const instance = axios.create({
  baseURL: BLOCKCHAIN_ENDPOINT,
  timeout: 2000,
});


class BlockInfoAPIs {
  instance: AxiosInstance
  constructor(instance) {
    this.instance = instance
  }
  static async  getLastestBlock() {
    const res:BlockInfoResponse = await instance.get('/lastestblock')
    return res
  }
  
  static async getBalance(addresses: string[]) {
    try {
      const res:BlockInfoResponse = await instance.get(`/balance?active=${addresses.join('|')}`)
      return res
    } catch (error: any) {
      return error.response?.data
    }
  }
  
  static async getMultiAddresses(addresses: string[]) {
    const res:BlockInfoResponse = await instance.get(`/multiaddr?active=${addresses.join('|')}`)
    return res
  }
  
  static async getUnsentOuputs(address: string) {
    const res:BlockInfoResponse = await instance.get(`/unspent?active=${address}`)
    return res
  }
}
interface BlockInfoResponse {
  data: {}
  error: string,
  message: string
}

export default BlockInfoAPIs
