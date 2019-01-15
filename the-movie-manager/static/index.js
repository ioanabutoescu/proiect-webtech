    
   document.addEventListener("DOMContentLoaded", function(){
       
          $('#logInBtn').click(
        function connectUser(event) {
            event.preventDefault();
            let username=$('#username').val()
            let password=$('#password').val()
            if(username && password){
                axios.post('/login', {
                            username: username,
                            password: password
                            
                        }).then(function(result) {
                            $("#login").hide();
                            $("#welcome").show();
                            console.log(result.data.user_name);
                            $("#welcome-header").text("Welcome " + result.data.user_name);
            }).catch(function(err) {
                            alert(err);
                            
       
                        })
    }
    });
    
  
   })
     
    document.getElementById('mostWantedBtn').addEventListener('click', getTrending);
    
    //afisat doar in consola momentan 
    function getTrending(){
        var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/trending/all/day?api_key=91db441d300d66601202c1feccd5edee",
  "method": "GET",
  "headers": {},
  "data": "{}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
    }



function goBack(){
    window.history.back();
}