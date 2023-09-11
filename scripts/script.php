<?php
$servername = "127.0.0.1";
$username = "username";
$password = "password";
$dbname = "peopleDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function getCountries() {
    global $conn;
    $sql = "SELECT ID_countries, name, img_src FROM countries";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo '<div class="item country-item" id="item-' . $row["ID_countries"] . '">';
            echo '<img src="' . $row["img_src"] . '" alt="">'; 
            echo '<p>' . $row["name"] . '</p>';
            echo '</div>'; 
        } 
    } else {
        echo "0 results" ;
    }
}

function getCategories() {
    if (isset($_GET['ID_country'])) {
        global $conn;
        $sql = "SELECT FK_countries, ID_category, name, img_src FROM category WHERE FK_countries = " . $_GET["ID_country"];
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) { 
                echo '<div class="item category-item" id="item-' . $row["ID_category"] . '">';
                echo '<img src="' . $row["img_src"] . '" alt="">'; 
                echo '<p>' . $row["name"] . '</p>';
                echo '</div>'; 
            } 
        } else {
            echo "0 results" ;
        }
    } else {
        echo "Key 'ID_country' does not exist in the query parameters.";
    }
}

function getPeople() {
    global $conn;
    $sql = "SELECT ID_people, name, img_src FROM people WHERE FK_category = " . $_GET["ID_category"];
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo '<div class="item person-item" id="item-' . $row["ID_people"] . '">';
            echo '<img src="' . $row["img_src"] . '" alt="">'; 
            echo '<p>' . $row["name"] . '</p>';
            echo '</div>'; 
        } 
    } else {
        echo "0 results" ;
    }
}

function getPersonInfo() {
    global $conn;
    $sql = "SELECT ID_people, name, img_src, text FROM people WHERE ID_people = " . $_GET["ID_people"];
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo '<div class="info-frame">';
            echo '<h1>' . $row["name"] . '</h1>';
            echo '<p>' . $row["text"] . '</p>';
            echo '</div>';
        }
    } else {
        echo "0 results" ;
    }
}

if (isset($_GET["function"])) {
    if($_GET["function"] == "getCountries") {
        getCountries();
    } else if($_GET["function"] == "getCategories") {
        getCategories();
    } else if ($_GET["function"] == "getPeople") {
        getPeople();
    } else if ($_GET["function"] == "getPersonInfo") {
        getPersonInfo();
    } else {
        echo "Function '" . $_GET["function"] . "' does not exist.";
    }
} else {
    echo "No function specified.";
}

$conn->close();

?>