<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

$catalogue = readJsonFile('projects.json');
echo json_encode($catalogue, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);

