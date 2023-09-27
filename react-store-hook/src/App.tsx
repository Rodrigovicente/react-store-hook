import './App.css'
import TestA from './components/TestA'
import TestB from './components/TestB'
import { initStore } from './hooks/useStore'

function App() {
	initStore(
		'test_a',
		{
			ADD_CHAR: (state, payload) => {
				return { charList: [...state.charList, payload] }
			},
			REMOVE_LAST_CHAR: state => {
				return { charList: state.charList.slice(0, -1) }
			},
			MAKE_PHRASE: state => {
				return { phrase: state.charList.join('') }
			},
			CLEAR_PHRASE: () => {
				return { phrase: '' }
			},
		},
		{
			charList: ['a', 'b', 'c'],
		}
	)

	initStore(
		'test_b',
		{
			ADD: (state, payload: number) => {
				return { counter: state.counter + +payload }
			},
			INCREMENT: state => {
				return { counter: state.counter + 1 }
			},
			DECREMENT: state => {
				return { counter: state.counter - 1 }
			},
			SET: (_, payload: number) => {
				return { counter: +payload }
			},
			RESET: () => {
				return { counter: 0 }
			},
		},
		{
			counter: 0,
		}
	)

	return (
		<>
			<TestA />
			<TestB />
		</>
	)
}

export default App
