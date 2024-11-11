import { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid'; // Utilisation de uuid pour générer des IDs uniques
import { Pencil, Trash2 } from 'lucide-react';

const ToDo = ({ name = 'Your To Do List' }) => {
	const [todos, setTodos] = useState([
		{ id: uuidv4(), text: 'Just some demo tasks' },
		{ id: uuidv4(), text: 'As an example' },
	]);
	const [inputVal, setInputVal] = useState('');
	const [currentEditIndex, setCurrentEditIndex] = useState(null);

	const handleInputChange = (e) => {
		setInputVal(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (currentEditIndex !== null) {
			// Editing an existing task
			const updatedTodos = [...todos];
			updatedTodos[currentEditIndex].text = inputVal;
			setTodos(updatedTodos);
			setCurrentEditIndex(null);
		} else {
			// Add a new task with a unique id
			const newTodo = { id: uuidv4(), text: inputVal };
			setTodos((prevTodos) => [...prevTodos, newTodo]);
		}

		setInputVal(''); //Reset input field
	};

	const onDelete = (index) => {
		setTodos((prevTodos) => prevTodos.filter((_, id) => id !== index));
	};

	const onEdit = (index) => {
		setInputVal(todos[index].text);
		setCurrentEditIndex(index);
	};

	return (
		<section className='text-center w-1/3'>
			<h3 className='text-4xl font-bold mb-8'>{name}</h3>
			<form onSubmit={handleSubmit} className='form-control mb-4'>
				<label htmlFor='task-entry' className='label'>
					Enter a task:{' '}
				</label>

				<div className='flex'>
					<input
						type='text'
						name='task-entry'
						value={inputVal}
						onChange={handleInputChange}
						placeholder='Create New task...'
						className='input input-bordered w-full  me-2'
					/>

					<button type='submit' className='btn btn-primary'>
						Submit
					</button>
				</div>
			</form>

			<h4 className='text-lg uppercase font-semibold text-start mt-8'>
				All the tasks!
			</h4>
			<div className='text-start my-5'>
				<ul>
					{todos.map((todo, index) => (
						<li
							key={todo.id}
							className='flex flex-row items-center justify-between border-b my-2 pb-2'>
							{/* Utilisation de 'id' ici */}
							<span>{todo.text}</span>
							<div>
								<button
									onClick={() => onEdit(index)}
									className=' text-blue-600 ms-2 p-2 hover:bg-slate-100 rounded-full'>
									<Pencil size={20} />
								</button>
								<button
									onClick={() => onDelete(index)}
									className='text-red-600 ms-2 p-2 hover:bg-slate-100 rounded-full'>
									<Trash2 size={20} />
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

ToDo.propTypes = {
	name: PropTypes.string.isRequired,
};

export default ToDo;
