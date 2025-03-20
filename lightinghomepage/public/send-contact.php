<?php
// Set headers to handle CORS and JSON responses
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// For debugging - uncomment if needed
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

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

// Get the raw POST data and decode
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Log the received data for debugging
// file_put_contents('contact_log.txt', date('Y-m-d H:i:s') . " - Received data: " . $json . PHP_EOL, FILE_APPEND);

// Validate required fields
if (!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
    echo json_encode(['success' => false, 'message' => 'Required fields are missing']);
    exit();
}

// Extract and sanitize required data
$name = htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8');

// Extract and sanitize optional data
$phone = isset($data['phone']) ? htmlspecialchars(trim($data['phone']), ENT_QUOTES, 'UTF-8') : 'Not provided';
$company = isset($data['company']) ? htmlspecialchars(trim($data['company']), ENT_QUOTES, 'UTF-8') : 'Not provided';
$subject = isset($data['subject']) && !empty($data['subject']) 
    ? htmlspecialchars(trim($data['subject']), ENT_QUOTES, 'UTF-8') 
    : 'General Inquiry';
$formSource = isset($data['source']) ? htmlspecialchars(trim($data['source']), ENT_QUOTES, 'UTF-8') : 'Website Contact Form';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address']);
    exit();
}

// Validate name
if (strlen($name) < 2) {
    echo json_encode(['success' => false, 'message' => 'Please enter your full name']);
    exit();
}

// Validate message
if (strlen($message) < 5) {
    echo json_encode(['success' => false, 'message' => 'Please enter a detailed message']);
    exit();
}

// Recipient email (website manager)
$to = 'ruank83@gmail.com'; // Change to the actual manager's email

// Email subject
$emailSubject = "New Contact Form Submission: $subject";

// Current date and time
$date = date('F j, Y, g:i a');

// Build the email body with a nice design
$body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #2563eb;
            color: white;
            padding: 25px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: 700;
        }
        .content {
            padding: 35px;
        }
        .info-section {
            margin-bottom: 30px;
        }
        .info-section h2 {
            color: #2563eb;
            font-size: 20px;
            margin-top: 0;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e5e7eb;
            font-weight: 700;
        }
        .info-item {
            margin-bottom: 15px;
            font-size: 16px;
        }
        .info-label {
            font-weight: 700;
            color: #4b5563;
            display: inline-block;
            width: 100px;
        }
        .message-box {
            background-color: #f3f4f6;
            padding: 20px;
            border-radius: 12px;
            margin-top: 15px;
            white-space: pre-line;
            font-size: 16px;
        }
        .meta-info {
            font-size: 14px;
            color: #6b7280;
            margin-top: 25px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
        }
        .footer {
            background-color: #f3f4f6;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>New Contact Form Submission</h1>
        </div>
        <div class='content'>
            <div class='info-section'>
                <h2>Contact Information</h2>
                <div class='info-item'>
                    <span class='info-label'>Name:</span> $name
                </div>
                <div class='info-item'>
                    <span class='info-label'>Email:</span> $email
                </div>
                <div class='info-item'>
                    <span class='info-label'>Phone:</span> $phone
                </div>
                <div class='info-item'>
                    <span class='info-label'>Company:</span> $company
                </div>
                <div class='info-item'>
                    <span class='info-label'>Subject:</span> $subject
                </div>
            </div>
            
            <div class='info-section'>
                <h2>Message</h2>
                <div class='message-box'>
                    " . nl2br($message) . "
                </div>
            </div>
            
            <div class='meta-info'>
                <div>Submitted on: $date</div>
                <div>Form Source: $formSource</div>
                <div>IP Address: " . $_SERVER['REMOTE_ADDR'] . "</div>
                <div>User Agent: " . (isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'Not available') . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>This email was sent from the contact form on your website.</p>
            <p>© " . date('Y') . " Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
";

// Headers for HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
$headers .= "From: no-reply@yourdomain.com" . "\r\n";  // Set your own domain's email
$headers .= "Reply-To: $email" . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Try to send the email
try {
    $mailSent = mail($to, $emailSubject, $body, $headers);
    
    // Check if mail was sent
    if ($mailSent) {
        echo json_encode([
            'success' => true, 
            'message' => 'Your message has been sent successfully. We will get back to you soon!'
        ]);
    } else {
        // Log the error if mail fails
        $errorMessage = error_get_last();
        // file_put_contents('contact_error_log.txt', date('Y-m-d H:i:s') . " - Mail error: " . 
        //     ($errorMessage ? json_encode($errorMessage) : 'Unknown error') . PHP_EOL, FILE_APPEND);
        
        echo json_encode([
            'success' => false,
            'message' => 'Failed to send your message. Please try again later or contact us directly.',
            'error' => $errorMessage ? $errorMessage['message'] : 'Unknown error'
        ]);
    }
} catch (Exception $e) {
    // Log any exceptions
    // file_put_contents('contact_error_log.txt', date('Y-m-d H:i:s') . " - Exception: " . 
    //     $e->getMessage() . PHP_EOL, FILE_APPEND);
    
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while processing your request. Please try again later.',
        'error' => $e->getMessage()
    ]);
}
?>

