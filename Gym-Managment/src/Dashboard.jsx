import { useNavigate } from "react-router-dom";
import NaavBaar from "./Header/NaavBaar";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <NaavBaar />

      <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">

        <header className="py-40 px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold uppercase tracking-wide">
            Shaping the Best You
          </h2>

          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
            Join the elite fitness community and transform your body, mind, and lifestyle.
          </p>

          <button
            onClick={() => navigate("/membership")}
            className="mt-10 bg-red-500 hover:bg-red-600 transition-all duration-300 px-10 py-3 font-semibold rounded-full shadow-lg hover:scale-105"
          >
            Get Started 🚀
          </button>
        </header>
        <section id="programs" className="py-20 bg-gray-900 text-center">
          <h3 className="text-4xl font-bold mb-14">Our Programs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-16">
            <div className="p-8 bg-gray-800 rounded-2xl shadow-md hover:shadow-red-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
              <h4 className="text-xl font-semibold mb-2">🏋️ Weight Lifting</h4>
              <p className="text-gray-400 text-sm">
                Build strength and muscle with expert-designed routines.
              </p>
            </div>
            <div className="p-8 bg-gray-800 rounded-2xl shadow-md hover:shadow-red-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
              <h4 className="text-xl font-semibold mb-2">🏃 Cardio Training</h4>
              <p className="text-gray-400 text-sm">
                Boost stamina and burn calories with intense sessions.
              </p>
            </div>
            <div className="p-8 bg-gray-800 rounded-2xl shadow-md hover:shadow-red-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
              <h4 className="text-xl font-semibold mb-2">🧘 Yoga</h4>
              <p className="text-gray-400 text-sm">
                Improve flexibility and mental peace with guided yoga.
              </p>
            </div>

          </div>
        </section>

      </div>
      
    </>
  );
}

export default Dashboard;