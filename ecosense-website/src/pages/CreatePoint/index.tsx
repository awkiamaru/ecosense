import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";

import logo from "../../assets/logo.svg";
import "./style.css";
import { Link } from "react-router-dom";
import { Map, Marker, TileLayer } from "react-leaflet";
import api from "../../services/api";
import axios from "axios";
import { LeafletMouseEvent } from "leaflet";

interface Item {
  itemId: number;
  title: string;
  image: string;
}

interface UFIBGEResponse {
  sigla: string;
}

interface CityIBGEResponse {
  nome: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCityNames] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get("items").then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<UFIBGEResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }
    axios
      .get<CityIBGEResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cityName = response.data.map((city) => city.nome);
        setCityNames(cityName);
      });
  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUf(event.target.value);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value);
  }

  function onHandleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSelectItem(itemId: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === itemId);

    if (alreadySelected >= 0) {
      const filteredItem = selectedItems.filter((item) => item !== itemId);
      setSelectedItems(filteredItem);
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log("SFASAS");

    const { name, email, contact } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;

    const data = {
      name,
      email,
      contact,
      uf,
      city,
      latitude,
      longitude,
      items,
    };

    console.log(data);

    await api.post("points", data);
  }
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="" />
        <Link to="/">Return home</Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Collect point register</h1>
        <fieldset>
          <legend>
            <h2>Personal data</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Entity name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="contact">Contact</label>
              <input
                type="text"
                name="contact"
                id="contact"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Select address in map</span>
          </legend>

          <Map center={initialPosition} zoom={15} onClick={onHandleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition}></Marker>
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">UF</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectUf}
              >
                <option value="0">Select UF</option>
                {ufs.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}
              >
                <option value="0">Select city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Collect items</h2>
            <span>Select one or more items</span>
          </legend>

          <ul className="items-grid">
            {items.map((item: Item) => {
              return (
                <li
                  key={item.itemId}
                  onClick={() => handleSelectItem(item.itemId)}
                  className={
                    selectedItems.includes(item.itemId) ? "selected" : ""
                  }
                >
                  <img src={item.image} alt={item.title} />
                  <span>{item.title}</span>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CreatePoint;
