<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname1 = "peopleDB";
$dbname2 = "questionDB";

$conn1 = new mysqli($servername, $username, $password, $dbname1);
$conn2 = new mysqli($servername, $username, $password, $dbname2);


if ($conn1->connect_error) {
    die("Connection failed: " . $conn1->connect_error);
}
if ($conn2->connect_error) {
    die("Connection failed: " . $conn2->connect_error);
}

function getCountries()
{
    global $conn1;
    $sql = "SELECT ID_countries, name, img_src FROM countries";
    $result = $conn1->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo '<div class="item country-item" id="' . $row["ID_countries"] . '">';
            echo '<img src="' . $row["img_src"] . '" alt="">';
            echo '<p>' . $row["name"] . '</p>';
            echo '</div>';
        }
    } else {
        echo "0 results";
    }
}

function getCategories()
{
    if (isset($_GET['ID_country'])) {
        global $conn1;
        $sql = "SELECT FK_countries, ID_category, name, img_src FROM category WHERE FK_countries = " . $_GET["ID_country"];
        $result = $conn1->query($sql);
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo '<div class="item category-item" id="' . $row["ID_category"] . '">';
                echo '<img src="' . $row["img_src"] . '" alt="">';
                echo '<p>' . $row["name"] . '</p>';
                echo '</div>';
            }
        } else {
            echo "0 results";
        }
    } else {
        echo "Key 'ID_country' does not exist in the query parameters.";
    }
}

function getPeople()
{
    global $conn1;
    $sql = "SELECT ID_people, name, img_src FROM people WHERE FK_category = " . $_GET["ID_category"];
    $result = $conn1->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo '<div class="item person-item" id="' . $row["ID_people"] . '">';
            echo '<img src="' . $row["img_src"] . '" alt="">';
            echo '<p>' . $row["name"] . '</p>';
            echo '</div>';
        }
        echo '<div class="item edit-plus" id="add-person">';
        echo '<img src="assets/add.png" alt="">';
        echo '</div>';
    } else {
        echo "0 results";
    }
}

function getPersonInfo()
{
    global $conn1;
    $sql = "SELECT ID_people, name, img_src, text FROM people WHERE ID_people = " . $_GET["ID_people"];
    $result = $conn1->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo '<div class="info-frame">';
            echo '<button class="edit-button" id="' . $row["ID_people"] . '"><i class="fas fa-edit" style="font-size: 1rem;"></i></button>';
            echo '<h1>' . $row["name"] . '</h1>';
            echo '<p>' . $row["text"] . '</p>';
            echo '</div>';
        }
    } else {
        echo "0 results";
    }
}

function getFullPersonInfo()
{
    global $conn1;
    $sql = "SELECT ID_people, name, img_src, text FROM people WHERE ID_people = " . $_GET["ID_people"];
    $result = $conn1->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo json_encode(
                array(
                    "ID_people" => $row["ID_people"],
                    "name" => $row["name"],
                    "img_src" => $row["img_src"],
                    "text" => $row["text"]
                )
            );
        }
    } else {
        echo "0 results";
    }
}

function saveEditForm() {
    global $conn1;
    $sql = "UPDATE people SET name = '" . $_GET["name"] . "', img_src = '" . $_GET["img_src"] . "', text = '" . mysqli_real_escape_string($conn1, $_GET["info"]) . "' WHERE ID_people = " . $_GET["ID_people"];
    if ($conn1->query($sql) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . $conn1->error;
    }
}

function getCategoriesQuestions()
{
    global $conn2;
    $sql = "SELECT ID_category, name, img_src FROM category";
    $result = $conn2->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo '<div class="item category-item" id="' . $row["ID_category"] . '">';
            echo '<img src="' . $row["img_src"] . '" alt="">';
            echo '<p>' . $row["name"] . '</p>';
            echo '</div>';
        }
    } else {
        echo "0 results";
    }
}

function getQuestions()
{
    global $conn2;
    $sql = "SELECT ID_card, question, answer_1, answer_2, answer_3, correct_answer, FK_category FROM question_card WHERE FK_category = " . $_GET["ID_category"];
    $result = $conn2->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo '<div class="question-item" id="question-' . $row["ID_card"] . '">';
            echo '<div class="question-box">';
            echo '<h1 class="question-header">' . $row["question"] . '</h1>';
            echo '</div>';
            echo '<div class="question-seperator"></div>';
            echo '<div class="answer-box">';
            echo '<ol>';
            echo '<li class="question-answer ' . ($row["correct_answer"] == 1 ? 'correct-answer' : '') . '" id="answer-1">' . $row["answer_1"] . '</li>';
            echo '<li class="question-answer ' . ($row["correct_answer"] == 2 ? 'correct-answer' : '') . '" id="answer-2">' . $row["answer_2"] . '</li>';
            echo '<li class="question-answer ' . ($row["correct_answer"] == 3 ? 'correct-answer' : '') . '" id="answer-3">' . $row["answer_3"] . '</li>';
            echo '</ol>';
            echo '</div>';
            echo '</div>';
        }
    } else {
        echo "0 results";
    }
}

if (isset($_GET["function"])) {
    if ($_GET["function"] == "getCountries") {
        getCountries();
    } else if ($_GET["function"] == "getCategories") {
        getCategories();
    } else if ($_GET["function"] == "getPeople") {
        getPeople();
    } else if ($_GET["function"] == "getPersonInfo") {
        getPersonInfo();
    } else if ($_GET["function"] == "getCategoriesQuestions") {
        getCategoriesQuestions();
    } else if ($_GET["function"] == "getQuestions") {
        getQuestions();
    } else if ($_GET["function"] == "getFullPersonInfo") {
        getFullPersonInfo();
    } else if ($_GET["function"] == "saveEditForm") {
        saveEditForm();
    } else {
        echo "Function '" . $_GET["function"] . "' does not exist.";
    }
} else {
    echo "No function specified.";
}



$conn1->close();
$conn2->close();

?>