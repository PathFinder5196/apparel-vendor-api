import fs from "fs";
import path from "path";
import { Apparel } from "../types/types";

export class DataService {
  private readonly filePath: string;
  private data: Apparel[];

  constructor() {
    this.filePath = path.join(__dirname, "../../data/inventory.json");
    this.data = [];
    this.initializeData();
  }

  private initializeData(): void {
    try {
      if (!fs.existsSync(this.filePath)) {
        fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
        fs.writeFileSync(this.filePath, JSON.stringify([]));
      }
      const fileContent = fs.readFileSync(this.filePath, "utf-8");
      this.data = JSON.parse(fileContent);
    } catch (error) {
      this.data = [];
      console.error("Error initializing data:", error);
    }
  }

  private saveData(): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error("Error saving data:", error);
      throw new Error("Failed to save data");
    }
  }

  public getData(): Apparel[] {
    return this.data;
  }

  public updateStock(
    code: string,
    size: string,
    quantity: number,
    price: number
  ): void {
    let apparel = this.data.find((a) => a.code === code);

    if (!apparel) {
      apparel = { code, stocks: [] };
      this.data.push(apparel);
    }

    const stockItem = apparel.stocks.find((s) => s.size === size);
    if (stockItem) {
      stockItem.quantity = quantity;
      stockItem.price = price;
    } else {
      apparel.stocks.push({ size, quantity, price });
    }

    this.saveData();
  }
}
