import MyCard from "../components/card";
import { useGetAllEmployee } from "../hooks/useEmployee";
import { useEffect, useState } from "react";
import { useGetAlluser } from "../hooks/useUsers";
import Loading from "../components/loading";
import ErrorPage from "./errorPage";
import Barchart from "../components/barChart";
import Linechart from "../components/lineChart";

export default function Dashboard() {
  const [employees, setEmployees] = useState();
  const [users, setUsers] = useState();

  const getEmployeeResponse = useGetAllEmployee();
  const getUserResponse = useGetAlluser();

  useEffect(() => {
    setEmployees(getEmployeeResponse.data?.data.payload.employees);
    setUsers(getUserResponse.data?.data.payload.users);
  }, [
    getEmployeeResponse.data?.data.payload.employees,
    getUserResponse.data?.data.payload.users,
  ]);

  if (getEmployeeResponse.isLoading || getUserResponse.isLoading) {
    return <Loading />;
  }

  if (getEmployeeResponse.isError || getUserResponse.isError) {
    return <ErrorPage />;
  }

  let totalAge = 0;

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);

    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    totalAge += age;
  };

  if (getEmployeeResponse.isSuccess) {
    employees?.map((employee) => {
      calculateAge(employee.dateOfBirth);
    });
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-10 mt-3">
        <MyCard title={"Total Employees"} number={employees?.length} />
        <MyCard title={"Total Users"} number={users?.length} />
        <MyCard
          title={"Average Employee Age"}
          number={totalAge / employees?.length}
        />
      </div>

      <div className="mt-10 flex gap-10 flex-col lg:flex-row">
        {employees && <Barchart employees={employees} />}
        {employees && <Linechart employees={employees} />}
      </div>
    </>
  );
}
