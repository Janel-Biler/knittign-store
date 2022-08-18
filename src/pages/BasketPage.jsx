import React from "react";

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
} from "@mui/material";
import { UserContext } from "../context/UserProvider";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

function BasketPage() {
  const {
    basketKnitProducts,
    getKnitProductsFromBasket,
    deleteKnitProductsFromBasket,
  } = React.useContext(UserContext);

  React.useEffect(() => {
    getKnitProductsFromBasket();
  }, []);

  return (
    <div>
      <Container>
        <h2>Корзина</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Наименование</TableCell>
              <TableCell>Фото</TableCell>
              <TableCell>Стоимость</TableCell>
              <TableCell>Количество</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basketKnitProducts.products.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <img width={60} src={item.photo} alt="" />
                </TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.count}</TableCell>

                <TableCell>{item.subPrice}</TableCell>
                <TableCell>
                  <HighlightOffRoundedIcon
                    onClick={() => {
                      deleteKnitProductsFromBasket(item.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Итоговая сумма:</TableCell>
              <TableCell colSpan={1}>{basketKnitProducts.totalPrice}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    </div>
  );
}

export default BasketPage;
