import axios from "axios"

const SERVER_URL = import.meta.env.VITE_SERVERURL;

export function fetchAllProducts() {
    return new Promise (async (resolve)=>{
        const response = await axios.get(SERVER_URL+'products');
        resolve(response.data.length);
    })
}

export function fetchProductsByFilter(filter: any, sort: any, pagination: any)  {
    let queryStr = '';

    // console.log(filter)
    //filter = {"category":["smartphone", "tops"]}
    //sort{_sort: price}
    //pagination = {_page: 1, _limit=10}

    for (let key in filter) {
        const category = filter[key];
        // console.log(category)
        if(category.length > 0) {
            for (let i = 0; i < category.length; i++) {
                const lastCategory = category[i];
                queryStr += `${key}=${lastCategory}&`
            }
        }
        // console.log(queryStr)
    }

    for(let key in sort){
        queryStr += `${key}=${sort[key]}&`
    }

    for(let key in pagination){
        queryStr += `${key}=${pagination[key]}&`
    }

    // console.log(queryStr)
    return new Promise (async (resolve)=>{
        const response = await axios.get(SERVER_URL+'products?'+queryStr);
        resolve(response);
    })
}

export function fetchAllbrands() {
    return new Promise (async (resolve)=>{
        const response = await axios.get(SERVER_URL+'brand');
        resolve(response);
    })
}

export function fetchAllCategories() {
    return new Promise (async (resolve)=>{
        const response = await axios.get(SERVER_URL+'category');
        resolve(response);
    })
}