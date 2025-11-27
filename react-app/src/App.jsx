import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=40.4862&longitude=-74.4518&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation&timezone=America%2FNew_York&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch"
    )
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error("Error fetching weather data:", error));
  }, [setWeather]);

  const handleSelect = (item) => {
    setSelectedItem(item);
  }

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
              <li 
                key = {item.id}
                onClick = {() => handleSelect(item)}
                className = {selectedItem?.id === item.id ? "selected" : ""}
                style = {{ cursor : "pointer"}}
                >
                  <strong>{item.name}</strong> - Quantity: {item.quantity} - Category: {item.category}
              </li>
            ))}
          </ul>
        </div>
<div id="actions">
  <h3>what would you like to do?</h3>

  {selectedItem ? (
    <div className="action-panel">


      <div className="quantity-editor">
        <p>edit quantity</p>
        <button
          onClick={() => {
            const updated = items.map((i) =>
              i.id === selectedItem.id
                ? { ...i, quantity: Number(i.quantity) - 1 }
                : i
            );
            setItems(updated);

            // update selectedItem reference
            setSelectedItem({
              ...selectedItem,
              quantity: Number(selectedItem.quantity) - 1,
            });
          }}
        >
          –
        </button>

        <input
          type="number"
          value={selectedItem.quantity}
          onChange={(e) => {
            const updated = items.map((i) =>
              i.id === selectedItem.id
                ? { ...i, quantity: e.target.value }
                : i
            );
            setItems(updated);

            setSelectedItem({
              ...selectedItem,
              quantity: e.target.value,
            });
          }}
          style={{ width: "60px", textAlign: "center" }}
        />

        <button
          onClick={() => {
            const updated = items.map((i) =>
              i.id === selectedItem.id
                ? { ...i, quantity: Number(i.quantity) + 1 }
                : i
            );
            setItems(updated);

            setSelectedItem({
              ...selectedItem,
              quantity: Number(selectedItem.quantity) + 1,
            });
          }}
        >
          +
        </button>
      </div>

      <button
        onClick={() => {
          setItems(items.filter((i) => i.id !== selectedItem.id));
          setSelectedItem(null);
        }}
      >
        delete this item
      </button>
    </div>
  ) : (
    <p className="no-selection">select an item from the shelf</p>
  )}
</div>


        <div id = "facts"> {/* uses api for nutrition facts*/}
          <h3>loading...</h3>
        </div>
      </section>

    </div>
  );
}

export default App;