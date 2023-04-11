import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TABLE_NAMES from "../constants/constants";


const useData = (tableName) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [runtime, setRuntime] = useState("");

  const objectToCsv = (data) => {
     
    const csvRows = [];
 
    /* Get headers as every csv data format
    has header (head means column name)
    so objects key is nothing but column name
    for csv data using Object.key() function.
    We fetch key of object as column name for
    csv */
    const headers = Object.keys(data[0]);
 
    /* Using push() method we push fetched
       data into csvRows[] array */
    csvRows.push(Object.assign({},headers));
 
    // Loop to get value of each objects key
    for (const row of data) {
        const values = headers.map(header => {
            const val = row[header]
            return `${val}`;
        });
 
        // To add, separator between each value
        csvRows.push(Object.assign({},values));
    }
 
    /* To add new line for each objects values
       and this return statement array csvRows
       to this function.*/

    setData(csvRows);
    //return csvRows;
  };


  useEffect(() => {
    const fetchData = (tableName) => {
      setData([]);
      const name = TABLE_NAMES.find((name) => name === tableName);
      if (name) {
        setError(false);
        
        fetch(`http://localhost:5000/${name}`, {
          method: 'GET',
          mode: 'cors',
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Something went wrong");
            }
          })
          .then((data) => objectToCsv(JSON.parse(data)))
          .catch((error) => {
            toast.error(error.message);
          });
      } else {
        setError(true);
        toast.error("Please enter a valid query");
      }
    };
    let t0 = performance.now(); //start time
    fetchData(tableName);
    let t1 = performance.now(); //end time
    setRuntime(t1 - t0);
  }, [tableName]);

  return { data, runtime, error };
};

export default useData;
