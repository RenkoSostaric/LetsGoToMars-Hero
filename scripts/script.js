$(document).ready(function() {
    document.querySelector("#btn-up").addEventListener("click", function() {
        var $primaryPage = document.querySelector(".page.center");
        var $secondaryPage = document.querySelector("#page-" + ($primaryPage.getAttribute("id").slice(-1)-1));
        if($secondaryPage.getAttribute("id").slice(-1) != -1) {
            $($secondaryPage).removeClass("up");
            $($secondaryPage).addClass("center");
            $($primaryPage).removeClass("center");
            $($primaryPage).addClass("down");
        }
    });
    document.querySelector("#kartice").addEventListener("click", function() {
        getCountries();
        var $primaryPage = document.querySelector(".home-page");
        var $secondaryPage = document.querySelector(".country-page");
        if($($primaryPage).hasClass("down")) {
            $($primaryPage).removeClass("down");
        }
        $($primaryPage).removeClass("center");
        $($primaryPage).addClass("up");
        $($secondaryPage).removeClass("down");
        $($secondaryPage).addClass("center"); 
    });
});

function getCountries() {
    $.ajax({
        url: "scripts/script.php",
        data: { function: "getCountries" },
        success: function(data) {
            var page1 = document.querySelector('#page-1');
            page1.innerHTML = data;
            $(".country-item").click(function(e) {
                getCategories(this.getAttribute("id").slice(-1));
                var $primaryPage = document.querySelector(".country-page");
                var $secondaryPage = document.querySelector(".category-page");
                if($($primaryPage).hasClass("down")) {
                    $($primaryPage).removeClass("down");
                }
                $($primaryPage).removeClass("center");
                $($primaryPage).addClass("up");
                $($secondaryPage).removeClass("down");
                $($secondaryPage).addClass("center"); 
            });
        }
    });
}

function getCategories(id) {
    $.ajax({
        type: "GET",
        url: "scripts/script.php",
        data: { function: "getCategories", ID_country: id },
        success: function(data) {
            var page2 = document.querySelector('#page-2');
            page2.innerHTML = data;
            $(".category-item").click(function(e) {
                getPeople(this.getAttribute("id").slice(-1));
                var $primaryPage = document.querySelector(".category-page");
                var $secondaryPage = document.querySelector(".people-page");
                if($($primaryPage).hasClass("down")) {
                    $($primaryPage).removeClass("down");
                }
                $($primaryPage).removeClass("center");
                $($primaryPage).addClass("up");
                $($secondaryPage).removeClass("down");
                $($secondaryPage).addClass("center"); 
            });
        }
    });
}

function getPeople(id) {
    $.ajax({
        type: "GET",
        url: "scripts/script.php",
        data: { function: "getPeople", ID_category: id },
        success: function(data) {
            var page3 = document.querySelector('#page-3');
            page3.innerHTML = data;
            $(".person-item").click(function(e) {
                getPersonInfo(this.getAttribute("id").slice(-1));
                var $primaryPage = document.querySelector(".people-page");
                var $secondaryPage = document.querySelector(".info-page");
                if($($primaryPage).hasClass("down")) {
                    $($primaryPage).removeClass("down");
                }
                $($primaryPage).removeClass("center");
                $($primaryPage).addClass("up");
                $($secondaryPage).removeClass("down");
                $($secondaryPage).addClass("center"); 
            });
        }
    });
}

function getPersonInfo(id) {
    $.ajax({
        type: "GET",
        url: "scripts/script.php",
        data: { function: "getPersonInfo", ID_people: id },
        success: function(data) {
            var page4 = document.querySelector('#page-4');
            page4.innerHTML = data;
        }
    });
}