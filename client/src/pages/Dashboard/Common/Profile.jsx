import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { Helmet } from 'react-helmet';

const Profile = () => {
  const { user, loading } = useAuth() || {};
  const [role, isLoading] = useRole();

  if (isLoading || loading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-10 md:mt-0">
      <Helmet>
        <title>Profile</title>
      </Helmet>

      
      <div className="relative w-full max-w-md mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-lg overflow-hidden">
       
        <div className="relative">
          <img
            alt="Cover"
            src="https://i.ibb.co/dgkWk5P/caleb-woods-iobr-Ss-Vqp28-unsplash.jpg"
            className="w-full h-40 object-cover"
          />
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img
              alt="profile"
              src={user?.photoURL}
              className="object-cover rounded-full h-24 w-24 border-4 border-white shadow-md"
            />
          </div>
        </div>

        
        <div className="flex flex-col items-center mt-12 px-6 py-4">
          <h2 className="text-xl font-semibold text-black">{user?.displayName}</h2>
          <p className="text-sm text-black opacity-80 mt-2 badge badge-info ">
            {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
          </p>

          <div className="mt-4 bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-xl shadow-inner w-full text-black">
            <div className="flex flex-col items-center">
              <p className="text-sm font-medium">User ID</p>
              <p className="text-lg font-bold">{user?.uid}</p>
            </div>
            <div className="flex flex-col items-center mt-4">
              <p className="text-sm font-medium">Email</p>
              <p className="text-lg font-bold">{user?.email}</p>
            </div>
          </div>
        </div>

        
        <div className="absolute bottom-0 left-0 right-0 mx-auto bg-white bg-opacity-20 backdrop-blur-md h-16 rounded-b-3xl" />
      </div>
    </div>
  );
};

export default Profile;
