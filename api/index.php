<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'db.php';

$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($action === 'alldb') {
        $stmt = $pdo->query("SELECT * FROM features");
        $rows = $stmt->fetchAll();
        $db = [
            'spbu' => [],
            'jalan' => [],
            'parsil' => [],
            'warga' => [],
            'rumahIbadah' => []
        ];
        
        foreach ($rows as $row) {
            $layer = $row['layer'];
            $data = json_decode($row['data'], true);
            // Ensure ID is part of the data
            if (!isset($data['id'])) {
                $data['id'] = $row['id'];
            }
            if (!isset($db[$layer])) {
                $db[$layer] = [];
            }
            $db[$layer][] = $data;
        }
        
        echo json_encode($db);
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if ($action === 'add') {
        $layer = $input['layer'];
        $data = $input['data'];
        $id = $data['id']; // Expecting frontend to generate ID or we could generate it here
        
        $stmt = $pdo->prepare("INSERT INTO features (id, layer, data) VALUES (?, ?, ?)");
        $stmt->execute([$id, $layer, json_encode($data)]);
        
        echo json_encode(['success' => true]);
        exit;
    }
    
    if ($action === 'update') {
        $layer = $input['layer'];
        $id = $input['id'];
        $patch = $input['patch'];
        
        // Fetch existing data
        $stmt = $pdo->prepare("SELECT data FROM features WHERE id = ? AND layer = ?");
        $stmt->execute([$id, $layer]);
        $row = $stmt->fetch();
        
        if ($row) {
            $currentData = json_decode($row['data'], true);
            $newData = array_merge($currentData, $patch);
            
            $updateStmt = $pdo->prepare("UPDATE features SET data = ? WHERE id = ? AND layer = ?");
            $updateStmt->execute([json_encode($newData), $id, $layer]);
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Record not found']);
        }
        exit;
    }
    
    if ($action === 'remove') {
        $layer = $input['layer'];
        $id = $input['id'];
        
        $stmt = $pdo->prepare("DELETE FROM features WHERE id = ? AND layer = ?");
        $stmt->execute([$id, $layer]);
        
        echo json_encode(['success' => true]);
        exit;
    }
}

echo json_encode(['error' => 'Invalid action']);
?>
