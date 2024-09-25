import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RiDeleteBin3Line } from "react-icons/ri";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import LoadingSpinner from './../../../components/LoadingSpinner/LoadingSpinner';
import { Helmet } from "react-helmet";


const ViewAllMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  
  const { data: materials, isLoading, error, refetch } = useQuery({
    queryKey: ["materials", user?.email],
    queryFn: () => axiosSecure.get(`/materials?email=${user?.email}`).then((res) => res.data),
    enabled: !!user?.email,
  });

  
  const deleteMutation = useMutation({
    mutationFn: (materialId) => axiosSecure.delete(`/materials/${materialId}`),
    onSuccess: () => {
      toast.success("Material deleted successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to delete material: ${error.message}`);
    },
  });

  const handleDeleteMaterial = (materialId) => {
    deleteMutation.mutate(materialId);
  };

  if (isLoading) return <div><LoadingSpinner></LoadingSpinner></div>;
  if (error) return <div>Error loading materials: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Helmet>
        <title>Uploaded Materials | Learnic</title>
      </Helmet>
        <SectionTitle heading="Uploaded Materials" />

      {materials && materials.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="w-full bg-gray-200">
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Link</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material._id} className="text-center border">
                <td className="py-2 px-4 border">{material.title}</td>
                <td className="py-2 px-4 border">
                  <div className="flex justify-center">
                  {material.image && <img src={material.image} alt={material.title} className="h-12 w-16 object-fill  rounded-xl" />}
                  </div>
                </td>
                <td className="py-2 px-4 border">
                  {material.link && (
                    <a href={material.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      View Link
                    </a>
                  )}
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleDeleteMaterial(material._id)}
                    className="py-1 px-4 bg-red-500 text-white rounded"
                  >
                    <RiDeleteBin3Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-ful h-44 flex justify-center items-center"><p>No materials found.</p></div>
      )}
    </div>
  );
};

export default ViewAllMaterials;
