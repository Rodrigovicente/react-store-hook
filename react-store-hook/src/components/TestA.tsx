import React, { useEffect, useRef } from 'react'
import { useStore } from '../hooks/useStore'

const TestA: React.FC = () => {
	console.log('RENDERING A')

	const [state, dispatch] = useStore('test_a')

	useEffect(() => {
		dispatch('MAKE_PHRASE', 'd')
	}, [])

	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<>
			<p>
				phrase:
				<br />
				{'joining ' +
					state.charList.join(', ') +
					' makes "' +
					state.phrase +
					'"'}
			</p>

			<input type="text" maxLength={1} ref={inputRef} />
			<br />
			<br />
			<button
				type="button"
				onClick={() => dispatch('ADD_CHAR', inputRef.current?.value ?? '')}
			>
				Add
			</button>
			<button type="button" onClick={() => dispatch('REMOVE_LAST_CHAR')}>
				Remove
			</button>
			<button type="button" onClick={() => dispatch('MAKE_PHRASE')}>
				Make
			</button>
			<button type="button" onClick={() => dispatch('CLEAR_PHRASE')}>
				Clear
			</button>
		</>
	)
}

export default TestA
