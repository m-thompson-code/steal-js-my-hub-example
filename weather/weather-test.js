import QUnit from "steal-qunit";
import weather from "./weather";
import clone from "steal-clone";
import $ from "jquery";

QUnit.module("myhub/weather/");

QUnit.test("basics", function(assert){
    var done = assert.async();
    var fixtureEl = document.getElementById("qunit-fixture");

    weather(fixtureEl);

    assert.equal(
        fixtureEl.innerHTML,
        "Loading...", "starts with loading");

    var interval = setInterval(function(){
        var ul = fixtureEl.getElementsByTagName("ul");
        if(ul.length === 1) {
            assert.ok(true, "inserted a ul");
            clearInterval(interval);
            done();
        }
    },100);
});

QUnit.test("basics with dependency injection", function(assert){
    var done = assert.async();

    var jQuery = function(selector){
        return $(selector)
    };
    jQuery.ajax = function(options){
        var dfd = new $.Deferred();
        setTimeout(function(){
            dfd.resolve({
                "daily": {
                    "time": [
                        "2022-10-17"
                    ],
                    "temperature_2m_max": [76.4],
                    "temperature_2m_min": [55.8]
                }
            }).then(function(){
              var html = $("#qunit-fixture").html();

              assert.ok(/2022-10-17/.test(html),
                "updated with request");
              done();
            });
        },1);
        return dfd;
    };

    clone({
        "jquery": {"default": jQuery}
    }).import("myhub/weather/weather").then(function(module){
        var weather = module["default"];

        var fixtureEl = document.getElementById("qunit-fixture");
        weather(fixtureEl);
    });
});