import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
  Button,
  Grid,
} from "@mui/material";
import {
  deleteProductById,
  fetchProducts,
} from "../../redux/fetures/Products/Products";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdOutlineVisibility } from "react-icons/md";
import { fetchUserData } from "../../redux/fetures/Auth/Auth";

const Products = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsState.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //product details
  const HandleShow = (e) => {
    Navigate("/products/details", { state: e });
  };

  //edit product
  const HandleAdd = (e) => {
    Navigate("/products/add", { state: e });
  };

  //edit product
  const HandleEdit = (e) => {
    Navigate("/products/edit", { state: e });
  };

  //delete product
  const HandleDelete = (productId) => {
    Swal.fire({
      title: "Do you want to Delete this Record?",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#DC3741",
      confirmButtonText: "Delete",
    }).then((result) => {

      if (result.isConfirmed === true) {
        dispatch(deleteProductById(productId))
          .then((res) => {
            if (res?.meta?.requestStatus === "fulfilled") {
              Swal.fire({
                title: "Deleted Successfully.",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <>
      <h1 style={{ marginTop: "5rem" }}>Sample Data</h1>
      <Paper>
      <Grid
        item
        xs={12}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          onClick={() => HandleAdd()}
          type="submit"
          color="primary"
          variant="contained"
        >
          Add Product
        </Button>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Sr. No.</strong>
            </TableCell>
            <TableCell>
              <strong>Product Name</strong>
            </TableCell>
            <TableCell>
              <strong>Price</strong>
            </TableCell>
            <TableCell>
              <strong>Category</strong>
            </TableCell>
            <TableCell>
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <IconButton onClick={() => HandleShow(product)}>
                  <MdOutlineVisibility />
                </IconButton>
                <IconButton onClick={() => HandleEdit(product)}>
                  <FiEdit />
                </IconButton>
                <IconButton onClick={() => HandleDelete(product.id)}>
                  <AiFillDelete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    </>

  );
};

export default Products;
