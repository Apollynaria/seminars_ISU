import http from "../http-common";

function login(user) {
    var data = {
        login: user.login,
        password: user.password
    };
    return http
            .post("/login", data)
            .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data)); // записываем данные пользователя в локальное хранилище, которое хранится в браузере
            }
            return response.data;
        });

}

function logout() {
    localStorage.removeItem('user'); // при нажатии кнопки "Выйти" удаляем данные пользователя из локального хранилища
}

// обработка обновления токена
// на стороне сервера установили время действия токена, если после указанного времени пользователь всё ещё работает в системе,
// то нужно сгенерировать другой токен
function refreshToken(user) {
    var data = {
        username: user.username
    };
    return http
        .post("/refreshToken", data)
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));// записываем данные пользователя в локальное хранилище, которое хранится в браузере
            }
            return response.data;
        });
}

// декодируем токен jwt, чтобы в вызывающем методе использовать время (понадобится для проверки срока действия токена)
function jwtDecrypt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        window.atob(base64)
            .split("")
            .map((c) => {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
    return JSON.parse(jsonPayload);
}

// проверяем срока действия токена
function tokenAlive(exp) {
    // Date.now() - возвращает дату сразу в виде миллисекунд
    // exp - время из JWT токена по формату Unix Time
    // Чтобы сравнить время, нужно exp перевести в миллисекунды
    if (Date.now() >= exp * 1000) {
        return false;
    }
    return true;
}

export default {
    login: login,
    logout: logout,
    refreshToken: refreshToken,
    jwtDecrypt: jwtDecrypt,
    tokenAlive: tokenAlive
};