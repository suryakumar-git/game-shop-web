import 'whatwg-fetch';

/* function HttpService() {
    getProducts = () => {
        fetch('http://localhost:3004/product')
        .then(res => {
            console.log(res.json());
        })
    }
} */
class HttpService {
    getProducts = () => {
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:3004/product')
            .then(res => {
                resolve(res.json());
            });
        });
        return promise;
    }
}


export default HttpService;