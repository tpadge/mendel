import './App.css';
import React, {useEffect, useState} from 'react';

function App() {

  //** FETCH DATA ON PAGE LOAD **//
  const url = 'https://randomuser.me/api/?results=20';

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setResponse(json.results);
    } catch (error) {
      console.log(error, 'error')
    }
  }

  // ** FLATTEN DATA ** //
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
      } 
      else {
        var isEmpty = true;
        for (var p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? p : p);
        }
        if (isEmpty && prop)
          result[prop] = {};
      }
    }
    recurse(data, "");
    return result;
  }
  // ** STORE FLATTENED DATA IN ARRAY ** //
  const flattenedObject = (arr, level) => {
    let flat = []
    for (let i = 0; i < arr.length; i++) {
      flat.push(flatten(arr[i][level])) 
    }
    return flat;
  }
  // ** RENDER HEADERS, SET SORT VARIABLE ON CLICK ** //
  const renderTableHeaders = (arr) => {
      return (
        <tr>
          {Object.keys(arr[0]).map((title, i) => {
            return (
              <td><button key={i} onClick={() => setSorter(title)}>
                Sort By: {title}
              </button></td>
            )
          })}
        </tr>
      )
  }
  // ** RENDER TABLE DATA TO BE SORTED ** //
  const renderSortedTable = (arr) => {
    return arr.map((location, i) => {
      return (
        <tr key={i}>
          <td>{location.number}</td>
          <td>{location.name}</td>
          <td>{location.city}</td>
          <td>{location.state}</td>
          <td>{location.country}</td>
          <td>{location.postcode}</td>
          <td>{location.latitude}</td>
          <td>{location.longitude}</td>
          <td>{location.offset}</td>
          <td>{location.description}</td>
        </tr>
      )
    })
  }

  const [response, setResponse] = useState([])
  const [sorter, setSorter] = useState('number')
  const data = flattenedObject(response, 'location')
  // ** UPDATE PAGE ON EACH SORT VARIABLE CHANGE ** //
  useEffect(() => {
  }, [sorter])
  // ** RENDER FULL TABLE SORTED VIA SORTER STATE VARIABLE ** //
  return (
    <div className="App">
      <table>
        {renderTableHeaders(data)}
        <tbody>
          {renderSortedTable(data.sort(function (a, b) { return a[sorter] - b[sorter] }))}
          {console.log(sorter)}
        </tbody>
      </table>
    </div>
  );
}

export default App;
