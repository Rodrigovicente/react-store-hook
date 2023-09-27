import { useState, useEffect } from 'react'

type GlobalStores = Record<string, Record<string, any>>

type Action = (store: Record<string, any>, payload?: any) => Record<string, any>

type GlobalActions = Record<string, Record<string, Action>>

const globalStores: GlobalStores = {}
const listeners: Record<string, ((state: any) => void)[]> = {}
const globalActions: GlobalActions = {}

export const useStore: (
	storeName: string
) => [any, (actionId: string, payload?: any) => void] = (storeName: string) => {
	if (storeName === undefined) throw new Error('No store name provided')
	/*
	let state
	
	if (storeName === undefined) {
		// get all stores (no store name provided)
		state = globalStores
	} else {
		*/
	// get specific store
	if (globalStores[storeName] === undefined) {
		globalStores[storeName] = {}
	}

	if (globalActions[storeName] === undefined) {
		globalActions[storeName] = {}
	}

	if (listeners[storeName] === undefined) {
		listeners[storeName] = []
	}

	const state = globalStores[storeName]
	/*}*/

	const setState = useState(state)[1]

	const dispatch = (actionId: string, payload?: any) => {
		const action = globalActions[storeName][actionId]

		if (action === undefined) throw new Error(`No action found for ${actionId}`)

		const newState = action(globalStores[storeName], payload)

		let isUnchanged = true

		for (const key in newState) {
			if (globalStores[storeName][key] !== newState[key]) {
				isUnchanged = false
				break
			}
		}

		if (isUnchanged) return

		globalStores[storeName] = { ...globalStores[storeName], ...newState }

		for (const listener of listeners[storeName]) {
			listener(globalStores[storeName])
		}
	}

	useEffect(() => {
		listeners[storeName].push(setState)

		return () => {
			listeners[storeName] = listeners[storeName].filter(
				listener => listener !== setState
			)
		}
	}, [setState, storeName])

	return [globalStores[storeName], dispatch]
}

export const initStore = (
	storeName: string,
	actions: Record<string, Action>,
	initialState?: Record<string, any>
) => {
	if (initialState) {
		globalStores[storeName] = { ...globalStores[storeName], ...initialState }
	}

	globalActions[storeName] = { ...globalActions[storeName], ...actions }
}

// export const getAllStores = () => {
// 	return globalStores
// }
