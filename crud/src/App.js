import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios';

function App() {

//  STATES 

// FOR STORING INITIAL VALUES DURING CREATE OPERATION 
  const [item, setItem] = useState({
    title: '',
    description: '',
  })

// FOR SHOWING VALUES THROUGH MAP FUNCTION 
  const [items, setItems] = useState([
    {
      title: '',
      description: '',
      _id: '',
    },
  ]);

// FOR SWITCHING FROM CREATE TO UPDATE AND VICE-VERSA
  const [isPut, setIsPut] = useState(false)

// FOR STORING VALUES OF UPDATES
  const [updatedItem, setUpdatedItem] = useState({
    title: "",
    description: "",
    id: "",
  });

// USE EFFECT 
// FOR READING AND SHOWS IN FRONTEND
  useEffect(() => {
    fetch('/items')
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((jsonRes) => setItems(jsonRes))
      .catch((err) => console.log(err))
  }, [items])


// HANDLE CHANGE (CREATING) 

  function handleChange(event) {
    const { name, value } = event.target;
    setItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });

  }

  function addItem(event) {
    event.preventDefault();
    const newItem = {
      title: item.title,
      description: item.description,
    };


  // AXIOS POST REQUEST TO CREATE
    axios.post("newItem", newItem);
    alert("item added")
    console.log("item added")

    setItem({
      title: "",
      description: "",
    })
  }

// DELETING FUNCTION 

  function deleteItem(id) {

     // AXIOS DELETE REQUEST TO DELETE
    axios.delete('/delete/' + id);
    alert("item deleted")
    console.log(`Item deleted with ID : ${id}`)

  }

// UPDATE FUNCTION 

  function openUpdate(id) {
    setIsPut(true)
    setUpdatedItem((prevInput) =>{
      return {
        ...prevInput, 
        id: id ,
      }
    })

  }

  
  
  function handleUpdate(event){
    const {name, value} = event.target ;
    setUpdatedItem((prevInput)=>{
      return{
        ...prevInput,
        [name] : value ,
      }
    })
  }


  function updateItem(id){

     // AXIOS PUT REQUEST TO UPDATE
    axios.put('/put/'+id , updatedItem);
    alert("item updated");
    console.log(`item with ID ${id} updated`)
    setIsPut(false)
  }

  return (
    <div className="app">

          <h1>MERN CRUD Operations</h1>

        {/* LOGIC FOR SWITCHING BETWEEN CREATE AND UPDATE  */}

      {!isPut ? (
        <div className="main" >
        <input onChange={handleChange} placeholder="title" name="title" value={item.title} />
        <input onChange={handleChange} placeholder="description" name="description" value={item.description} />
        <button onClick={addItem} >Submit</button>
      </div>
      ) : (
        <div className="main" >
        <input onChange={handleUpdate} placeholder="title" name="title" value={updatedItem.title} />
        <input onChange={handleUpdate} placeholder="description" name="description" value={updatedItem.description} />
        <button onClick={()=>updateItem(updatedItem.id)} >Update</button>
      </div>
      )}

{/* MAPPING VALUES TO SHOW IN FRONTEND  */}

      {items.map((item) => {
        return (
          <div key={item._id} className="item">
            <div className="item__details">

              <p>{item.title}</p>
              <p>{item.description}</p>

            </div>

            <div className="item__buttons">

              <button onClick={() => openUpdate(item._id)} >Update</button>
              <button onClick={() => deleteItem(item._id)} >Delete</button>

            </div>

          </div>
        )
      })}

    </div>

  );
}

export default App;
