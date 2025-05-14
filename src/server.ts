import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rota para listar arquivos de uma coleção
app.get('/content/:collection', async (req, res) => {
  try {
    const { collection } = req.params;
    const dirPath = path.join(__dirname, `../content/${collection}`);
    const files = await fs.readdir(dirPath);
    res.json(files.filter(file => file.endsWith('.md')));
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar arquivos' });
  }
});

// Rota para obter conteúdo de um arquivo
app.get('/content/:collection/:file', async (req, res) => {
  try {
    const { collection, file } = req.params;
    const filePath = path.join(__dirname, `../content/${collection}/${file}`);
    const content = await fs.readFile(filePath, 'utf-8');
    res.send(content);
  } catch (error) {
    res.status(404).json({ error: 'Arquivo não encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
}); 