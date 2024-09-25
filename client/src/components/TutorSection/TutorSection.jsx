import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { formatDistanceToNow } from 'date-fns';  // Import from date-fns
import SectionTitle from '../SectionTitle/SectionTitle';

const TutorSection = () => {
  const axiosCommon = useAxiosCommon();

  // Fetch tutors data with the updated object syntax for useQuery
  const { data: tutors = [], isLoading, isError, error } = useQuery({
    queryKey: ['tutors'],
    queryFn: async () => {
      const response = await axiosCommon.get('/tutors');
      return response.data;
    },
    enabled: !!axiosCommon, // Ensures that axios is defined before fetching
  });

  // console.log(tutors);

  if (isLoading) return <div><LoadingSpinner /></div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-screen-xl mx-auto overflow-x-auto px-6">
        <SectionTitle  heading="Our Tutors" description="Our tutors are experienced, dedicated, and passionate educators who provide personalized guidance to help students achieve success."/>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Since</th>
          </tr>
        </thead>
        <tbody>
          {tutors.map((tutor, index) => (
            <tr key={tutor._id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={tutor?.photo || 'https://via.placeholder.com/150'}
                        alt="Profile"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{tutor.name}</div>
                    <div className="text-sm opacity-50">{tutor.country}</div>
                  </div>
                </div>
              </td>
              <td>{tutor?.name}</td>
              <td>{tutor?.email}</td> 
              <td>{tutor.status || 'N/A'}</td> 
              <td>
                <span className="badge badge-ghost badge-sm">{tutor?.role.charAt(0).toUpperCase() +
                      tutor?.role.slice(1).toLowerCase()}</span>
              </td>
              <td>
                {tutor.timestamp ? formatDistanceToNow(new Date(tutor.timestamp), { addSuffix: true }) : 'N/A'}
              </td> 
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
  );
};

export default TutorSection;
