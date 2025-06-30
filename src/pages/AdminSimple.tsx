import ConversionDashboard from '@/components/admin/ConversionDashboard';

const AdminSimple = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Semplice */}
      <div className="bg-blue-600 text-white p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">🎯 Gas Power - Dashboard Admin</h1>
          <p className="text-blue-100">Monitoraggio richieste callback in tempo reale</p>
        </div>
      </div>
      
      {/* Dashboard */}
      <ConversionDashboard isAdmin={true} />
    </div>
  );
};

export default AdminSimple;
