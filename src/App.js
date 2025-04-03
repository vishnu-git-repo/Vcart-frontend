import "./utils/css/main.css"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import ProductAction from "./pages/ProdutAction"
import Header from "./components/Common/Header"
import Home from "./components/Home"
import AuthUser from "./pages/AuthUser"
import Cart from "./components/Cart/Cart"
import Orders from "./components/Order/Orders"
import About from "./components/Common/About"

export default function App(){
  // const api_uri = process.env.RECAT_APP_API_URI
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <> 
              <Header component={"Home"} />
              <Home/> 
            </>
            } 
          />
          <Route path="/cart" element={
            <> <Header component={"Cart"} />
            <Cart/> 
            </>
            }
          />
          <Route path="/orders" element={
            <> 
              <Header component={"Orders"} />
              <Orders/> 
            </>
            }
          />
          <Route path="/about" element={
            <>
              <Header component={"About"} />
              <About/> 
            </>
          } 
          />

          <Route path="/auth" element={<AuthUser/>} />

          <Route path="/product" >
            <Route path={"create"} element={<ProductAction/>} />
            <Route path={"update/:id"} element={<ProductAction/>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}