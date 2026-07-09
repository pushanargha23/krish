const https = require('https');

https.get('https://drive.google.com/drive/folders/1OB0vfLF9VORqz4QKqx2l16hPHZqNuCiW', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    // Look for file IDs in the HTML, usually inside window._DRIVE_context or similar
    const matches = data.match(/"([a-zA-Z0-9_-]{33})"/g) || [];
    const uniqueIds = [...new Set(matches.map(m => m.replace(/"/g, '')))];
    console.log("Found possible IDs:", uniqueIds);
    
    // Test the first few IDs
    uniqueIds.slice(0, 3).forEach(id => {
      const url = `https://lh3.googleusercontent.com/d/${id}`;
      https.get(url, (imgRes) => {
        console.log(`Testing lh3 for ID ${id}: ${imgRes.statusCode}`);
      });
      const url2 = `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
      https.get(url2, (imgRes) => {
        console.log(`Testing thumbnail for ID ${id}: ${imgRes.statusCode}`);
      });
      const url3 = `https://drive.google.com/uc?export=view&id=${id}`;
      https.get(url3, (imgRes) => {
        console.log(`Testing uc for ID ${id}: ${imgRes.statusCode}`);
      });
    });
  });
}).on('error', (e) => {
  console.error(e);
});
