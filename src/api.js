var axios = require('axios');

module.exports = {
    fetchUsers: function (){
        var URI = 'https://jsonplaceholder.typicode.com/users';

        return axios.get(URI)
        .then(function(response){
            return response.data.items;
        })
    }
}
