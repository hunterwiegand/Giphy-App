
var gif = {

    //Stores all gif titles
    gifArr: ["Pikachu", "Charizard", "Bulbasaur", "Squirtle", "Muk", "Blastoise", "Lugia", "Articuno", "Zapdos", "Magmar", "Mew", "Ditto", "Turtwig", "Bidoof", "Celebi", "Zigzagoon", "Snorlax", "Munchlax"],

    gifyKey: "NOOCEXPwOWF8hdOIogVhsq2blyqDADmv",
    targetGif: "",
    

    displayButtons: function () {

        $("#button-div").empty();

        for (var i = 0; i < gif.gifArr.length; i++) {

            var btn = $("<button>");

            btn.addClass("actor m-2");
            btn.attr("data-name", gif.gifArr[i]);
            btn.text((gif.gifArr[i]).replace("+", " "));

            $("#button-div").append(btn);

            $("#gif-input").empty();
        }
    },

    getUserInput: function () {

        $("#add-gif").on("click", function (event) {

            event.preventDefault();

            var newGif = $("#gif-input").val().replace(" ", "+");
            gif.gifArr.push(newGif);

            $("#gif-input").empty();
            gif.displayButtons();
        })
    },

    callGify: function () {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif.targetGif + "&api_key=" + gif.gifyKey + "&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            
            var data = response.data;

            for (var i = 0; i < data.length; i++) {
                //Still gif
                var imgSrcStill = data[i].images.fixed_height_still.url;
                //Original gif
                var imgSrcAnimate = data[i].images.fixed_height.url;
                //Gif rating
                var imgRating = data[i].rating;
                var image = $("<img>");
                var p = $("<p>");

                p.append(imgRating);
                image.attr("src", imgSrcStill);
                image.attr("id", "img"+[i]);
                image.attr("data-still", imgSrcStill);
                image.attr("data-animate", imgSrcAnimate);
                image.attr("data-state", "still");
                image.addClass("gif m-1");

                
                console.log(data[i].rating);

                $("#img-div").append(image);
                $("#img-div").append(p);

            }
        })
    },

    applyButtonClick: function () {

        $(document).on("click", ".actor", function () {
            gif.targetGif = $(this).attr("data-name")


            $("#img-div").empty();

            gif.callGify();
        })
    },

    animateClick: function () {
        $(document).on("click", ".gif", function () {
            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }   
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })
    }
}

gif.displayButtons();
gif.getUserInput();
gif.applyButtonClick();
gif.animateClick();

