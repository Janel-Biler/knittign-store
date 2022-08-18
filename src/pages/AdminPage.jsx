import React from "react";
import { AdminContext } from "../context/AdminProvider";
import { Link } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function AdminPage() {
  const { getKnitProducts, knitProducts, deleteKnitProduct } =
    React.useContext(AdminContext);

  React.useEffect(() => {
    getKnitProducts();
  }, []);

  return (
    <div className="admin-page">
      <Container>
        <Link className="add-new-product-link" to="/admin/add">
          + Добавить новый товар
        </Link>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Наименование</TableCell>
              <TableCell>Артикул</TableCell>
              <TableCell>Размер</TableCell>
              <TableCell>Стоимость</TableCell>
              <TableCell>Фото</TableCell>
              <TableCell>Редактировать</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {knitProducts.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.barcode}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <img width={150} src={item.photo} alt="" />
                </TableCell>
                <TableCell>
                  <Link to={`/admin/edit/${item.id}`}>
                    <EditIcon />
                  </Link>
                </TableCell>
                <TableCell>
                  <DeleteIcon onClick={() => deleteKnitProduct(item.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminPage;
