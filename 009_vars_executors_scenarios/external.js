import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'externally-controlled',
      //vus: 10,
      maxVUs: 50,
      duration: '10m',
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
