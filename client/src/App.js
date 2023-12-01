import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import './App.css';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {Dashboard} from "./components/dashboard";
import { RestoNav } from "./components/resto/restoNav";
import Resto from "./components/resto/menu";
import MenuDetail from "./components/resto/menudetail";
// import {TempNav} from "./components/tempNav";
// import {Hr} from "./components/hr";



function App() {
  return (
      <BrowserRouter>
          <Routes>
                <Route path="/" index element={<Dashboard/>}/>
              <Route path='/resto' element={<RestoNav/>}>
                  <Route path="/resto" index element={<Resto/>} />
                  {/* <Route path="/resto/menu" index element={<MenuDetail/>} /> */}
                  {/* <Route path='/resto/menu' element={<Menu/>}/> */}   
              </Route>
              <Route path='/resto/menu' element={<RestoNav/>}>
                  <Route path="/resto/menu" index element={<MenuDetail/>} />
                  {/* <Route path="/resto/menu" index element={<MenuDetail/>} /> */}
                  {/* <Route path='/resto/menu' element={<Menu/>}/> */}   
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
