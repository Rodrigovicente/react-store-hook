import React, { useState } from 'react'
import { useStore } from '../hooks/useStore'

const TestB: React.FC = () => {
	console.log('RENDERING B')

	const [state, dispatch] = useStore('test_b')

	const [num, setNum] = useState('')

	const handleCharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNum(e.target.value)
	}

	return (
		<>
			<p>
				counter:
				<br />
				{state.counter}
			</p>

			<input type="number" value={num} onChange={handleCharChange} />
			<br />
			<br />
			<button type="button" onClick={() => dispatch('ADD', num)}>
				Add
			</button>
			<button type="button" onClick={() => dispatch('SET', num)}>
				Set
			</button>
			<button type="button" onClick={() => dispatch('INCREMENT')}>
				Increment
			</button>
			<button type="button" onClick={() => dispatch('DECREMENT')}>
				Decrement
			</button>
			<button type="button" onClick={() => dispatch('RESET')}>
				Reset
			</button>
		</>
	)
}

export default TestB
