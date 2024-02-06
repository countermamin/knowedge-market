import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
    {
        line_items: Object,
        name: String,
        city: String,
        country: String,
        phoneNumber: String,
        address: String,
        zipCode: String,
        email: String,
        paid: Boolean,
    },
    {
        timestamps: true,
    }
);

export const Order = models?.Order || model("Order", OrderSchema);
