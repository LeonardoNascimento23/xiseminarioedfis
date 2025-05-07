interface NetlifyIdentityUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
}

interface NetlifyIdentity {
  on: (event: string, callback: (user: NetlifyIdentityUser | null) => void) => void;
  open: () => void;
  close: () => void;
  logout: () => void;
}

declare global {
  interface Window {
    netlifyIdentity: NetlifyIdentity;
  }
} 