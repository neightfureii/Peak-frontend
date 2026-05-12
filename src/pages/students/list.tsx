import { CreateButton } from "@/components/refine-ui/buttons/create"
import { DataTable } from "@/components/refine-ui/data-table/data-table"
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import { ListView } from "@/components/refine-ui/views/list-view"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FACULTIES_OPTIONS } from "@/constants"
import { Student } from "@/types"
import { useTable } from "@refinedev/react-table"
import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useMemo, useState } from "react"

const StudentsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("all");

  const facultyFilter = selectedFaculty === "all" ? [] : [
    { field: 'faculty', operator: 'eq' as const, value: selectedFaculty }
  ];
  const searchFilter = searchQuery ? [
    { field: 'name', operator: 'contains' as const, value: searchQuery }
  ] : [];

  const studentsTable = useTable<Student>({
    columns: useMemo<ColumnDef<Student>[]>(() => [
      {
        id: 'registration_number',
        accessorKey: 'registrationNumber',
        size: 100,
        header: () => <p className="column-title ml-2">Code</p>,
        cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>
      },
      {
        id: 'name',
        accessorKey: 'users.name',
        size: 200,
        header: () => <p className="column-title">Name</p>,
        cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
        filterFn: 'includesString'
      },
      {
        id: 'faculty',
        accessorKey: 'faculty',
        size: 150,
        header: () => <p className="column-title">Faculty</p>,
        cell: ({ getValue }) => <Badge variant='secondary'>{getValue<string>()}</Badge>
      },
      {
        id: 'batch',
        accessorKey: 'batch',
        size: 300,
        header: () => <p className="column-title">Batch</p>,
        cell: ({ getValue }) => <span className="truncate line-clamp-2">{getValue<string>()}</span>,
        filterFn: 'includesString'
      },
    ], []),
    refineCoreProps: {
      resource: "students",
      pagination: {
        pageSize: 10,
        mode: "server",
      },
      filters: {
        permanent: [...facultyFilter, ...searchFilter],
      },
      sorters: {
        initial: [
          { field: 'id', order: 'desc' }
        ]
      },
    }
  });

  return (
    <ListView>
      <Breadcrumb />

      <h1 className="page-title">Students</h1>

      <div className="intro-row">
        <p>List of students</p>

        <div className="actions-row">
          <div className="search-field">
            <Search className="search-icon" />

            <Input
              type="text"
              placeholder="Search by name..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={selectedFaculty} onValueChange={(value) => setSelectedFaculty(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by faculty" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Faculties</SelectItem>
                {FACULTIES_OPTIONS.map((option) => {
                  return (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>

            <CreateButton />
          </div>
        </div>
      </div>

      <DataTable table={studentsTable} />
    </ListView>
  )
}

export default StudentsList