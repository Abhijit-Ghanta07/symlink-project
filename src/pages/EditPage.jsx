import { useEffect, useState } from "react";
import { axiosInt } from "../services/api/api.js";
import { useNavigate, useParams } from "react-router-dom";
export default function CompanyEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    image: null,
    adminId: "",
  });

  const fetchDetails = async () => {
    try {
      const { data, status } = await axiosInt.get(
        `/company-administrators-details/${id}`
      );
      if (status == 200) {
        let details = data?.data?.company;
        setCompany({
          companyName: details?.companyName,
          firstName: details?.companyAdministrator?.[0]?.firstName,
          lastName: details?.companyAdministrator?.[0]?.lastName,
          email: details?.companyAdministrator?.[0]?.email,
          image: details?.image?.url,
          adminId: details?.companyAdministrator?.[0]?._id,
        });
      }
    } catch (err) {
      // alert error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCompany({ ...company, image: imageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (
      company.companyName !== "" &&
      company.firstName !== "" &&
      company.lastName !== "" &&
      company.email !== "" &&
      company.image !== null
    ) {
      formData.append("companyName", company.companyName);
      formData.append("firstName", company.firstName);
      formData.append("lastName", company.lastName);
      formData.append("email", company.email);
      formData.append("image", company.image);
      formData.append("companyId", id);
      formData.append("administratorId", company.adminId);

      try {
        setLoading(true);
        const { data, status } = await axiosInt.put(
          "/company-administrators-edit",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (status == 200) {
          // show success message update succesfull

          navigate("/", { replace: true });
        }
      } catch (err) {
        // alert error
      } finally {
        setLoading(false);
      }
    } else {
      // alert error with validation
    }
  };
  useEffect(() => {
    fetchDetails();
  }, [id]);

  return (
    <div className="flex items-center justify-center  bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full flex space-x-6">
        <div className="w-2/3 flex flex-col items-center">
          <div className="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
            {company.image ? (
              <img
                src={company.image}
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 text-sm"
          />
        </div>

        <form onSubmit={handleSubmit} className="w-2/3">
          <label className="block text-gray-700">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={company.companyName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg mt-1"
          />

          <div className="flex space-x-4 mt-3">
            <div className="w-1/2">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={company.firstName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={company.lastName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg mt-1"
              />
            </div>
          </div>

          <label className="block text-gray-700 mt-3">Email</label>
          <input
            type="email"
            name="email"
            value={company.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg mt-1"
          />

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 disabled:bg-gray-300"
            disabled={loading}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
