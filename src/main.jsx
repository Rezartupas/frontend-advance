import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/redux/store'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import Homepage from './Pages/Homepage.jsx';
import Mylist from './Pages/Mylist.jsx';
import Admin from './Pages/Admin.jsx';
import Myprofile from './Pages/Myprofile.jsx';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Homepage />,
  },
  {
    path: "/mylist",  
    element: <Mylist />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/myprofile",
    element: <Myprofile />,
  },
  {
    path: "/",
    element: <App />,
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
