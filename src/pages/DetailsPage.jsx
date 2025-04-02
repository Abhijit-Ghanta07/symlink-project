import { useParams } from "react-router-dom";
import { axiosInt } from "../services/api/api.js";
import { useEffect, useState } from "react";
export default function CompanyDetails() {
  const [companyDetails, setCompanyDetails] = useState(null);

  const { id } = useParams();
  const fetchDetails = async () => {
    try {
      const { data, status } = await axiosInt.get(
        `/company-administrators-details/${id}`
      );
      if (status == 200) {
        setCompanyDetails(data?.data?.company);
      }
    } catch (err) {
      // alert error
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  return (
    <div className="flex  bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] flex">
        {/* Image Preview */}
        <div className="w-1/3 flex flex-col items-center justify-center border-r pr-4">
          {companyDetails?.image?.url ? (
            <img
              src={companyDetails?.image?.url}
              alt="Company Logo"
              className="w-24 h-24 object-cover rounded-lg border border-gray-300 shadow-md"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center border border-gray-300 bg-gray-100 rounded-lg shadow-md text-gray-500">
              No Image
            </div>
          )}
        </div>

        {/*  Company Details */}
        <div className="w-2/3 pl-4">
          <h2 className="text-xl font-semibold mb-4">Company Details</h2>
          <p className="text-gray-700 font-bold">
            <span>Company Name:</span>
            {companyDetails?.companyName}
          </p>
          <div className="flex space-x-2 mt-2 font-bold">
            <p className="text-gray-600">
              <span>FirstName:</span>
              {companyDetails?.companyAdministrator?.[0]?.firstName}
            </p>
            <p className="text-gray-600">
              <span>LastName:</span>
              {companyDetails?.companyAdministrator?.[0]?.lastName}
            </p>
          </div>
          <p className="text-gray-600 mt-2 font-bold">
            <span>Email:</span>
            {companyDetails?.companyAdministrator?.[0]?.email}
          </p>
        </div>
      </div>
    </div>
  );
}
