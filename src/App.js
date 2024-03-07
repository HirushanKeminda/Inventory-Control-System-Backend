import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { CategoryPage, ProductPage } from './Components/Pages';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CategoryPage />} />
          <Route path='/product-page' element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
