import React from "react";
import { AdminContext } from "../context/AdminProvider";
import { Container, TextField, Button, Stack } from "@mui/material";

function AddPage() {
  const { addNewProduct } = React.useContext(AdminContext);

  const [name, setName] = React.useState("");
  const [barcode, setBarcode] = React.useState("");
  const [size, setSize] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [photo, setPhoto] = React.useState("");

  const handleSubmit = () => {
    const newProduct = {
      name: name.trim(),
      barcode: barcode.trim(),
      size: size.trim(),
      price,
      photo: photo.trim(),
    };
    for (let i in newProduct) {
      if (!newProduct[i]) {
        alert("Заполните поля");
        return;
      }
    }
    addNewProduct(newProduct);
    setName("");
    setBarcode("");
    setSize("");
    setPrice("");
    setPhoto("");
  };
  return (
    <div className="add-new-product">
      <Container>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* input */}
          {/* каждлому инпуту создаем свой стейт: 
        2) обязательно в onChange добавить вторую функцию от стейта
        3) value передаем первый созданный стейт
         [name, setName] = useState() */}
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
            label="размер"
            variant="standard"
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            label="Стоимость"
            variant="standard"
            type="number"
          />
          <TextField
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            label="Фото"
            variant="standard"
          />

          <Stack direction="row" spacing={2}>
            <Button variant="contained" type="submit">
              Добавить товар
            </Button>
          </Stack>
        </form>
      </Container>
    </div>
  );
}

export default AddPage;
