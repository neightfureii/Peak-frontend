import { CreateButton } from "@/components/refine-ui/buttons/create"
import { ShowButton } from "@/components/refine-ui/buttons/show"
import { DataTable } from "@/components/refine-ui/data-table/data-table"
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import { ListView } from "@/components/refine-ui/views/list-view"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SPORTS_CATEGORIES_OPTIONS } from "@/constants"
import { Sport } from "@/types"
import { useTable } from "@refinedev/react-table"
import { ColumnDef } from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useMemo, useState } from "react"

const SportsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categoryFilter = selectedCategory === "all" ? [] : [
    { field: 'categoryId', operator: 'eq' as const, value: selectedCategory }
  ];
  const searchFilter = searchQuery ? [
    { field: 'name', operator: 'contains' as const, value: searchQuery }
  ] : [];

  const sportsTable = useTable<Sport>({
    columns: useMemo<ColumnDef<Sport>[]>(() => [
      {
        id: 'code',
        accessorKey: 'code',
        size: 100,
        header: () => <p className="column-title ml-2">Code</p>,
        cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>
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
        id: 'category',
        accessorKey: 'sports_category.name',
        size: 150,
        header: () => <p className="column-title">Category</p>,
        cell: ({ getValue }) => <Badge variant='secondary'>{getValue<string>()}</Badge>
      },
      {
        id: 'description',
        accessorKey: 'description',
        size: 300,
        header: () => <p className="column-title">Description</p>,
        cell: ({ getValue }) => <span className="truncate line-clamp-2">{getValue<string>()}</span>,
        filterFn: 'includesString'
      },
      {
        id: 'details',
        size: 140,
        header: () => <p className="column-title">Details</p>,
        cell: ({ row }) => <ShowButton resource="sports" recordItemId={row.original.id} variant="outline" size="sm">View</ShowButton>
      },
    ], []),
    refineCoreProps: {
      resource: "sports",
      pagination: {
        pageSize: 10,
        mode: "server",
      },
      filters: {
        permanent: [...categoryFilter, ...searchFilter],
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

      <h1 className="page-title">Sports</h1>

      <div className="intro-row">
        <p>List of sports</p>

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
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {SPORTS_CATEGORIES_OPTIONS.map((option) => {
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

      <DataTable table={sportsTable} />
    </ListView>
  )
}

export default SportsList