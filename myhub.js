// http://127.0.0.1:8080/myhub.html
import $ from "jquery";
import "./myhub.less";
import "bootstrap/dist/css/bootstrap.css";
// import weather from "./weather/weather";
// import puppies from "./puppies/puppies";

$("body").append(`
    <div class="container">
        <h1>Goodbye script tags!</h1>
        <a href="#weather">Weather</a> <a href="#puppies">Puppies</a> <a href="#">Home</a>
        <div id="main"/>
    </div>
`);

// var modules = {
//     weather: weather,
//     puppies: puppies,
//     "": function(selector){
//         $(selector).html("Welcome home");
//     }
// };

var updatePage = function(){
    // var hash = window.location.hash.substr(1);
    // modules[hash]("#main");
    var hash = window.location.hash.substr(1);
    if(!hash) {
        $("#main").html("Welcome home");
    } else {
        steal.import(`myhub/${hash}/${hash}`).then(function(moduleOrPlugin){
            var plugin = typeof moduleOrPlugin === "function" ?
                moduleOrPlugin : moduleOrPlugin["default"];
            plugin("#main");
        });
    }
};

$(window).on("hashchange", updatePage);

updatePage();
