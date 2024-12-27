import express from "express";
import apparelRoutes from "./routes/apparelRoutes";

const app = express();
app.use(express.json());
app.use("/api/apparel", apparelRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
