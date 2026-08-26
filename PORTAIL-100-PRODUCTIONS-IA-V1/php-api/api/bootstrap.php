<?php

declare(strict_types=1);

function sendSecurityHeaders(): void
{
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: no-referrer');
    header('Permissions-Policy: camera=(), microphone=(), geolocation=()');
    header("Content-Security-Policy: default-src 'none'; frame-ancestors 'none'");
    header('Cache-Control: public, max-age=300, stale-while-revalidate=600');
}

function rejectUnsupportedMethod(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
        http_response_code(405);
        header('Allow: GET');
        echo json_encode(['error' => 'Méthode non autorisée'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
}

function readJsonFile(string $relativePath): array
{
    $baseDirectory = realpath(__DIR__ . '/../data');
    $target = realpath(__DIR__ . '/../data/' . $relativePath);

    if ($baseDirectory === false || $target === false || !str_starts_with($target, $baseDirectory . DIRECTORY_SEPARATOR)) {
        http_response_code(500);
        echo json_encode(['error' => 'Source de données inaccessible'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    $contents = file_get_contents($target);
    if ($contents === false || strlen($contents) > 2_000_000) {
        http_response_code(500);
        echo json_encode(['error' => 'Lecture des données impossible'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    try {
        return json_decode($contents, true, 64, JSON_THROW_ON_ERROR);
    } catch (JsonException) {
        http_response_code(500);
        echo json_encode(['error' => 'Données JSON invalides'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
}

sendSecurityHeaders();
rejectUnsupportedMethod();

