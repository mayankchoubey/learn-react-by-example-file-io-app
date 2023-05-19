import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Upload from "./components/Upload";
import Download from "./components/Download";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Upload />,
  },
  {
    path: "/:fileId",
    element: <DownloadHandler />,
  },
]);

function DownloadHandler() {
  let { fileId } = useParams();
  return <Download fileId={fileId} />;
}

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
