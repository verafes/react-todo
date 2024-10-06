import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TodoContainer from './components/TodoContainer.jsx'
import NavBar from './components/NavBar.jsx';
import {apiKey, baseId, tableName} from '../config.js';
import listIcon from "./img/list.png";
import style from "./components/TodoContainer.module.css";


function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route exact path="/" element={
                    <div className="home-container">
                        <h1>Welcome <br/> to the Todo App</h1>
                        <img src={listIcon} alt="List Icon" className={style.icon}/>
                        <p style={{fontSize: '1.5em', textAlign: 'center'}}>Create, edit and manage <br/>your todo
                            lists.</p>
                    </div>
                }/>
                <Route exact path="/mylists" element={
                    <TodoContainer
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
