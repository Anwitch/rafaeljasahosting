<?php
require_once 'db.php';

try {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS features (
            id VARCHAR(100) PRIMARY KEY,
            layer VARCHAR(50) NOT NULL,
            data JSON NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ");

    $stmt = $pdo->prepare("
        SELECT 1
        FROM information_schema.statistics
        WHERE table_schema = DATABASE()
          AND table_name = 'features'
          AND index_name = 'idx_layer'
        LIMIT 1
    ");
    $stmt->execute();

    if (!$stmt->fetchColumn()) {
        $pdo->exec("CREATE INDEX idx_layer ON features(layer)");
    }

    echo "Database table 'features' created successfully.";
} catch (PDOException $e) {
    echo "Error creating table: " . $e->getMessage();
}
?>
