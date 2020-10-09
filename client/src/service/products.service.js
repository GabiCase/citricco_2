import axios from "axios";

export default class ProductService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5000/api",
    });
  }

  getAllProducts = () => this.api.get("/getAllProducts");
  getOneProduct = (id) => this.api.get(`/getOneProduct/${id}`);
  newProduct = (product) => this.api.post("/newProduct", product);
  editProduct = (id, product) => this.api.put(`/editProduct/${id}`, product);
  wishlist = (user_id, product_id) =>
    this.api.put(`/wishlist/${user_id}`, product_id);
}
