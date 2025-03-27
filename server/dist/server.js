import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
// Load environment variables
dotenv.config();
// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
// Serve static files from the client's dist folder
const clientDistPath = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));
// Middleware for JSON and form data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Import and use routes
import routes from './routes/index.js';
app.use(routes);
// Serve index.html for all unknown routes (for SPAs)
app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});
// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
