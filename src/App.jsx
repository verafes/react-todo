import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {apiKey, baseId, tableName} from '../config.js';
import TodoContainer from './components/TodoContainer.jsx'
import NavBar from './components/NavBar.jsx';
import HomePage from './pages/HomePage';
import NewListPage from './pages/NewListPage';
import NotFoundPage from './pages/NotFoundPage';
import TodoListSelector from './components/TodoListSelector';
import Footer from './components/Footer';


function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <main>
                <Routes>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                    <Route path="/todos/:listName" element={
                        < TodoContainer
                            tableName={tableName}
                            baseId={baseId}
                            apiKey={apiKey}/>
                    }/>
                    <Route exact path="/mylists" element={
                        <TodoListSelector
                            tableName={tableName}
                            baseId={baseId}
                            apiKey={apiKey}/>
                    }/>
                    <Route path="/new" element={<NewListPage/>}/>
                </Routes>
            </main>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;
