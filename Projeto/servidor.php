<?php

$hostname = "localhost";
$db = "";
$user = "natalia";
$passwd = "Nati@23DB";

$mysqli = new $mysqli($hostname, $user, $passwd, $db);
if ($mysqli->connect_errno) {
    echo "Falha ao conectar: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

?>