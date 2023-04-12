import { createApp } from 'vue' // Импорт метода для создания приложения
import App from './App.vue' // Импорт главного компонента
import router from './router' // Маршрутизация
import 'bootstrap/dist/css/bootstrap.css'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import store from './store';


const app = createApp(App); // Создание экземпляра приложения
app.component('DatePicker', Datepicker);

import {globalVariables} from './global.variables'
app.config.globalProperties.globalVariables = globalVariables;

app.use(router); // Подключение маршрутизации
app.use(store); 


app.mount('#app'); // Привязка экземпляра приложения к странице HTML (находится в public)
