import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TodoContainer from './components/TodoContainer.jsx'
import NavBar from './components/NavBar.jsx';
import HomePage from './pages/HomePage';
import {apiKey, baseId, tableName} from '../config.js';
import listIcon from "./img/list.png";
import style from "./components/TodoContainer.module.css";
import TodoListSelector from './components/TodoListSelector';


function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/todos/:listName" element={
                    < TodoContainer
                        tableName={tableName}
                        baseId={baseId}
                        apiKey={apiKey}/>
                } />
                <Route exact path="/mylists" element={
                    <TodoListSelector
                            tableName={tableName}
                            baseId={baseId}
                            apiKey={apiKey}/>
                }/>
                <Route path="/new" element={
                    <div className={style.container}>
                        <img src={listIcon} alt="List Icon" className={style.icon}/>
                        <h1>New Todo List</h1>
                    </div>
                }/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
