import axios from "axios";

export default class ProductService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5000/api",
    });
  }

  getAllProducts = () => this.api.get("/getAllProducts");
  getOneProduct = (id) => this.api.get(`/getOneProduct/${id}`);
  deleteProduct = (id) => this.api.put(`/deleteProduct/${id}`);
  newProduct = (product) => this.api.post("/newProduct", product);
  getCategory = (category, product) =>
    this.api.get(`/category/${category}`, product);
  editProduct = (id, product) => this.api.put(`/editProduct/${id}`, product);
  fav = (user_id, product_id) => this.api.put(`/fav/${user_id}`, product_id);
  unfav = (user_id, product_id) =>
    this.api.put(`/unfav/${user_id}`, product_id);
}
