import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';

function App() {

  const url = 'https://randomuser.me/api/?results=20';

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setResponse(json.results);
      //console.log(response)
      //console.log(json.results) //results
      //console.log(flatten(json.results[0].location)) //flattened
    } catch (error) {
      console.log(error, 'error')
    }
  }

  const flatten = (data) => {
    var result = {};
    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        for (var i = 0, l = cur.length; i < l; i++)
          recurse(cur[i], prop + "[" + i + "]");
        if (l == 0)
          result[prop] = [];
      } else {
        var isEmpty = true;
        for (var p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? prop + "." + p : p);
        }
        if (isEmpty && prop)
          result[prop] = {};
      }
    }
    recurse(data, "");
    return result;
  }

  const flattenedObject = (arr, level) => {
    let flat = []
    for (let i = 0; i < arr.length; i++) {
      flat.push(flatten(arr[i][level])) 
    }
    return flat;
  }

  const [response, setResponse] = useState([])
  const data = flattenedObject(response, 'location')

  return (
    <div className="App">
      {console.log(data)}
    </div>
  );
}

export default App;
