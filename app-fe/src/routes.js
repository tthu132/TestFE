import Home from './pages/HomePage.tsx';
import ProductPage from './pages/ProductPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import AccountPage from './pages/AccountPage.tsx';


const publicRoutes = [
    { path: '/', component: Home, isPublic: true },
    { path: '/account', component: AccountPage, isPublic: true },
    { path: '/login', component: LoginPage, isPublic: true },
    { path: '/product/:id', component: ProductPage, isPublic: true },
]


export { publicRoutes }