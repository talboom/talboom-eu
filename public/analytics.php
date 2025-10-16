<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Load environment variables
if (file_exists(__DIR__ . '/../.env')) {
    $env = parse_ini_file(__DIR__ . '/../.env');
    foreach ($env as $key => $value) {
        $_ENV[$key] = $value;
    }
}

// Database configuration from environment
$db_host = $_ENV['DB_HOST'] ?? 'localhost';
$db_name = $_ENV['DB_NAME'] ?? '';
$db_user = $_ENV['DB_USER'] ?? '';
$db_pass = $_ENV['DB_PASS'] ?? '';

try {
    // Only accept POST requests
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        exit;
    }

    // Connect to database
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get the event data from POST
    $input = json_decode(file_get_contents('php://input'), true);
    $event_type = $input['event'] ?? 'page_view';
    $page = $input['page'] ?? '';

    // Create counter name (e.g., "page:/index" or "link:github")
    $counter_name = $event_type;
    if (!empty($page)) {
        $counter_name .= ':' . $page;
    }

    // Get today's date
    $today = date('Y-m-d');

    // Try to update existing record
    $stmt = $pdo->prepare("
        UPDATE analytics
        SET count_value = count_value + 1
        WHERE counter_name = ? AND date = ?
    ");
    $stmt->execute([$counter_name, $today]);

    // If no rows were updated, insert new record
    if ($stmt->rowCount() == 0) {
        $stmt = $pdo->prepare("
            INSERT INTO analytics (counter_name, count_value, date)
            VALUES (?, 1, ?)
        ");
        $stmt->execute([$counter_name, $today]);
    }

    echo json_encode(['success' => true]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error',
        'message' => $e->getMessage()
    ]);
}
?>
