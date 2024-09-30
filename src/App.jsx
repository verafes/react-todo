import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoContainer from './components/TodoContainer.jsx'
import { apiKey, baseId, tableName } from '../config.js';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={
                    <TodoContainer
                        tableName={tableName}
                        baseId={baseId}
                        apiKey={apiKey}/>} />
                <Route path="/new" element={<h1>New Todo List</h1>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
