import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setuserdata] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((respo) => setuserdata(respo.data));
  }, []);
  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
