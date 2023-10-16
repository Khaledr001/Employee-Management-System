import { useGetAUserByEmail, useGetAllUsers } from "../../../hooks/useUser";
import { Alert, CircularProgress } from "@mui/material";
import UserEdit from "../../components/userForm";


export const GetUser = ({ email }) => {
    console.log(email);
    
  const getUserByEmail = useGetAllUsers();

  if (getUserByEmail.isLoading) return <CircularProgress />;
  if (getUserByEmail.error) {
    return <Alert severity="error">Failed to load projects</Alert>;
  }
    
  return <h1>hi</h1>
//   return <UserEdit user={getUserByEmail.data?.data.payload.user} />;
};