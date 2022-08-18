import React from "react";
import { AdminContext } from "../context/AdminProvider";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button } from "@mui/material";

function EditePage() {
  const { getEditKnitProduct, savedEditedProduct, toSaveEditedKnitProduct } =
    React.useContext(AdminContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [barcode, setBarcode] = React.useState("");
  const [size, setSize] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [photo, setPhoto] = React.useState("");

  const handleSubmit = () => {
    const editedKnitProduct = {
      name,
      barcode,
      size,
      price,
      photo,
      id,
    };
    console.log(editedKnitProduct);
    for (let i in editedKnitProduct) {
      if (typeof editedKnitProduct[i] === "string") {
        if (!editedKnitProduct[i].trim()) {
          alert("Заполните все поля!");
          return;
        }
      }
    }
    toSaveEditedKnitProduct(editedKnitProduct);
    navigate("/admin");
  };

  React.useEffect(() => {
    getEditKnitProduct(id);
  }, []);

  React.useEffect(() => {
    if (savedEditedProduct) {
      setName(savedEditedProduct.name);
      setBarcode(savedEditedProduct.barcode);
      setSize(savedEditedProduct.size);
      setPrice(savedEditedProduct.price);
      setPhoto(savedEditedProduct.photo);
    }
  }, [savedEditedProduct]);

  return (
    <div className="edit-products-page">
      <Container>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Наименование"
            variant="standard"
          />
          <TextField
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            label="Артикул"
            variant="standard"
          />
          <TextField
            value={size}
            onChange={(e) => setSize(e.target.value)}
            type="number"
            label=""
            variant="standard"
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            type="number"
            label="Цена"
            variant="standard"
          />
          <TextField
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            label="Картинка"
            variant="standard"
          />

          <Button variant="contained" type="submit">
            Сохранить изменения
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default EditePage;
