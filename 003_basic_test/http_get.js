import http from 'k6/http';

export default function() {
    let res = http.get('https://appxx.azurewebsites.net/');
    console.log(JSON.stringify(res,null,2));    
};