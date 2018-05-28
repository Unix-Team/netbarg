$(document).ready(function(){
    var options = {
        url: function(phrase) {
            return "/deals/search";
        },
        getValue: function(element) {
            return element.short_name;
        },
        list: {
            onShowListEvent: function() {
                $('.site-search').addClass('open')
            },
            onHideListEvent: function() {
                $('.site-search').removeClass('open')
            }
        },
        ajaxSettings: {
            dataType: "json",
            method: "POST",
            data: {
                dataType: "json" 
            }
        },
        preparePostData: function(data) {
            data.phrase = $("#search-box").val();
            data.city_id = $("button.selected-city").attr('city-id')
            return data;
        },
        requestDelay: 800,
        template: {
            type: "custom",
            method: function (value, item) {
                return "<a href='"+item.url+"'><i style='background-image:url(" + item.image_url + ");' /></i>" + "<span>"+item.short_name+ "</span></a>"  ;
            }
        },
        minCharNumber: 3
    };
    $("#search-box").easyAutocomplete(options);

    $("form#search-form").submit(function (event){
        var query = $("#search-box").val();
        if(query.length<3){
            event.stopPropagation();
            event.preventDefault();
        }
    });
});
