<?php
// Set headers to handle CORS and JSON responses
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Only POST requests are allowed']);
    exit();
}

// Get the raw POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate the data
if (!$data || !isset($data['selectedProducts']) || !isset($data['email']) || !isset($data['message'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid data provided']);
    exit();
}

// Extract and sanitize data
$products = $data['selectedProducts'];
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$message = strip_tags(htmlspecialchars($data['message'], ENT_QUOTES, 'UTF-8'));

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

// Recipient email (website manager)
$to = 'ruank83@gmail.com'; // Change to the actual manager's email

// Subject
$subject = 'New Product Inquiry from ' . $email;

// Build the email body
$body = "
<html>
<head>
    <title>New Product Inquiry</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        h1 { color: #2563eb; }
        h2 { color: #4b5563; margin-top: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background-color: #f3f4f6; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
    </style>
</head>
<body>
    <div class='container'>
        <h1>New Product Inquiry</h1>
        <p><strong>From:</strong> $email</p>
        
        <h2>Products Requested:</h2>
        <table>
            <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
            </tr>";

// Validate and add products
if (is_array($products) && count($products) > 0) {
    foreach ($products as $product) {
        if (isset($product['id'], $product['name'], $product['quantity'])) {
            $productId = htmlspecialchars($product['id']);
            $productName = htmlspecialchars($product['name']);
            $quantity = intval($product['quantity']);

            $body .= "
            <tr>
                <td>$productId</td>
                <td>$productName</td>
                <td>$quantity</td>
            </tr>";
        }
    }
} else {
    $body .= "
            <tr>
                <td colspan='3'>No valid products selected</td>
            </tr>";
}

$body .= "
        </table>
        
        <h2>Customer Message:</h2>
        <p>" . nl2br($message) . "</p>
        
        <div class='footer'>
            <p>This email was sent from the product inquiry form on your website.</p>
        </div>
    </div>
</body>
</html>";

// Headers for HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
$headers .= "From: no-reply@yourdomain.com" . "\r\n";  // Set your own domain's email
$headers .= "Reply-To: $email" . "\r\n";

// Send the email
$mailSent = mail($to, $subject, $body, $headers);

// Return response
if ($mailSent) {
    echo json_encode(['success' => true, 'message' => 'Your inquiry has been sent successfully']);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send your inquiry. Please try again later.',
        'error' => error_get_last()['message'] ?? 'Unknown error'
    ]);
}
?>

