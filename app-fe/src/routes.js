import Home from './pages/HomePage.tsx';
import ProductPage from './pages/ProductPage.js';
import LoginPage from './pages/LoginPage.tsx';


const publicRoutes = [
    { path: '/', component: Home, isPublic: true },
    { path: '/account', component: ProductPage, isPublic: false },
    { path: '/login', component: LoginPage, isPublic: false },

]


export { publicRoutes }