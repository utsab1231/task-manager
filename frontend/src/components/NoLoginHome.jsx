
import { Link } from "react-router-dom";
function NoLoginHome() {
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
      }}
    >
      <div>
        <h1 className="text-9xl font-bold text-black mb-6">Task Manager</h1>

        <p className="text-gray-600 text-2xl mb-10 ml-6">
          The easy way to organize your life.
        </p>

        <Link to="/register">
          <button className="bg-purple-500 px-6 py-3 rounded-md text-xl text-white hover:shadow-lg hover:bg-purple-700 hover:scale-[1.2] transition-transform duration-700">
            Create Account
          </button>
        </Link>
        <p className="text-xl p-3 mt-10">
          Already have an account ?
          <Link to="/login">
            <button className="font-bold px-2 hover:scale-[1.2] hover:underline">
              Login
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default NoLoginHome;
