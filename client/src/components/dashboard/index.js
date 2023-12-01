import { FaHome } from "react-icons/fa";

export const Dashboard = () => {
  return (
    <>
      <div className="border border-black container-fluid pt-3 mb-3">
        <nav className="bread-separator" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">
              <FaHome className="me-2" /> Home
            </li>
          </ol>
        </nav>
      </div>
      <h1 className="text-center">Dashboard</h1>
    </>
  );
};
