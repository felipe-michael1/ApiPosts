<?php
header("Content-Type: application/json; charset=utf-8");
$url = $_GET['route'] ?? '';

function fetchJson($url) {
    $response = file_get_contents($url);
    return $response;
}
if ($url === 'posts_user') {
    $id = trim($_GET['codigo_usuario']) ?? '';
    $id = str_replace("'",'',$id);
    $json =  fetchJson("https://jsonplaceholder.typicode.com/posts?userId=" . $id);
    echo $json;
    exit;

} else {
    $postId = $_GET['postId'] ?? '';
    echo fetchJson("https://jsonplaceholder.typicode.com/comments?postId=" . $postId);
}

?>