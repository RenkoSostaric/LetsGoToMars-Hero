$(document).ready(function() {
    document.querySelector("#btn-up").addEventListener("click", function() {
        if(document.querySelector(".questions-page.center") != null) {
            $primaryPage = document.querySelector(".questions-page.center");
            if($primaryPage.getAttribute("id").slice(-1) == 1)
                $secondaryPage = document.querySelector("#page-0");
            else
                $secondaryPage = document.querySelector("#question-page-" + ($primaryPage.getAttribute("id").slice(-1) - 1));
        } 
        else if(document.querySelector(".page.center") != null) {
            $primaryPage = document.querySelector(".page.center");
            $secondaryPage = document.querySelector("#page-" + ($primaryPage.getAttribute("id").slice(-1) - 1));
        }
        console.log($primaryPage);
        console.log($secondaryPage);
        if($secondaryPage != null) {
            $($secondaryPage).removeClass("up");
            $($secondaryPage).addClass("center");
            $($primaryPage).removeClass("center");
            $($primaryPage).addClass("down");
        }
    });
    document.querySelector("#kartice").addEventListener("click", function() {
        getCountries();
        var $primaryPage = document.querySelector("#page-0");
        var $secondaryPage = document.querySelector("#page-1");
        if($($primaryPage).hasClass("down")) {
            $($primaryPage).removeClass("down");
        }
        $($primaryPage).removeClass("center");
        $($primaryPage).addClass("up");
        $($secondaryPage).removeClass("down");
        $($secondaryPage).addClass("center"); 
    });
    document.querySelector("#questions").addEventListener("click", function() {
        getCategoriesQuestions();
        var $primaryPage = document.querySelector("#page-0");
        var $secondaryPage = document.querySelector("#question-page-1");
        if($($primaryPage).hasClass("down")) {
            $($primaryPage).removeClass("down");
        }
        $($primaryPage).removeClass("center");
        $($primaryPage).addClass("up");
        $($secondaryPage).removeClass("down");
        $($secondaryPage).addClass("center"); 
    });
    document.querySelector("#btn-submit").addEventListener("click", function() {
        saveEditForm();
    });
    document.querySelector("#btn-cancel").addEventListener("click", function() {
        cancelEditForm();
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
                getCategories(this.getAttribute("id"));
                var $primaryPage = document.querySelector("#page-1");
                var $secondaryPage = document.querySelector("#page-2");
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
                getPeople(this.getAttribute("id"));
                var $primaryPage = document.querySelector("#page-2");
                var $secondaryPage = document.querySelector("#page-3");
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
                getPersonInfo(this.getAttribute("id"));
                var $primaryPage = document.querySelector("#page-3");
                var $secondaryPage = document.querySelector("#page-4");
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
            document.querySelector(".edit-button").addEventListener("click", function() {
                showEditForm();
            });
        }
    });
}

function getCategoriesQuestions() {
    $.ajax({
        type: "GET",
        url: "scripts/script.php",
        data: { function: "getCategoriesQuestions" },
        success: function(data) {
            var page1 = document.querySelector('#question-page-1');
            page1.innerHTML = data;
            $(".category-item").click(function(e) {
                getQuestions(this.getAttribute("id"));
                var $primaryPage = document.querySelector("#question-page-1");
                var $secondaryPage = document.querySelector("#question-page-2");
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

function getQuestions(id) {
    $.ajax({
        type: "GET",
        url: "scripts/script.php",
        data: { function: "getQuestions", ID_category: id },
        success: function(data) {
            var page2 = document.querySelector('#question-page-2');
            page2.innerHTML = data;
        }
    });
}

function showEditForm() {
    var $primaryPage = document.querySelector("#page-4");
    $($primaryPage).removeClass("center");
    $($primaryPage).addClass("up");
    document.querySelector(".edit-form").classList.remove("hidden");
    $.ajax({
        type: "GET",
        url: "scripts/script.php",
        data: { function: "getFullPersonInfo", ID_people: document.querySelector(".edit-button").getAttribute("id") },
        dataType: "json",
        success: function(data) {
            console.log(data);
            document.querySelector("#edit-form #name").value = data.name;
            document.querySelector("#edit-form #img_src").value = data.img_src;
            document.querySelector("#edit-form #info").value = data.text;
        }
    });
};

function saveEditForm() {
    $.ajax({
        type: "GET",
        url: "scripts/script.php",
        data: { function: "saveEditForm", ID_people: document.querySelector(".edit-button").getAttribute("id"), name: document.querySelector("#edit-form #name").value, img_src: document.querySelector("#edit-form #img_src").value, info: document.querySelector("#edit-form #info").value },
        success: function(data) {
            console.log(data);
            cancelEditForm();
        }
    });
}

function cancelEditForm() {
    var $primaryPage = document.querySelector("#page-4");
    $($primaryPage).removeClass("up");
    $($primaryPage).addClass("center");
    document.querySelector("#edit-page").classList.add("hidden");
    document.querySelector("#edit-form #name").value = "";
    document.querySelector("#edit-form #img_src").value = "";
    document.querySelector("#edit-form #info").value = "";
    getPersonInfo(document.querySelector(".edit-button").getAttribute("id"));
}