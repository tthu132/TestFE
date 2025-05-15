import UserRouter from './UserRouter.js';
import ProductRouter from './ProductRouter.js';

const routes = (app) => {
    app.use('/user', UserRouter)
    app.use('/product', ProductRouter)
}
export default routes;