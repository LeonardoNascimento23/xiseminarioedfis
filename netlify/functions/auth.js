const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  // Configurar cliente Supabase
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Verificar método da requisição
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método não permitido' })
    };
  }

  try {
    const { email, password } = JSON.parse(event.body);

    // Autenticar com Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Verificar se o usuário tem permissão de admin
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (userError) throw userError;

    if (userData.role !== 'admin') {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Acesso negado' })
      };
    }

    // Retornar token JWT
    return {
      statusCode: 200,
      body: JSON.stringify({
        token: data.session.access_token,
        user: {
          id: data.user.id,
          email: data.user.email,
          role: userData.role
        }
      })
    };
  } catch (error) {
    console.error('Erro de autenticação:', error);
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Credenciais inválidas' })
    };
  }
}; 