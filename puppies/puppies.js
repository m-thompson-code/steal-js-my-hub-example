import StacheElement from "can-stache-element";
import stache from "can-stache";

import "justifiedGallery";

class MyPuppies extends StacheElement {
    static view = `
    {{# if(this.puppies.isPending) }}
        Loading...
    {{/ if }}
    {{# if(this.puppies.isRejected) }}
        Rejected {{ this.puppies.reason }}
    {{/ if }}
    {{# if(this.puppies.isResolved) }}
        {{ this.puppies.value }}
    {{/ if }}
    `;

    get puppies() {
        const doc = document.createElement('div');

        return $.ajax({
            url: 'https://api.flickr.com/services/feeds/photos_public.gne',
            dataType: 'jsonp',
            jsonpCallback: "jsonFlickrFeed",
            data: {
                "tags": "puppy",
                "format": "json"
            },
            success: function(response) {
                var html = response.items.map(function(item, index) {
                    return '<a href="' + item.link + '">' +
                        '<img alt="' + item.title + '" src="' + item.media.m + '"/>' +
                        '</a>';
                }).join("");
                var root = $("<div>").html(html);
    
                $(doc).html(root);
                root.justifiedGallery();
            }
        }).then(() => {
            return doc;
        });
    }
}

customElements.define("my-puppies", MyPuppies);

export default function () {
  return document.createElement("my-puppies");
}

// module.exports = function(selector) {
//     $(selector).html("Loading...");

//     $.ajax({
//         url: 'https://api.flickr.com/services/feeds/photos_public.gne',
//         dataType: 'jsonp',
//         jsonpCallback: "jsonFlickrFeed",
//         data: {
//             "tags": "puppy",
//             "format": "json"
//         },
//         success: function(response) {
//             var html = response.items.map(function(item, index) {
//                 return '<a href="' + item.link + '">' +
//                     '<img alt="' + item.title + '" src="' + item.media.m + '"/>' +
//                     '</a>';
//             }).join("");
//             var root = $("<div>").html(html);

//             $(selector).html(root);
//             root.justifiedGallery();
//         }
//     });
// };
