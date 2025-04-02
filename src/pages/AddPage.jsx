import { useState } from "react";
import { axiosInt } from "../services/api/api.js";
let fleids = {
  companyName: "",
  firstName: "",
  lastName: "",
  email: "",
  image: null,
  imageFile: null,
};
function CompanyAdd() {
  const [companyData, setCompanyData] = useState(fleids);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyData({
        ...companyData,
        image: URL.createObjectURL(file),
        imageFile: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (
      companyData.companyName !== "" &&
      companyData.firstName !== "" &&
      companyData.lastName !== "" &&
      companyData.email !== "" &&
      companyData.imageFile !== null
    ) {
      formData.append("companyName", companyData.companyName);
      formData.append("firstName", companyData.firstName);
      formData.append("lastName", companyData.lastName);
      formData.append("email", companyData.email);
      formData.append("image", companyData.imageFile);
      try {
        setLoading(true);
        const { data, status } = await axiosInt.post(
          "/company-administrator-add",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (status == 201 || status == 200) {
          // show details added succesfull
          // empty fleids
          setCompanyData(fleids);
          // navigate to list page
        }
      } catch (err) {
        //show error message
      } finally {
        setLoading(false);
      }
    } else {
      // show message please fill all fleids
      console.log("empty");
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] flex">
        {/* Left Side - Image Preview */}
        <div className="w-1/3 flex flex-col items-center justify-center border-r pr-4">
          {companyData.image ? (
            <img
              src={companyData.image}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-lg border border-gray-300 shadow-md"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center border border-gray-300 bg-gray-100 rounded-lg shadow-md text-gray-500">
              No Image
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 text-sm"
          />
        </div>

        {/* Right Side - Form Fields */}
        <div className="w-2/3 pl-4">
          <h2 className="text-xl font-semibold mb-4">Company Details</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={companyData.companyName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <div className="flex space-x-2">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={companyData.firstName}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={companyData.lastName}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={companyData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
              disabled={loading}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompanyAdd;
