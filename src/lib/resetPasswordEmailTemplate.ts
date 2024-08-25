

export const resetPasswordEmailTemplate = (link: string) => {
    return `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .header img {
                        width: 150px;
                        height: auto;
                    }
                    .content {
                        font-size: 16px;
                        color: #333333;
                        line-height: 1.5;
                        margin-bottom: 20px;
                    }
                    .button {
                        display: inline-block;
                        font-size: 16px;
                        color: #ffffff;
                        background-color: #007bff;
                        padding: 15px 25px;
                        text-decoration: none;
                        border-radius: 5px;
                        text-align: center;
                    }
                    .footer {
                        font-size: 14px;
                        color: #777777;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="content">
                        <h2>Password Reset Request</h2>
                        <p>We received a request to reset your password. Please click the button below to create a new password:</p>
                        <a href="${link}" class="button">Reset Password</a>
                        <p>If you did not request a password reset, please ignore this email. Your password will not be changed.</p>
                    </div>
                </div>
            </body>
        </html>
    `
}