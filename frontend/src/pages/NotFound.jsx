import { Link } from "react-router-dom";
import { Button } from "../components/ui/button"; // Assuming you are using ShadCN UI components

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 border-x-2">
      <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button className="bg-blue-600 hover:bg-blue-400 text-white px-6 py-3 rounded-lg">
          Go to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
