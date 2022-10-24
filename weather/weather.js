import $ from "jquery";
import "bootstrap/dist/css/bootstrap.css";
import "./weather.css";

function toClassName(txt) {
  return txt.toLowerCase().replace(/ /g, "-");
}

export default function(selector){
    // var city = "chicago il";
    $(selector).html("Loading...");
    $.ajax({
        // url: `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places%20where%20text%3D%22${city}%22)&format=json&diagnostics=true&callback=`,
        // source: https://open-meteo.com/en/docs#latitude=34.05&longitude=-118.24&daily=weathercode,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles&past_days=7
        url: `https://api.open-meteo.com/v1/forecast?latitude=34.05&longitude=-118.24&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles&past_days=7`,
    }).then(function(response){
      const dates = response.daily.time;
      var defs = dates.map(function(date, i){
        const high = response.daily.temperature_2m_max[i];
        const low = response.daily.temperature_2m_min[i];

        return `
          <li>
            <span class="date">${date}</span>
            <span class="description ${toClassName(date)}">${date}</span>
            <span class="high-temp">${high}<sup>&deg;</sup></span>
            <span class="low-temp">${low}<sup>&deg;</sup></span>
          </li>
        `;
      });
      $(selector).html(`
        <div class="forecast">
          <ul>
            ${defs.join("")}
          </ul>
        </div>
      `);
    });

}