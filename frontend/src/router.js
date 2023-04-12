import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import Home from "./components/Home";
import ListUsers from "./components/user/listUsers";
import AddUser from "./components/user/addUser";
import User from "./components/user/User";
import ListThemes from "./components/theme/listThemes";
import Theme from "./components/theme/theme";
import AddTheme from "./components/theme/addTheme";
import ListSpeakers from "./components/speaker/listSpeakers";
import Speaker from "./components/speaker/speaker";
import AddSpeaker from "./components/speaker/addSpeaker";
import ListPresentations from "./components/presentation/listPresentations";
import Presentation from "./components/presentation/presentation";
import AddPresentation from "./components/presentation/addPresentation";
import Login from "./components/authorization/Login";
import store from "./store/index";
//import { hasOwnMetadata } from "core-js/fn/reflect";

// определяем маршруты
const routes = [
    {
        path:"/",
        name:"Home",
        alias:"/home",
        component: Home,
        meta:{
            title:"Семинары ИМИТ ИГУ"
        }
    },
    {
        path: "/listUsers", // указание маршрута, по которому будем переходить к списку пользователей
        name: "users", // имя маршрута
        alias: "/users", // указание дополнительного маршрута
        component: ListUsers, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список пользователей",
            requiredAuth: true
        }
    },
    {
        path: "/user/:id",
        name: "user-details",
        component: User,
        props: true, // указываем, что компонент User.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные пользователя",
            requiredAuth: true
        }
    },
    {
        path: "/addUser",
        name: "add-user",
        component: AddUser,
        meta: {
            title: "Добавление пользователя",
            requiredAuth: true
        }
    },
    {
        path: "/listThemes",
        name: "themes",
        component: ListThemes,
        meta: {
            title: "Список тем"
        }
    },
    {
        path: "/theme/:id",
        name: "theme-details",
        component: Theme,
        props: true,
        meta: {
            title: "Тема"
        }
    },
    {
        path: "/addTheme",
        name: "add-theme",
        component: AddTheme,
        meta: {
            title: "Добавление темы",
            requiredAuth: true
        }
    },
    {
        path: "/listSpeakers",
        name: "speakers",
        component: ListSpeakers,
        meta: {
            title: "Список спикеров"
        }
    },
    {
        path: "/speaker/:id",
        name: "speaker-details",
        component: Speaker,
        props: true,
        meta: {
            title: "Спикер"
        }
    },
    {
        path: "/addSpeaker",
        name: "add-speaker",
        component: AddSpeaker,
        meta: {
            title: "Добавление спикера",
            requiredAuth: true
        }
    },
    {
        path: "/listPresentations",
        name: "presentations",
        component: ListPresentations,
        meta: {
            title: "Список докладов"
        }
    },
    {
        path: "/presentation/:id",
        name: "presentation-details",
        component: Presentation,
        props: true,
        meta: {
            title: "Доклад"
        }
    },
    {
        path: "/addPresentation",
        name: "add-presentation",
        component: AddPresentation,
        meta: {
            title: "Добавление доклада",
            requiredAuth: true
        }
    },
    {
        path:"/login",
        name:"login-user",
        component:Login,
        meta:{
            title:"Вход в систему"
        }
    }

];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

router.beforeEach(async (to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';

    // проверяем наличие токена и срок его действия
    const auth = await store.getters["auth/isTokenActive"];
    if (auth) {
        return next();
    }

    // если токена нет или его срок действия истёк, а страница доступна только авторизованному пользователю,
    // то переходим на страницу входа в систему (ссылка на /login)
    else if (!auth && to.meta.requiredAuth) {
        const user = JSON.parse(localStorage.getItem("user"));
        await store.dispatch("auth/refreshToken", user)
            .then(() => {
                return next();
            })
            .catch(() => {
                return next({path: "/login"});
            });
        return next({ path: "/login" });
    }
    return next();
});

export default router;