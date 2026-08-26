<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

echo json_encode([
    'status' => 'ok',
    'service' => 'portail-cent-productions-ia',
    'mode' => 'read-only',
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);

