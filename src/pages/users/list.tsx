import { CreateButton } from "@/components/refine-ui/buttons/create"
import { ShowButton } from "@/components/refine-ui/buttons/show"
import { DataTable } from "@/components/refine-ui/data-table/data-table"
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import { ListView } from "@/components/refine-ui/views/list-view"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ROLES } from "@/constants"
import { userListPhoto } from "@/lib/cloudinary"
import { User } from "@/types"
import { AdvancedImage } from "@cloudinary/react"
import { useTable } from "@refinedev/react-table"
import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useMemo, useState } from "react"

const UsersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const roleFilter = selectedRole === "all" ? [] : [
    { field: 'roleId', operator: 'eq' as const, value: selectedRole }
  ];
  const searchFilter = searchQuery ? [
    { field: 'name', operator: 'contains' as const, value: searchQuery }
  ] : [];

  const usersTable = useTable<User>({
    columns: useMemo<ColumnDef<User>[]>(() => [
      {
        id: 'image',
        accessorKey: 'imageCldPubId',
        size: 100,
        header: () => <p className="column-title ml-2">Image</p>,
        cell: ({ getValue }) => <AdvancedImage alt="User Image" cldImg={userListPhoto(getValue<string>())} />
      },
      {
        id: 'name',
        accessorKey: 'name',
        size: 200,
        header: () => <p className="column-title">Name</p>,
        cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
        filterFn: 'includesString'
      },
      {
        id: 'role',
        accessorKey: 'role',
        size: 150,
        header: () => <p className="column-title">Role</p>,
        cell: ({ getValue }) => <Badge variant='secondary'>{getValue<string>()}</Badge>
      },
      {
        id: 'email',
        accessorKey: 'email',
        size: 200,
        header: () => <p className="column-title">Email</p>,
        cell: ({ getValue }) => <span className="truncate line-clamp-2">{getValue<string>()}</span>,
        filterFn: 'includesString'
      },
      {
        id: 'details',
        size: 150,
        header: () => <p className="column-title">Details</p>,
        cell: ({ row }) => <ShowButton resource="users" recordItemId={row.original.id} variant="outline" size="sm">View</ShowButton>
      },
    ], []),
    refineCoreProps: {
      resource: "users",
      pagination: {
        pageSize: 10,
        mode: "server",
      },
      filters: {
        permanent: [...roleFilter, ...searchFilter],
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

      <h1 className="page-title">Users</h1>

      <div className="intro-row">
        <p>List of users</p>

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
            <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {ROLES.map((option) => {
                  return (
                    <SelectItem key={option.id} value={option.value}>
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

      <DataTable table={usersTable} />
    </ListView>
  )
}

export default UsersList