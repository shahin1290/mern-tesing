import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ProductDocument } from "../../app/redux/interfaces/Product";

interface Props {
  product: ProductDocument;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.title.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.title}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "primary.light",
        }}
        image=""
        title={product.title}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          ${(2000 / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          brand
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
        <Button component={Link} to={`/catalog/${product._id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
