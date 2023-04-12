import AuthService from '../services/auth.service';
var user = JSON.parse(localStorage.getItem('user'));
const state = () => ({
    authData: {
        token: "",
        refreshToken: "",
        tokenExp: ""
    },
    status: user ? { loggedIn: true } : { loggedIn: false },
    user: user ? user : null
});

// получение данных
const getters = {
    getLoginStatus(state) {
        return state.status;
    },
    getAuthData() {
        const user = JSON.parse(localStorage.getItem("user"));

        return {
            user: user
        };
    },
    isTokenActive() {
        const user = JSON.parse(localStorage.getItem("user"));
        const tokenExp = JSON.parse(localStorage.getItem("tokenExp"));
        if (!user || !tokenExp) {
            return false;
        }
        var result = AuthService.tokenAlive(tokenExp);
        return result;

    }
};

// проверим при загрузке страниц, что токен действителен
// если нет, то удалим данные пользователя из локального хранилища 
// таким образом, данные пользователя не будут отображаться в навигационной панели
if (!getters.isTokenActive()){
    localStorage.removeItem('user');
}

// действия: 1 - вход (login), 2 - выход (logout), 3 - проверка токена (refreshToken)
const actions = {
    login({ commit }, user) {
        return AuthService.login(user).then(
            user => {
                commit("loginSuccess", user);
                // Promise - объект, представляющий результат успешного или неудачного завершения операции
                return Promise.resolve(user);
            },
            error => {
                commit('loginFailure');
                return Promise.reject(error);
            }
        );
    },
    logout({ commit }) {
        AuthService.logout();
        commit('logout');
    },
    refreshToken({ commit }, user) {
        return AuthService.refreshToken(user).then(
            user => {
                commit('saveTokenData', user);
                return Promise.resolve(user);
            },
            error => {
                return Promise.reject(error);
            }
        );
    }
};

// Мутации. Позволяют изменять состояние хранилища во Vuex. Сохраняют данные пользователя и токена в локальное хранилище в браузере. Также удаляют данные пользователя
const mutations = {
    loginSuccess(state, user) {
        state.status.loggedIn = true;
        state.user = user;
        const jwtDecodedValue = AuthService.jwtDecrypt(user.accessToken);
        const newTokenData = {
            token: user.accessToken,
            tokenExp: jwtDecodedValue.exp
        };
        localStorage.setItem('tokenExp', JSON.stringify(newTokenData.tokenExp));
        state.authData = newTokenData;
    },
    loginFailure(state) {
        state.status.loggedIn = false;
        state.user = null;
    },
    logout(state) {
        state.status.loggedIn = false;
        state.user = null;
    },
    registerSuccess(state) {
        state.status.loggedIn = false;
    },
    registerFailure(state) {
        state.status.loggedIn = false;
    },
    saveTokenData(state, user) {
        const jwtDecodedValue = AuthService.jwtDecrypt(user.accessToken);
        const newTokenData = {
            token: user.accessToken,
            tokenExp: jwtDecodedValue.exp
        };
        state.authData = newTokenData;
    },
    setLoginStatus(state, value) {
        state.loginStatus = value;
    }
};

export default {
    // Разделяем state, getters, actions и mutations, устанавливая namespaced в значение true
    // К методам необходимо будет обращаться через указание state, getters, actions или mutations
    // Это сделано для того, чтобы избежать возможных конфликтов между именами методов
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};