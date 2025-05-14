import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Erro: Variáveis de ambiente não configuradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigrations() {
  try {
    // Ler diretório de migrações
    const migrationsDir = path.join(__dirname, '../supabase/migrations');
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    console.log('Iniciando migrações...');

    for (const file of files) {
      console.log(`Executando migração: ${file}`);
      
      const sql = fs.readFileSync(
        path.join(migrationsDir, file),
        'utf8'
      );

      const { error } = await supabase.rpc('exec_sql', { sql });

      if (error) {
        throw error;
      }

      console.log(`Migração ${file} concluída com sucesso`);
    }

    console.log('Todas as migrações foram executadas com sucesso!');
  } catch (error) {
    console.error('Erro ao executar migrações:', error);
    process.exit(1);
  }
}

runMigrations(); 