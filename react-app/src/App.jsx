import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=40.4862&longitude=-74.4518&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation&timezone=America%2FNew_York&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch"
    )
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error("Error fetching weather data:", error));
  }, [setWeather]);

  const handleSubmit = () => {

    const newItem = {
      id: Date.now(),
      name: itemName,
      quantity: quantity,
      category: category
    }

    setItems([...items, newItem]);

    console.log("item added!");
    setItemName("");
    setQuantity("");
    setCategory("");
    setShowForm(false);
  };

if (showForm) {
    return (
      <div className="form-page">
        <h1>Add New Item</h1>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="itemName">Item Name:</label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g., Milk, Eggs, Bread"
            />
          </div>
        
        <div className = "form-group">
          <label htmlFor = "quantity">quantity:</label>
          <input
            type = "number"
            id = "quantity"
            value = {quantity}
            onChange = {(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className = "form-group">
          <label htmlFor = "category">category: </label>
          <input
            type = "text"
            id = "category"
            value = {category}
            onChange = {(e) => setCategory(e.target.value)}
          />
        </div>

        <div className = "form-buttons">
            <button onClick = {handleSubmit}>add item!</button>
            <button onClick = {() => setShowForm(false)}>cancel</button>
        </div>
      </div>
    </div>
    );
}


  return (
    <div>
      <h1>stock'd</h1>
      <p>your handy pantry tracker app!</p>
      <button id = "add-item" onClick = {() => setShowForm(true)}>add your first item</button>
      
      <section id = "pantry">
        <div id = "shelf"> {/* holds all items */}
          <h3>my shelf</h3>
          <ul>
            {items.map((item) => (
              <li key = {item.id}>
                  <strong>{item.name}</strong> - Quantity: {item.quantity} - Category: {item.category}
              </li>
            ))}
          </ul>
        </div>
        <div id = "actions"> {/* for deleting items, finding facts, etc */}
          <h3>what would you like to do?</h3>
        </div>
        <div id = "facts"> {/* uses api for nutrition facts*/}
          <h3>loading...</h3>
        </div>
      </section>

    </div>
  );
}

export default App;