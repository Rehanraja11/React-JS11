import React from 'react'
import NaavBaar from './Header/NaavBaar'

const Membership = () => {

  const Card=()=> {
    return(
    <div style={styles.card}>
        <h3>Member Details</h3>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Plan:</strong> Premium</p>
        <p><strong>Member Code:</strong> GYM-1234-5678</p>
        <p><strong>Join Date:</strong> 01/04/2026</p>
      </div>
    )
  }
   return (
    <>
    <NaavBaar/>
    <div style={styles.container}>
      
          <section id="programs" className="py-20 bg-gray-900 text-center">
          <h3 className="text-4xl font-bold mb-14">🏋️ Gym Membership</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 md:px-16">
            <div className="p-8 bg-gray-800 rounded-2xl shadow-md hover:shadow-red-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
              <h4 className="text-xl font-semibold mb-2">🏋️ Silver</h4>
              <p className="text-gray-400 text-sm">
                Build strength and muscle with expert-designed routines.
              </p>
            </div>
            <div className="p-8 bg-gray-800 rounded-2xl shadow-md hover:shadow-red-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
              <h4 className="text-xl font-semibold mb-2">🏃 Gold</h4>
              <p className="text-gray-400 text-sm">
                Boost stamina and burn calories with intense sessions.
              </p>
            </div>
            <div className="p-8 bg-gray-800 rounded-2xl shadow-md hover:shadow-red-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
              <h4 className="text-xl font-semibold mb-2">🧘 Elit</h4>
              <p className="text-gray-400 text-sm">
                Improve flexibility and mental peace with guided yoga.
              </p>
            </div>

          </div>
        </section>
  
    </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
    
  },
  card: {
    marginTop: "20px",
    padding: "20px",
    border: "2px solid #333",
    borderRadius: "10px",
    color:"black",
    backgroundColor: "#f4f4f4",
  },
};


export default Membership


