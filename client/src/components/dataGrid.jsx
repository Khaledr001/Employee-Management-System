import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  //   { field: "id", headerName: "ID", width: 90 },

  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "email",
    headerName: "Email",
    type: "email",
    sortable: false,
    width: 200,
    editable: false,
  },
  {
    field: "phoneNumber",
    headerName: "Phone",
    sortable: false,
    width: 130,
    editable: false,
  },

  {
    field: "age",
    headerName: "Age",
    type: "number",
    sortable: true,
    width: 80,
    editable: true,
  },
  {
    field: "position",
    headerName: "Position",
    type: "text",
    sortable: true,
    width: 130,
    editable: false,
  },
  {
    field: "salary",
    headerName: "Salary",
    type: "number",
    width: 90,
    editable: false,
  },
  {
    field: "Action",
    width: 110,
    renderCell: (rowValues) => {
      return <button className="btn btn-sm">getData</button>;
    },
  },
];

export default function UserDataGrid(employees) {
    const rows = [];
    employees.employees.forEach((employee) => {
        rows.push({
            ...employee,
            id: employee._id,
        })
    })
  return (
    <Box className="w-fit bg-base-100" sx={{}}>
          <DataGrid
              className="bg-base-100 "
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        // disableColumnFilter
        disableColumnSelector
        // disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        pageSizeOptions={[15]}
        checkboxSelection
        disableMultipleRowSelection 
        // disableRowSelectionOnClick
      />
    </Box>
  );
}
