-- MySQL database schema for ThreatCheck-Portal
-- Import this file into phpMyAdmin to create the database

CREATE DATABASE IF NOT EXISTS threatcheck_portal;
USE threatcheck_portal;

-- Users table for authentication
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- API responses table to store check results
CREATE TABLE api_responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    data_type VARCHAR(20) NOT NULL,
    input_data TEXT NOT NULL,
    response_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Index for faster queries
CREATE INDEX idx_user_id ON api_responses(user_id);
CREATE INDEX idx_data_type ON api_responses(data_type);
CREATE INDEX idx_created_at ON api_responses(created_at);