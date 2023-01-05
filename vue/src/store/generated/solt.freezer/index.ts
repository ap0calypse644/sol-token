import { Client, registry, MissingWalletError } from 'solt-client-ts'

import { Params } from "solt-client-ts/solt.freezer/types"


export { Params };

function initClient(vuexGetters) {
	return new Client(vuexGetters['common/env/getEnv'], vuexGetters['common/wallet/signer'])
}

function mergeResults(value, next_values) {
	for (let prop of Object.keys(next_values)) {
		if (Array.isArray(next_values[prop])) {
			value[prop]=[...value[prop], ...next_values[prop]]
		}else{
			value[prop]=next_values[prop]
		}
	}
	return value
}

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	let structure: {fields: Field[]} = { fields: [] }
	for (const [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const getDefaultState = () => {
	return {
				Params: {},
				
				_Structure: {
						Params: getStructure(Params.fromPartial({})),
						
		},
		_Registry: registry,
		_Subscriptions: new Set(),
	}
}

// initial state
const state = getDefaultState()

export default {
	namespaced: true,
	state,
	mutations: {
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		},
		QUERY(state, { query, key, value }) {
			state[query][JSON.stringify(key)] = value
		},
		SUBSCRIBE(state, subscription) {
			state._Subscriptions.add(JSON.stringify(subscription))
		},
		UNSUBSCRIBE(state, subscription) {
			state._Subscriptions.delete(JSON.stringify(subscription))
		}
	},
	getters: {
				getParams: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Params[JSON.stringify(params)] ?? {}
		},
				
		getTypeStructure: (state) => (type) => {
			return state._Structure[type].fields
		},
		getRegistry: (state) => {
			return state._Registry
		}
	},
	actions: {
		init({ dispatch, rootGetters }) {
			console.log('Vuex module: solt.freezer initialized!')
			if (rootGetters['common/env/client']) {
				rootGetters['common/env/client'].on('newblock', () => {
					dispatch('StoreUpdate')
				})
			}
		},
		resetState({ commit }) {
			commit('RESET_STATE')
		},
		unsubscribe({ commit }, subscription) {
			commit('UNSUBSCRIBE', subscription)
		},
		async StoreUpdate({ state, dispatch }) {
			state._Subscriptions.forEach(async (subscription) => {
				try {
					const sub=JSON.parse(subscription)
					await dispatch(sub.action, sub.payload)
				}catch(e) {
					throw new Error('Subscriptions: ' + e.message)
				}
			})
		},
		
		
		
		 		
		
		
		async QueryParams({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.SoltFreezer.query.queryParams()).data
				
					
				commit('QUERY', { query: 'Params', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryParams', payload: { options: { all }, params: {...key},query }})
				return getters['getParams']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryParams API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		async sendMsgMintTokens({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.SoltFreezer.tx.sendMsgMintTokens({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgMintTokens:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgMintTokens:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgUnfreezeTokens({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.SoltFreezer.tx.sendMsgUnfreezeTokens({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUnfreezeTokens:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUnfreezeTokens:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgFreezeTokens({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.SoltFreezer.tx.sendMsgFreezeTokens({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgFreezeTokens:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgFreezeTokens:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		
		async MsgMintTokens({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.SoltFreezer.tx.msgMintTokens({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgMintTokens:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgMintTokens:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgUnfreezeTokens({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.SoltFreezer.tx.msgUnfreezeTokens({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUnfreezeTokens:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUnfreezeTokens:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgFreezeTokens({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.SoltFreezer.tx.msgFreezeTokens({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgFreezeTokens:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgFreezeTokens:Create Could not create message: ' + e.message)
				}
			}
		},
		
	}
}
