<?php
require_once 'db.php';

$sql = "
CREATE TABLE IF NOT EXISTS features (
    id VARCHAR(100) PRIMARY KEY,
    layer VARCHAR(50) NOT NULL,
    data JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_layer ON features(layer);
";

try {
    $pdo->exec($sql);
    echo "Database table 'features' created successfully.";
} catch (PDOException $e) {
    echo "Error creating table: " . $e->getMessage();
}
?>
