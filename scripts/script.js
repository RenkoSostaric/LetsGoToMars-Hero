var $category_id = 0;
var $card_id = 0;

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
    $("#btn-submit").click(function(e) {
        saveEditForm();
        $(".floating-button").removeClass("hidden");
    });
    $("#btn-cancel").click(function(e) {
        cancelEditForm();
        $(".floating-button").removeClass("hidden");
    });
    $("#btn-delete").click(function(e) {
        deletePerson();
        $(".floating-button").removeClass("hidden");
    });
    $("#btn-add").click(function(e) {
        addPerson();
        $(".floating-button").removeClass("hidden");
    });
    $("#btn-question-submit").click(function(e) {
        saveEditQuestionForm();
        $(".floating-button").removeClass("hidden");
    });
    $("#btn-question-cancel").click(function(e) {
        cancelEditQuestionForm();
        $(".floating-button").removeClass("hidden");
    });
    $("#btn-question-delete").click(function(e) {
        deleteQuestion();
        $(".floating-button").removeClass("hidden");
    });
    $("#btn-question-add").click(function(e) {
        addQuestion();
        $(".floating-button").removeClass("hidden");
    });
    console.log("ready");
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
                globalThis.$category_id = this.getAttribute("id");
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
                $("#btn-submit").removeClass("no-display");
                $("#btn-add").addClass("no-display");
            });
            $("#add-person").click(function(e) {
                $("#btn-submit").addClass("no-display");
                $("#btn-add").removeClass("no-display");
                showAddForm();
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
                globalThis.$category_id = this.getAttribute("id");
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
            $(".edit-question-button").click(function(e) {
                globalThis.$card_id = this.getAttribute("id");
                showEditQuestionForm(this.getAttribute("id"));
                $("#btn-question-submit").removeClass("no-display");
                $("#btn-question-add").addClass("no-display");
            });
            $("#add-question").click(function(e) {
                $("#btn-question-submit").addClass("no-display");
                $("#btn-question-add").removeClass("no-display");
                showAddQuestionForm();
            });
        }
    });
}

function showEditForm() {
    console.log("add person");
    var $primaryPage = document.querySelector("#page-4");
    $($primaryPage).removeClass("center");
    $($primaryPage).addClass("up");
    document.querySelector("#edit-page").classList.remove("hidden");
    $(".floating-button").addClass("hidden");
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

function showAddForm() {
    var $primaryPage = document.querySelector("#page-3");
    $($primaryPage).removeClass("center");
    $($primaryPage).addClass("up");
    document.querySelector("#edit-page").classList.remove("hidden");
    document.querySelector("#edit-form #name").value = "";
    document.querySelector("#edit-form #img_src").value = "";
    document.querySelector("#edit-form #info").value = "";
    $(".floating-button").addClass("hidden");
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
    getPeople(globalThis.$category_id);
    getPersonInfo(document.querySelector(".edit-button").getAttribute("id"));
    setTimeout(function() {
    document.querySelector("#edit-form #name").value = "";
    document.querySelector("#edit-form #img_src").value = "";
    document.querySelector("#edit-form #info").value = "";
    }, 500);
}

function showEditQuestionForm(id) {
    var $primaryPage = document.querySelector("#question-page-2");
    $($primaryPage).removeClass("center");
    $($primaryPage).addClass("up");
    document.querySelector("#question-edit-page").classList.remove("hidden");
    $.ajax({
        type: "GET",
        url: "scripts/script.php",
        data: { function: "getFullQuestionInfo", ID_card: id },
        dataType: "json",
        success: function(data) {
            console.log(data);
            document.querySelector("#question-edit-form #question").value = data.question;
            document.querySelector("#question-edit-form #answer-1").value = data.answer_1;
            document.querySelector("#question-edit-form #answer-2").value = data.answer_2;
            document.querySelector("#question-edit-form #answer-3").value = data.answer_3;
            document.querySelector("#question-edit-form #radio-" + data.correct_answer).checked = true;
        }
    });
    $(".floating-button").addClass("hidden");
};

function saveEditQuestionForm() {
    $.ajax({
        type: "GET",
        url: "scripts/script.php",
        data: {function: "saveEditQuestionForm", ID_card: globalThis.$card_id, question: document.querySelector("#question-edit-form #question").value, answer_1: document.querySelector("#question-edit-form #answer-1").value, answer_2: document.querySelector("#question-edit-form #answer-2").value, answer_3: document.querySelector("#question-edit-form #answer-3").value, correct_answer: document.querySelector("#question-edit-form input[name='correct-answer']:checked").getAttribute("id").slice(-1) },
        success: function(data) {
            console.log(data);
            cancelEditQuestionForm();
        }
    });
}
function cancelEditQuestionForm() {
    var $primaryPage = document.querySelector("#question-page-2");
    $($primaryPage).removeClass("up");
    $($primaryPage).addClass("center");
    document.querySelector("#question-edit-page").classList.add("hidden");
    getQuestions(globalThis.$category_id)
    setTimeout(function() {
        document.querySelector("#question-edit-form #question").value = "";
        document.querySelector("#question-edit-form #answer-1").value = "";
        document.querySelector("#question-edit-form #answer-2").value = "";
        document.querySelector("#question-edit-form #answer-3").value = "";
        document.querySelector("#question-edit-form #radio-1").checked = true;;
    }, 500);
}

function addPerson() {
    $.ajax({
        type: "GET",
        url: "scripts/script.php",
        data: { function: "addPerson", ID_category: globalThis.$category_id, name: document.querySelector("#edit-form #name").value, img_src: document.querySelector("#edit-form #img_src").value, info: document.querySelector("#edit-form #info").value  },
        success: function(data) {
            console.log(data);
            var $primaryPage = document.querySelector("#page-3");
            $($primaryPage).removeClass("up");
            $($primaryPage).addClass("center");
            getPeople(globalThis.$category_id);
            document.querySelector("#edit-page").classList.add("hidden");
            setTimeout(function() {
                document.querySelector("#edit-form #name").value = "";
                document.querySelector("#edit-form #img_src").value = "";
                document.querySelector("#edit-form #info").value = "";
            }, 500);
        }
    });
}

function deletePerson() {
    $.ajax({
        type: "GET",
        url: "scripts/script.php",
        data: { function: "deletePerson", ID_people: document.querySelector(".edit-button").getAttribute("id") },
        success: function(data) {
            console.log(data);
            var $primaryPage = document.querySelector("#page-3");
            var $secondaryPage = document.querySelector("#page-4");
            $($primaryPage).removeClass("up");
            $($primaryPage).addClass("center");
            $($secondaryPage).removeClass("up");
            $($secondaryPage).addClass("down");
            getPeople(globalThis.$category_id);
            document.querySelector("#edit-page").classList.add("hidden");
            setTimeout(function() {
                document.querySelector("#edit-form #name").value = "";
                document.querySelector("#edit-form #img_src").value = "";
                document.querySelector("#edit-form #info").value = "";
            }, 500);
        }
    });
}

function addQuestion() {
    $.ajax({
        type: "GET",
        url: "scripts/script.php",
        data: { function: "addQuestion", ID_category: globalThis.$category_id, question: document.querySelector("#question-edit-form #question").value, answer_1: document.querySelector("#question-edit-form #answer-1").value, answer_2: document.querySelector("#question-edit-form #answer-2").value, answer_3: document.querySelector("#question-edit-form #answer-3").value, correct_answer: document.querySelector("#question-edit-form input[name='correct-answer']:checked").getAttribute("id").slice(-1) },
        success: function(data) {
            console.log(data);
            var $primaryPage = document.querySelector("#question-page-2");
            $($primaryPage).removeClass("up");
            $($primaryPage).addClass("center");
            getQuestions(globalThis.$category_id);
            document.querySelector("#question-edit-page").classList.add("hidden");
            setTimeout(function() {
                document.querySelector("#question-edit-form #question").value = "";
                document.querySelector("#question-edit-form #answer-1").value = "";
                document.querySelector("#question-edit-form #answer-2").value = "";
                document.querySelector("#question-edit-form #answer-3").value = "";
                document.querySelector("#question-edit-form #radio-1").checked = true;
            }, 500);
        }
    });
        
}

function showAddQuestionForm() {
    var $primaryPage = document.querySelector("#question-page-2");
    $($primaryPage).removeClass("center");
    $($primaryPage).addClass("up");
    document.querySelector("#question-edit-page").classList.remove("hidden");
    document.querySelector("#question-edit-form #question").value = "";
    document.querySelector("#question-edit-form #answer-1").value = "";
    document.querySelector("#question-edit-form #answer-2").value = "";
    document.querySelector("#question-edit-form #answer-3").value = "";
    document.querySelector("#question-edit-form #radio-1").checked = true;
    $(".floating-button").addClass("hidden");
}

function deleteQuestion() {
    $.ajax({
        type: "GET",
        url: "scripts/script.php",
        data: { function: "deleteQuestion", ID_card: globalThis.$card_id },
        success: function(data) {
            console.log(data);
            var $primaryPage = document.querySelector("#question-page-2");
            $($primaryPage).removeClass("up");
            $($primaryPage).addClass("center");
            getQuestions(globalThis.$category_id);
            document.querySelector("#question-edit-page").classList.add("hidden");
            setTimeout(function() {
                document.querySelector("#question-edit-form #question").value = "";
                document.querySelector("#question-edit-form #answer-1").value = "";
                document.querySelector("#question-edit-form #answer-2").value = "";
                document.querySelector("#question-edit-form #answer-3").value = "";
                document.querySelector("#question-edit-form #radio-1").checked = true;
            }, 500);
        }
    });
}