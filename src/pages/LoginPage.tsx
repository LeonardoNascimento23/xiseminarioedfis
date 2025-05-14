import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendMagicLink, isAdmin } from '../lib/supabase';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      // Verifica se é admin
      const admin = await isAdmin();
      if (!admin) {
        throw new Error('Apenas o administrador pode enviar links de acesso');
      }

      const { error: authError } = await sendMagicLink(email);
      if (authError) throw new Error(authError.message);

      setMessage('Link de acesso enviado para: ' + email);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao enviar link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Enviar Link de Acesso</h2>
              
              <form onSubmit={handleMagicLink}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email do Usuário</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="alert alert-success" role="alert">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar Link de Acesso'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}