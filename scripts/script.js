$(document).ready(function() {
    $(".item").click(function() {
        var $primaryPage = $(this).parent();
        var $secondaryPage = $primaryPage.next();
        if($($primaryPage).hasClass("down")) {
            $($primaryPage).removeClass("down");
        }
        $($primaryPage).removeClass("center");
        $($primaryPage).addClass("up");
        $($secondaryPage).removeClass("down");
        $($secondaryPage).addClass("center"); 
    });
});