import React, { useContext, createContext, useState } from "react";


const UserContext = createContext();

const App = () => {
  const [user, userHandler] = useState("");


  return (
    <UserContext.Provider value={{ user, userHandler }}>
      <h1>Hey Context API</h1>
      <Component1 />
    </UserContext.Provider>
  );
};


export default App;

const Component1 = () => (
  <div>
    <p>Hey Rehann Component1</p>
    <Component2 />
  </div>
);

const Component2 = () => (
  <div>
    <p>Hey Rehann Component2</p>
    <Component3 />
  </div>
);

const Component3 = () => {
 
  return(
  <div>
    <p>Hey Rehann Component3</p>
      <Component4 />
  </div>
  )
  
};

const Component4 = () => (
  <div>
    <p>Hey Rehann Component4</p>
    <Component5 />
  </div>
);

const Component5 = () => {
  
  const { user, userHandler } = useContext(UserContext);

  return (
    <div>
      <p>Hey Rehann Component5 <span style={{background:"yellow", borderRadius:5, padding:5, color:"black"}}>{user}</span></p>
      <input 
      type="text"
      value={user}
      onChange={(e)=>userHandler(e.target.value)}
      />
      
    </div>
  );
};
