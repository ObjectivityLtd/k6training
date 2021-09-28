import http from 'k6/http';
import {check, group} from 'k6';

export default function () {
    // Add tag to request metric data
    let res = http.get('http://httpbin.org/',  {
        tags: {
            type: "html",
        },
    });
    // Add tag to check
    check(
        res,
        {'status is 200': (r) => r.status === 200},
        {
            category: "status check",
            name: 'status is HTTP OK'
        },
    );
    group('gro1', function() {
        group('gro2', function() {
            console.log("grupa")
        });
    });

}
