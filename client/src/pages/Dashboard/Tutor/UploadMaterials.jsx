import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../../api/utils";
import ClipLoader from "react-spinners/ClipLoader";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const UploadMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    studySessionId: "",
    tutorEmail: user?.email,
    image: null,
    link: "",
  });

  // Fetch all sessions for the logged-in tutor
  const { data: sessions } = useQuery({
    queryKey: ["sessions", user?.email],
    queryFn: () =>
      axiosSecure
        .get(`/sessions?tutorEmail=${user?.email}`)
        .then((res) => res.data),
    enabled: !!user?.email,
  });

  const uploadMutation = useMutation({
    mutationFn: (materialData) => axiosSecure.post("/materials", materialData),
    onSuccess: () => {
      setLoading(false);
      toast.success("Material uploaded successfully!");
      navigate("/dashboard/view-all-meterials");
    },
    onError: (error) => {
      setLoading(false);
      toast.error(`Failed to upload material: ${error.message}`);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.image) {
      try {
        const imageUrl = await imageUpload(formData.image);
        formData.image = imageUrl;
      } catch (error) {
        setLoading(false);
        toast.error("Failed to upload image");
        // console.log(error.message);
        return;
      }
    }

    // Submit the material data
    uploadMutation.mutate(formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
      <SectionTitle heading="Upload Materials" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Study Session ID/Name
          </label>
          <select
            name="studySessionId"
            value={formData.studySessionId}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" disabled>
              Select a session
            </option>
            {sessions?.map((session) => (
              <option key={session._id} value={session._id}>
                {session.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tutor Email
          </label>
          <input
            type="email"
            name="tutorEmail"
            value={formData.tutorEmail}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image Upload
          </label>
          <input type="file" name="image" onChange={handleImageChange} className="file-input file-input-bordered w-full file-input-sm"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Google Drive Link
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-green-200 to-cyan-200 hover:bg-gradient-to-r hover:from-green-400 hover:to-cyan-400 rounded transition duration-150 font-semibold py-2 px-4"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader size={20} color="#17202a" />
          ) : (
            "Upload Material"
          )}{" "}
          {/* Spinner */}
        </button>
      </form>
    </div>
  );
};

export default UploadMaterials;
