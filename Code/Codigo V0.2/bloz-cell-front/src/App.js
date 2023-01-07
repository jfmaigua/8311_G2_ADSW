import './App.css'
import { Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout';
function App(){
  return(
    <div>
      <h1>BLOZ CELL</h1>
      <Routes>
        <Route path="/" element={<Layout/>}>

        </Route>
      </Routes>
    </div>
  )
}
export default App;