import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

export const CMS: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Carregar script do Netlify Identity
    const script = document.createElement('script');
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Carregar script do Netlify CMS
    const cmsScript = document.createElement('script');
    cmsScript.src = 'https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js';
    cmsScript.async = true;
    document.body.appendChild(cmsScript);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(cmsScript);
    };
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div id="nc-root" className="h-screen" />
    </div>
  );
}; 