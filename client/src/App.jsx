//tZtnlbpx9g9CX8kj
import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/ui/Navbar";
import Login from "./pages/login";
import Hero from "./pages/student/Hero";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";
import Courses from "./pages/student/Courses";
import Mylearning from "./pages/student/Mylearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture.jsx"
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";
import { AuthenticatedUser, ProtectedRoute } from "./components/ui/ProtectedRoute";
import PurchaseCourseProtectedRoute from "./components/ui/PurchasedCourseProtectedRoute";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import AIAssistant from "./components/ui/AIAssistant";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Hero />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: <AuthenticatedUser><Login /></AuthenticatedUser>
      },
      {
        path: "my-learning",
        element: <ProtectedRoute><Mylearning /></ProtectedRoute>
      },
      {
        path: "profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },
      {
        path: "course/search",
        element: <SearchPage />
      },
      {
        path: "course-detail/:courseId",
        element: <CourseDetail />
      },
      {
        path: "course-progress/:courseId",
        element: <ProtectedRoute>
          <PurchaseCourseProtectedRoute><CourseProgress /></PurchaseCourseProtectedRoute>
        </ProtectedRoute>
      },
      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "course",
            element: <CourseTable />
          },
          {
            path: "course/create",
            element: <AddCourse />
          },
          {
            path: "course/:courseId",
            element: <EditCourse />
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />
          }
        ]
      }
    ],
  },
]);

function App() {
  return (
    <main>
      <ThemeProvider>
        <AIAssistant/>
        <RouterProvider router={appRouter} />
      </ThemeProvider>

    </main>
  );
}

export default App;
