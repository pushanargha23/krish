const https = require('https');

function testUrl(url) {
  https.get(url, (res) => {
    console.log(`URL: ${url}`);
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers:`, res.headers);
    console.log('---');
  }).on('error', (e) => {
    console.error(e);
  });
}

const fileId = '1PGWNqKoyZsFYCc3JarpPFfSk5vsjfaKz'; // Using the ID from earlier in the conversation
testUrl(`https://drive.google.com/uc?export=view&id=${fileId}`);
testUrl(`https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`);
testUrl(`https://lh3.googleusercontent.com/d/${fileId}`);
