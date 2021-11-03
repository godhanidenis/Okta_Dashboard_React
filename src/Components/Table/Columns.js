import ColumnFilter from "./ColumnFilter";

export const Columns = [
  {
    Header: "Name",
    accessor: "profile.displayName",
    Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "Work Email (Username)",
    accessor: "profile.email",
    Filter: ColumnFilter,
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: "Secondary Email",
    accessor: "profile.secondEmail",
    Filter: ColumnFilter,
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: "Status",
    accessor: "status",
    Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "Person Type",
    accessor: "profile.employmentStatus",
    Filter: ColumnFilter,
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: "Location",
    accessor: "profile.workLocation",
    Filter: ColumnFilter,
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: "Start Date",
    accessor: "profile.hireDate",
    Filter: ColumnFilter,
    disableSortBy: true,
  },
  {
    Header: "Title",
    accessor: "profile.title",
    Filter: ColumnFilter,
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: "Department",
    accessor: "profile.department",
    Filter: ColumnFilter,
    disableFilters: true,
   
  },
];
