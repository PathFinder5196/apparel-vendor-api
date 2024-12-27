import { Request, Response } from "express";
import { DataService } from "../services/dataService";
import { UpdateStockRequest, Order, OrderItem } from "../types/types";

export class ApparelController {
  private readonly dataService: DataService;

  constructor() {
    this.dataService = new DataService();
  }

  public getAllApparel = (req: Request, res: Response): void => {
    try {
      const apparels = this.dataService.getData();
      res.status(200).json(apparels);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve apparel data" });
    }
  };

  public updateSingleStock = (req: Request, res: Response): void => {
    try {
      const { code, size, quantity, price } = req.body as UpdateStockRequest;
      this.dataService.updateStock(code, size, quantity, price);
      res.status(200).json({ message: "Stock updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update stock" });
    }
  };

  public updateBulkStock = (req: Request, res: Response): void => {
    try {
      const updates = req.body as UpdateStockRequest[];
      updates.forEach((update) => {
        this.dataService.updateStock(
          update.code,
          update.size,
          update.quantity,
          update.price
        );
      });
      res.status(200).json({ message: "Bulk stock update successful" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update stocks" });
    }
  };

  public checkOrderFulfillment = (req: Request, res: Response): void => {
    try {
      const order = req.body as Order;
      const inventory = this.dataService.getData();
      const unfulfillableItems: OrderItem[] = [];

      order.items.forEach((item) => {
        const apparel = inventory.find((a) => a.code === item.code);
        if (!apparel) {
          unfulfillableItems.push(item);
          return;
        }

        const stock = apparel.stocks.find((s) => s.size === item.size);
        if (!stock || stock.quantity < item.quantity) {
          unfulfillableItems.push(item);
        }
      });

      const canFulfill = unfulfillableItems.length === 0;
      res.status(200).json({
        canFulfill,
        unfulfillableItems:
          unfulfillableItems.length > 0 ? unfulfillableItems : undefined,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to check order fulfillment" });
    }
  };

  public calculateLowestCost = (req: Request, res: Response): void => {
    try {
      const order = req.body as Order;
      const inventory = this.dataService.getData();
      let totalCost = 0;
      const unfulfillableItems: OrderItem[] = [];

      order.items.forEach((item) => {
        const apparel = inventory.find((a) => a.code === item.code);
        if (!apparel) {
          unfulfillableItems.push(item);
          return;
        }

        const stock = apparel.stocks.find((s) => s.size === item.size);
        if (!stock || stock.quantity < item.quantity) {
          unfulfillableItems.push(item);
          return;
        }

        totalCost += stock.price * item.quantity;
      });

      if (unfulfillableItems.length > 0) {
        res.status(200).json({
          canFulfill: false,
          unfulfillableItems,
        });
      } else {
        res.status(200).json({
          canFulfill: true,
          totalCost,
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to calculate order cost" });
    }
  };
}
