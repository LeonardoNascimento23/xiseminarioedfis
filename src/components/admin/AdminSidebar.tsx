import { useEffect } from 'react';

export const AdminSidebar = () => {
  useEffect(() => {
    // Inicializa o widget do Netlify Identity
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
  }, []);

  const handleLogin = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Administração</h2>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Acessar Painel Admin
        </button>
        {/* ... rest of your existing sidebar code ... */}
      </div>
    </div>
  );
}; 