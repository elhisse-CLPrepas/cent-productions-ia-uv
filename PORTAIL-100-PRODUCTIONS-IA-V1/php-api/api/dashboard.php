<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

$dashboard = readJsonFile('dashboard.json');
echo json_encode($dashboard, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);

