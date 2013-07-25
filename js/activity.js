define(function (require) {
    var activity = require("sugar-web/activity/activity");

    require("Markdown.Converter");
    require("Markdown.Sanitizer");
    require("Markdown.Editor");


    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();

        inputTextContent = document.getElementById("wmd-input-second");

        //to save and resume the contents from datastore.

        var datastoreObject = activity.getDatastoreObject();

        inputTextContent.onblur = function () {
            console.log(inputTextContent.value);
            var jsonData = JSON.stringify((inputTextContent.value).toString());
            datastoreObject.setDataAsText(jsonData);
            datastoreObject.save(function () {});
        };

        datastoreObject.loadAsText(function (error, metadata, data) {
            console.log(metadata);
            console.log(data);
            markdowntext = JSON.parse(data);

            console.log(markdowntext);

            inputTextContent.value = markdowntext;
        });

        /*
                var converter1 = Markdown.getSanitizingConverter();
                
                converter1.hooks.chain("preBlockGamut", function (text, rbg) {
                    return text.replace(/^ {0,3}""" *\n((?:.*?\n)+?) {0,3}""" *$/gm, function (whole, inner) {
                        return "<blockquote>" + rbg(inner) + "</blockquote>\n";
                    });
                });
                
                var editor1 = new Markdown.Editor(converter1);
                
                editor1.run();
                */
        var converter2 = new Markdown.Converter();

        /*
                converter2.hooks.chain("preConversion", function (text) {
                    return text.replace(/\b(a\w*)/gi, "*$1*");
                });
                
                converter2.hooks.chain("plainLinkText", function (url) {
                    return "This is a link to " + url.replace(/^https?:\/\//, "");
                });
                */

        var help = function () {
            alert("Do you need help?");
        }
        var options = {
            helpButton: {
                handler: help
            },
            strings: {
                quoteexample: "whatever you're quoting, put it right here"
            }
        };
        
        var editor2 = new Markdown.Editor(converter2, "-second", options);

        editor2.run();

    });

});