const API_BASE_INVESTMENT_URL = 'http://localhost:8080/api/house';
const API_BASE_TODO_URL = 'http://localhost:8080/api/todo';
const API_BASE_CATEGORY_URL = 'http://localhost:8080/api/category';
const LOGIN_URL = 'http://localhost:8080/api/login';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });
    const defaults = {headers: headers,credentials: 'same-origin'};
    options = Object.assign({}, defaults, options);


    return fetch(options.url, options)
        .then(response => response.json());
};

const request2 = (options) => {
    const defaults = {credentials: 'same-origin'};
    options = Object.assign({}, defaults, options);


    return fetch(options.url, options);
};

export function getAllHouses(){
    return request({
       url: API_BASE_INVESTMENT_URL + '/all',
        headers: {'Content-Type': 'application/json', 'Authorization': `Basic ${localStorage.getItem('token')}`},
        method: 'GET'
    });
}

export function checkLoginCredentials(username, password ){
    return request({
        url: LOGIN_URL,
        method:'POST',
        body: JSON.stringify({
            username:username,
            password:password
        })
    });
}

export function sendCreatedInvestment(data){
    return request({
        url: API_BASE_INVESTMENT_URL,
        method:'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Basic ${localStorage.getItem('token')}`},
        body:JSON.stringify(data)
    });
}

export function deleteInvestment(id){
    return request({
        url: API_BASE_INVESTMENT_URL+'/'+id,
        headers: {'Content-Type': 'application/json', 'Authorization': `Basic ${localStorage.getItem('token')}`},
        method: 'DELETE'
    });
}

export function getAllTodos(){
    return request({
        url: API_BASE_TODO_URL,
        headers: {'Content-Type': 'application/json', 'Authorization': `Basic ${localStorage.getItem('token')}`},
        method: 'GET'
    });
}

export function sendSpecificInvestmentTodo(data, investmentId, categoryId){
    return request({
        url: API_BASE_INVESTMENT_URL+'/'+investmentId+'/'+categoryId+'/todo',
        method:'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Basic ${localStorage.getItem('token')}`},
        body:JSON.stringify(data)
    });
}

export function getTodosHouse(houseId, categoryId) {
    return request({
        url: API_BASE_INVESTMENT_URL+'/'+houseId+'/'+categoryId+'/todos',
        headers: {'Content-Type': 'application/json', 'Authorization': `Basic ${localStorage.getItem('token')}`},
        method: 'GET'
    });
}

export function sendUpdatedTodos(todos,houseId, categoryId){
    return request2({
        url:API_BASE_INVESTMENT_URL+'/'+houseId+'/'+categoryId,
        headers: {'Content-Type': 'application/json', 'Authorization': `Basic ${localStorage.getItem('token')}`},
        method:'POST',
        body:JSON.stringify(todos)
    });
}

export function getImage(houseName) {
    if(houseName!=null){
        return require(`../assets/houses/${houseName}`);
    } else{
        return require('../assets/houses/default-house.jpg');
    }

}


export function downloadDocument(id){
    return request2({
        url: API_BASE_INVESTMENT_URL+'/document/'+id,
        headers: {'Content-Type': 'blob', 'Authorization': `Basic ${localStorage.getItem('token')}`},
        responseType: 'blob',
        method:'GET'
    });
}

export function uploadFileToServer(generalId, data){
    return request({
        url:API_BASE_INVESTMENT_URL+'/document/'+generalId,
        headers: {'Authorization': `Basic ${localStorage.getItem('token')}`},
        method:'POST',
        body:data
    });
}

export function removeTodoFromHouse(todoId){
    return request({
        url:API_BASE_INVESTMENT_URL+'/'+todoId+'/todo',
        headers: {'Authorization': `Basic ${localStorage.getItem('token')}`},
        method:'DELETE'
    });
}

export function extractCSVToTodos(houseId, categoryId, data) {
    return request({
        url:API_BASE_INVESTMENT_URL+'/'+houseId+'/'+categoryId+'/todos',
        headers: {'Authorization': `Basic ${localStorage.getItem('token')}`},
        method:'POST',
        body:data
    });
}

export function getAllCategories(){
    return request({
        url: API_BASE_CATEGORY_URL+'/all/',
        headers: {'Authorization': `Basic ${localStorage.getItem('token')}`},
        method:'GET'
    });
}



