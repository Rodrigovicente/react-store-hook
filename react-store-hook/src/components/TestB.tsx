import React, { useRef } from 'react'
import { useStore } from '../hooks/useStore'

const TestB: React.FC = () => {
	console.log('RENDERING B')

	const [state, dispatch] = useStore('test_b')

	const inputRef = useRef<HTMLInputElement>(null)

	return (
		<>
			<p>
				counter:
				<br />
				{state.counter}
			</p>

			<input type="number" ref={inputRef} />
			<br />
			<br />
			<button
				type="button"
				onClick={() => dispatch('ADD', inputRef.current?.value ?? 0)}
			>
				Add
			</button>
			<button
				type="button"
				onClick={() => dispatch('SET', inputRef.current?.value ?? 0)}
			>
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
