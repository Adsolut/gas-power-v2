import ConversionDashboard from '@/components/admin/ConversionDashboard';

const Admin = () => {
  // Simple password protection (replace with proper auth in production)
  const checkAccess = () => {
    const password = prompt('Inserisci la password per accedere al dashboard:');
    return password === 'gaspower2025'; // Change this to your desired password
  };

  if (!checkAccess()) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accesso Negato</h1>
          <p className="text-gray-600">Password non corretta.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }

  return <ConversionDashboard isAdmin={true} />;
};

export default Admin;
