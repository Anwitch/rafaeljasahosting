CREATE DATABASE IF NOT EXISTS webgis_bansos;
USE webgis_bansos;

CREATE TABLE IF NOT EXISTS features (
    id VARCHAR(100) PRIMARY KEY,
    layer VARCHAR(50) NOT NULL,
    data JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster queries by layer
CREATE INDEX idx_layer ON features(layer);
