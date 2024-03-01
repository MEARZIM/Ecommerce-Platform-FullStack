import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'
import { store } from './app/store.tsx'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
