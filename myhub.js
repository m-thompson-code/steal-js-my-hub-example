// http://127.0.0.1:8080/myhub.html
import $ from "jquery";// <-- how do I get rid of this import?
import "./myhub.less";
import "bootstrap/dist/css/bootstrap.css";
// import weather from "./weather/weather";
// import puppies from "./puppies/puppies";

import StacheElement from "can-stache-element";
import route from "can-route";
import "can-stache-route-helpers";

import RoutePushstate from "can-route-pushstate";
route.urlData = new RoutePushstate();

class MyHub extends StacheElement {
    static view = `
    <div class="container">
        <h1>Goodbye script tags!</h1>
        <a href="{{ routeUrl(page='weather') }}">Weather</a> <a href="{{ routeUrl(page='puppies') }}">Puppies</a> <a href="{{ routeUrl(page='home') }}">Home</a>
        <div id="main">
            {{# if(this.componentToShow.isPending) }}
                Loading...
            {{/ if }}
            {{# if(this.componentToShow.isRejected) }}
                Rejected {{ componentToShow.reason }}
            {{/ if }}
            {{# if(this.componentToShow.isResolved) }}
                {{ componentToShow.value }}
            {{/ if }}
        </div>
    </div>
    `;

    static props = {
        routeData: {
          get default() {
            // set default page to the first slug, ignore "dev" sentinel
            const page =
              window.location.pathname.split("/").filter((slug) => {
                return slug && slug !== "dev" && slug !== "dist"
              })[0] || "home";
              
            route.register("{page}", { page: "home" });
            route.register("weather", { page: "weather" });
            route.register("puppies", { page: "puppies" });
            route.start();
            route.data.page = page;
            return route.data;
          },
        },
    };

    get componentToShow() {
        const hash = this.routeData.page;
        console.log("componentToShow", hash);

        if (this.routeData.page === "home") {
            const home = document.createElement("h2");
            home.innerHTML = "Welcome home";
            return Promise.resolve(home);
        }

        return steal.import(`myhub/${hash}/${hash}`).then(function(moduleOrPlugin){
            var plugin = typeof moduleOrPlugin === "function" ?
                moduleOrPlugin : moduleOrPlugin["default"];

            const ele = document.createElement('div');
            return plugin();
            
            // const ele = document.createElement('div');
            // return plugin(ele) || ele;

            // return ele;
        });
    }
}

customElements.define("my-hub", MyHub);


// $("body").append(`
//     <div class="container">
//         <h1>Goodbye script tags!</h1>
//         <a href="#weather">Weather</a> <a href="#puppies">Puppies</a> <a href="#">Home</a>
//         <div id="main"/>
//     </div>
// `);

// var modules = {
//     weather: weather,
//     puppies: puppies,
//     "": function(selector){
//         $(selector).html("Welcome home");
//     }
// };

// var updatePage = function(){
//     // var hash = window.location.hash.substr(1);
//     // modules[hash]("#main");
//     var hash = window.location.hash.substr(1);
//     if(!hash) {
//         $("#main").html("Welcome home");
//     } else {
//         steal.import(`myhub/${hash}/${hash}`).then(function(moduleOrPlugin){
//             var plugin = typeof moduleOrPlugin === "function" ?
//                 moduleOrPlugin : moduleOrPlugin["default"];
//             plugin("#main");
//         });
//     }
// };

// $(window).on("hashchange", updatePage);

// updatePage();
