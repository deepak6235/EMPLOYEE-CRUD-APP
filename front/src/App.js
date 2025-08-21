import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Add from './components/Add';
import Show from './components/Show';
import Update from './components/Update';
import Details from './components/Details';


function App() {
  return (

<Routes>
  <Route path='/' element={<Show/>} />
  <Route path='/add' element={<Add/>} />
  <Route path='/update/:id' element={<Update/>}/>
  <Route path='/details/:id' element={<Details/>}/>
</Routes>

    
    



  );
}

export default App;
