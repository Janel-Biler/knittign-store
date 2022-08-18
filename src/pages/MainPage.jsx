import React, { useContext } from "react";
import {
  Container,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Slider,
  Pagination,
} from "@mui/material";
import { UserContext } from "../context/UserProvider";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { AdminContext } from "../context/AdminProvider";

function MainPage() {
  const {
    addKnitProductToBasket,
    filterByPrice,
    setFilterByPrice,
    pagesCount,
    currentPage,
    setCurrentPage,
    minmax,
    searchWord,
    getKnitProducts,
    knitProducts,
  } = useContext(UserContext);

  React.useEffect(() => {
    getKnitProducts();
  }, [searchWord, currentPage]);
  console.log(knitProducts);
  return (
    <div>
      <Container>
        <div className="main-page">
          <h2>Не губите жизнь бездельем, занимайтесь рукодельем</h2>
          <br />
          <h5>
            Этот сайт для умелых ручек и для тех кто хочет превратить
            увлечение/хобби нечто большее. Здесь вы можете созданные вами вещи
            выставить на продажу и найти людей с которыми у вас чего-то общего.
            Приветствуем всех желающих развивать свои способности вместе с нами.{" "}
          </h5>
        </div>

        <div className="filter-block">
          <h5>Сортировка по цене:</h5>
          <Slider
            max={minmax[1]}
            min={minmax[0]}
            valueLabelDisplay="auto"
            value={filterByPrice}
            onChange={(_, newValue) => setFilterByPrice(newValue)}
          />
        </div>
        <div className="products">
          {knitProducts.map((item) => (
            <Card key={item.id} className="products-card">
              <CardActionArea>
                <CardMedia component="img" height={140} image={item.photo} />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.price} сом
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <AddShoppingCartOutlinedIcon
                  onClick={() => addKnitProductToBasket(item)}
                  variant="outlined"
                />
              </CardActions>
            </Card>
          ))}
        </div>
        <div className="pagination">
          <Pagination
            onChange={(_, newValue) => setCurrentPage(newValue)}
            count={pagesCount}
            variant="outlined"
          />
        </div>
      </Container>
    </div>
  );
}

export default MainPage;
