const https = require('https');

const authorIconUrl = process.env.PULL_REQUEST_AUTHOR_ICON_URL;
const authorName = process.env.PULL_REQUEST_AUTHOR_NAME;
const PRNum = process.env.PULL_REQUEST_NUMBER;
const PRRepo = process.env.PULL_REQUEST_REPO;
const PRTitle = process.env.PULL_REQUEST_TITLE;
const PRUrl = process.env.PULL_REQUEST_URL;
const webhookUrl = new URL(process.env.WEBHOOK_URL);

const message = JSON.stringify({
    blocks: [
        {   
            type: "section",
            text: {
                type: "plain_text",
                text: PRRepo
            }
        },
        {
            type: "header",
            text: {
                type: "mrkdwn",
                text: "*<" + PRUrl + "|" + PRTitle + ">*"
            }
        },
        {   
            type: "context",
            elements: [
                {
                    type: "image",
                    image_url: authorIconUrl,
                    alt_text: "GitHub Icon",
                },
                {
                    type: "mrkdwn",
                    text: "*Author*\n" + authorName,
                },
                {
                    type: "mrkdwn",
                    text: "*Pull request number*\n#" + PRNum,
                }
            ]
        }
    ]
});

const options = {
    hostname: webhookUrl.host,
    path: webhookUrl.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': message.length,
    },
}

const req = https.request(options,
    (res) => {
        console.log(`Status ${res.statusCode}: Notification sent`);

        res.on('data', (data) => {
            process.stdout.write(data);
        })
    }
);

req.write(message);
req.end();