import React, { useEffect, useState } from 'react'
import { useStore } from '../hooks/useStore'

const TestA: React.FC = () => {
	console.log('RENDERING A')

	const [state, dispatch] = useStore('test_a')

	useEffect(() => {
		dispatch('MAKE_PHRASE', 'd')
	}, [])

	const [char, setChar] = useState('')

	const handleCharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChar(e.target.value)
	}

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

			<input
				type="text"
				maxLength={1}
				value={char}
				onChange={handleCharChange}
			/>
			<br />
			<br />
			<button type="button" onClick={() => dispatch('ADD_CHAR', char)}>
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
