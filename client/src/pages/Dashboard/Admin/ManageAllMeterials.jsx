import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet";

const ManageAllMeterials = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false); // New state for delete loading

  // Fetch all materials (admin only)
  const { data: materials, refetch, isLoading } = useQuery({
    queryKey: ["allMaterials"],
    queryFn: () => axiosSecure.get("/materials").then((res) => res.data),
    onError: (error) => {
      toast.error(`Failed to fetch materials: ${error.message}`);
    },
  });

  // Mutation to delete a material
  const deleteMutation = useMutation({
    mutationFn: (materialId) => {
      setDeleteLoading(true); // Start delete loading
      return axiosSecure.delete(`/materials/${materialId}`);
    },
    onSuccess: () => {
      toast.success("Material deleted successfully!");
      setDeleteLoading(false); // Stop delete loading
      refetch(); // Refresh materials after deletion
    },
    onError: (error) => {
      toast.error(`Failed to delete material: ${error.message}`);
      setDeleteLoading(false); // Stop delete loading
    },
  });

  const handleDeleteMaterial = (materialId) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      deleteMutation.mutate(materialId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded">
      <Helmet>
        <title>All Materials | Learnic</title>
      </Helmet>
      <SectionTitle heading="All Materials" />
      {isLoading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color="#36D7B7" />
        </div>
      ) : (
        <div>
          {materials && materials.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Title</th>
                  <th className="py-2">Study Session ID</th>
                  <th className="py-2">Tutor Email</th>
                  <th className="py-2">Image</th>
                  <th className="py-2">Link</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material._id}>
                    <td className="border px-4 py-2">{material.title}</td>
                    <td className="border px-4 py-2">{material.studySessionId}</td>
                    <td className="border px-4 py-2">{material.tutorEmail}</td>
                    <td className="border px-4 py-2">
                      {material.image ? (
                        <img
                          src={material.image}
                          alt="material"
                          className="w-20 h-20 object-cover"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {material.link ? (
                        <a
                          href={material.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          View Link
                        </a>
                      ) : (
                        "No Link"
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDeleteMaterial(material._id)}
                        className="bg-red-500 text-white rounded px-4 py-2"
                        disabled={deleteLoading} // Disable button while deleting
                      >
                        {deleteLoading ? (
                          <ClipLoader size={15} color="#ffffff" />
                        ) : (
                          "Delete"
                        )}
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
      )}
    </div>
  );
};

export default ManageAllMeterials;
