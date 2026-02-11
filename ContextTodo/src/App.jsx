import {TodoProvider} from './Context/contextTodo'
import { useState } from 'react'
import './App.css'

function App() {
 
  const [todo,todoHandler] = useState([])

 const addTodo = (todo) => {
  todoHandler((prev)=>[{id:Date.now(),...todo}, ...prev  ])
 }

 const updateTodo = (id,todo) => {
    todoHandler((prev)=> prev.map((prevTodo)=>(prevTodo.id === id ? todo : prevTodo)))
 }

 const deleteTodo=(id)=>{
  todoHandler((prev)=>prev.filter((todo)=>  todo.id !== id))
 }

 const toggleComplete=(id)=>{
  todoHandler((prev) => prev.map((prevTodo)=>prevTodo===id ?  {...prevTodo,complated: !prevTodo.complated}: prevTodo))

 }

  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
