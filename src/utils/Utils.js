export function isLogged(){
    return localStorage.getItem('token') != null;
}