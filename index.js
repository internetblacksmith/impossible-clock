const express = require('express');
const app = express();
const port = process.env.PORT || 5000
app
  .use(express.static(`${__dirname}/dist`))
  .get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))
  .listen(port, () => console.log(`Express has started on port: ${port}`));
