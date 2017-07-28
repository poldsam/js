var categories_template, animals_template, animal_template, current_category;

// always need to add document.ready
$(document).ready(function() {
    // get all templates and compile them, categories-template is a script id
    // and .html() is used to get the contents of any element
    var source = $("#categories-template").html();
    categories_template = Handlebars.compile(source);

    source = $("#animals-template").html();
    animals_template = Handlebars.compile(source);

    current_category = 0;
// finds element with id categories:
    $("#categories").click(function() {
        $(".active").removeClass("active");
        $("#categories").addClass("active");
        var html = categories_template(animals_data);
        $("#content").html(html);
    });

    // call the click function without the actual click:
    $("#categories").click();


    $("#animals").click(function() {
        $(".active").removeClass("active");
        $("#animals").addClass("active");
        var html = animals_template(animals_data.category[current_category]);
        $("#content").html(html);
    });


    $("body").on("click", ".category", function() {
        $(".active").removeClass("active");
        $("#animals").addClass("active");
        current_category = $(this).data("index");
        var html = animals_template(animals_data.category[current_category]);
        $("#content").html(html);
    });
});
