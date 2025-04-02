import { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Pagination } from "../components/Components";
import { axiosInt } from "../services/api/api.js";
export default function CompanyListPage() {
  const [openMenu, setOpenMenu] = useState(null);
  const [currentPage, SetCurrentPage] = useState(1);
  const [CompanyData, SetCompanyData] = useState(null);
  const itemsPerPage = 10;

  const handlePageChange = (pageNumber) => {
    if (currentPage < CompanyData?.totalPages || currentPage > 0) {
      SetCurrentPage(pageNumber);
    } else {
      // show alert your at last page or first page
    }
  };

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };
  const fetchData = async (page) => {
    let limit = currentPage * itemsPerPage;
    let skip = (currentPage - 1) * itemsPerPage;
    try {
      const { data, status } = await axiosInt.get(
        `/company-administrators-list?sortQuery=-createdAt&keyword&limit=${limit}&offset=${skip}&type=COMPANY`
      );
      if (status == 200) {
        SetCompanyData(data);
      }
    } catch (err) {
      // alert show error whilw fetching data
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <div className="flex flex-col  bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-4">Company List</h2>
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="border px-4 py-2">Sl No.</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Company Name</th>
              <th className="border px-4 py-2">First Name</th>
              <th className="border px-4 py-2">Last Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {CompanyData?.docs?.map((company, inx) => (
              <tr key={company._id} className="text-center relative">
                <td className="border px-4 py-2">{inx + 1}</td>
                <td className="border px-4 py-2">
                  <img
                    src={company?.image?.url || null}
                    alt="Company Logo"
                    className="w-12 h-12 object-cover rounded-lg border"
                  />
                </td>
                <td className="border px-4 py-2">{company?.companyName}</td>
                <td className="border px-4 py-2">
                  {company?.companyAdministrator?.[0]?.firstName}
                </td>
                <td className="border px-4 py-2">
                  {company?.companyAdministrator?.[0]?.lastName}
                </td>
                <td className="border px-4 py-2">
                  {company?.companyAdministrator?.[0]?.email}
                </td>
                <td className="border px-4 py-2 relative">
                  <button
                    onClick={() => toggleMenu(company._id)}
                    className="p-2 cursor-pointer"
                  >
                    <FiMoreVertical />
                  </button>
                  {openMenu === company._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 shadow-lg rounded-lg text-left z-10">
                      <Link
                        to={`/detail/${company?._id}`}
                        className="block w-full px-4 py-2 text-sm hover:bg-gray-200"
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit/${company?._id}`}
                        className="block w-full px-4 py-2 text-sm hover:bg-gray-200"
                      >
                        Edit
                      </Link>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={CompanyData?.totalPages || 5}
          onPageChange={handlePageChange}
          hasNextPage={CompanyData?.hasNextPage}
          hasPreviousPage={CompanyData?.hasPrevPage}
        />
      </div>
    </div>
  );
}
