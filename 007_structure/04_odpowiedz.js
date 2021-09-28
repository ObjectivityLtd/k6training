import http from 'k6/http';
import { check } from 'k6';
//uruchom test: k6 run -u 2 -i 6 .\04_odpowiedz.js
const URL = 'https://appxx.azurewebsites.net/'
var counter = 0; //każdy VU dostanie kopię
export function setup() {
    let res = http.get(URL);
    return { //data
        body: res.body, //body is a property
        new: []
    }
}
export default function (data) {
    let body = JSON.stringify({
        body: data['body'] || 'nic tam nie ma',
        title: "new title from Gab's"
    })
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    let res = http.post(`${URL}/post/add/newpost`, body, params);
    check(res, {
        'response code was 201': (res) => res.status == 201,
    });
    
    counter += __VU; //modyfikacja zmiennej z init, kazdy VU dostaje kopie lokalna
    console.log(`counter od ${__VU}:` + counter) //pracujemy na kopii w zakresie 1 VU
    //modyfikacja obiektu z setup
    data['new'] = counter; //podobnie zmiany beda zachowane tylko w ramach iteracji tego samego VU
    console.log("data od " + __VU + " " + JSON.stringify(data));

}

export function teardown(data) {
    console.log('Teardown data:' + JSON.stringify(data)); //data is unmodified
    console.log('Teardown counter:' + counter) //nadal wskazuje na 0
}
