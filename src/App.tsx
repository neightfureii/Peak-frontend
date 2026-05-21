import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data";
import Dashboard from "./pages/dashboard";
import { Building2, CalendarCheck, ClipboardList, Dumbbell, GraduationCap, Home, Users } from "lucide-react";
import { Layout } from "./components/refine-ui/layout/layout";
import SportsList from "./pages/sports/list";
import SportsCreate from "./pages/sports/create";
import StudentsList from "./pages/students/list";
import StudentsCreate from "./pages/students/create";
import ReservationsList from "./pages/reservations/list";
import ReservationsCreate from "./pages/reservations/create";
import FacilitiesList from "./pages/facilities/list";
import FacilitiesCreate from "./pages/facilities/create";
import InventoryList from "./pages/inventory/list";
import InventoryCreate from "./pages/inventory/create";
import { CustomLogo, CustomTitle } from "./components/refine-ui/layout/custom-title";
import SportsShow from "./pages/sports/show";
import UsersList from "./pages/users/list";
import UsersCreate from "./pages/users/create";
import UsersShow from "./pages/users/show";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "Z8lnJj-wA9psE-Yb8ZAG",
                title: {
                  text: <CustomTitle />,
                  icon: <CustomLogo />,
                },
              }}
              resources={[
                {
                  name: 'dashboard',
                  list: '/',
                  meta: { label: 'Home', icon: <Home /> },
                },
                {
                  name: 'users',
                  list: '/users',
                  create: '/users/create',
                  show: '/users/show/:id',
                  meta: { label: 'Users', icon: <Users /> },
                },
                {
                  name: 'sports',
                  list: '/sports',
                  create: '/sports/create',
                  show: '/sports/show/:id',
                  meta: { label: 'Sports', icon: <Dumbbell /> },
                },
                {
                  name: 'students',
                  list: '/students',
                  create: '/students/create',
                  meta: { label: 'Students', icon: <GraduationCap /> },
                },
                {
                  name: 'reservations',
                  list: '/reservations',
                  create: '/reservations/create',
                  meta: { label: 'Reservations', icon: <CalendarCheck /> },
                },
                {
                  name: 'facilities',
                  list: '/facilities',
                  create: '/facilities/create',
                  meta: { label: 'Facilities', icon: <Building2 /> },
                },
                {
                  name: 'inventory',
                  list: '/inventory',
                  create: '/inventory/create',
                  meta: { label: 'Inventory', icon: <ClipboardList /> },
                }
              ]}
            >
              <Routes>
                <Route element={
                  <Layout>
                    <Outlet />
                  </Layout>
                } >
                  <Route path="/" element={<Dashboard />} />
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path="create" element={<UsersCreate />} />
                    <Route path="show/:id" element={<UsersShow />} />
                  </Route>
                  <Route path="sports">
                    <Route index element={<SportsList />} />
                    <Route path="create" element={<SportsCreate />} />
                    <Route path="show/:id" element={<SportsShow />} />
                  </Route>
                  <Route path="students">
                    <Route index element={<StudentsList />} />
                    <Route path="create" element={<StudentsCreate />} />
                  </Route>
                  <Route path="reservations">
                    <Route index element={<ReservationsList />} />
                    <Route path="create" element={<ReservationsCreate />} />
                  </Route>
                  <Route path="facilities">
                    <Route index element={<FacilitiesList />} />
                    <Route path="create" element={<FacilitiesCreate />} />
                  </Route>
                  <Route path="inventory">
                    <Route index element={<InventoryList />} />
                    <Route path="create" element={<InventoryCreate />} />
                  </Route>
                </Route>
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
