import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import store from './store'
import 'normalize.css'
import 'antd/dist/antd.css'
import './style.scss'
import HomeManagement from './container/HomeManagement'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HomeManagement />
  </Provider>
);

