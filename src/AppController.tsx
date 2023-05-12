import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import add from "date-fns/add";
import format from "date-fns/format";
import {reducer} from "./components/useReducer";
import CustomInput from "./components/CustomInput";
import CustomSelect from "./components/CustomSelect";
import dataList from "./data.json";

type FormValues = {
  senderAddress: {
    street: string;
    postal: string;
    city: string;
    country: string;
  };
  clientAddress: {
    street: string;
    postal: string;
    city: string;
    country: string;
  };
  clientName: string;
  clientEmail: string;
  createdAt: string;
  description: string;
  paymentTerms: any;
  paymentDue: string;
  items: ICosting[];
};

export interface ICosting {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

const AppController = () => {
  const invoice = dataList;
  const initialState: FormValues = {
    senderAddress: {
      street: invoice.senderAddress.street,
      postal: invoice.senderAddress.postCode,
      city: invoice.senderAddress.city,
      country: invoice.senderAddress.country,
    },
    clientAddress: {
      street: invoice.clientAddress.street,
      postal: invoice.clientAddress.postCode,
      city: invoice.clientAddress.city,
      country: invoice.clientAddress.country,
    },
    clientName: invoice.clientName,
    clientEmail: invoice.clientEmail,
    createdAt: format(new Date(invoice.createdAt), "yyyy-MM-dd"),
    description: invoice.description,
    paymentTerms: 1,
    paymentDue: format(new Date(invoice.paymentDue), "yyyy-MM-dd"),
    items: invoice.items,
  };

  const { control, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: initialState,
  });

  const payment = watch("paymentTerms");
  const itemsWatch = watch("items");
  //  console.log(payment)
   console.log(itemsWatch);

  useEffect(() => {
    // update the days when payment terms have been selected
    switch (payment) {
      case "1":
        setValue(
          "paymentDue",
          format(add(Date.now(), { days: 1 }), "yyyy-MM-dd")
        );
        break;
      case "6":
        setValue(
          "paymentDue",
          format(add(Date.now(), { days: 6 }), "yyyy-MM-dd")
        );
        break;
      case "7":
        setValue(
          "paymentDue",
          format(add(Date.now(), { days: 7 }), "yyyy-MM-dd")
        );
        break;
      case "14":
        setValue(
          "paymentDue",
          format(add(Date.now(), { days: 14 }), "yyyy-MM-dd")
        );
        break;
      default:
        setValue(
          "paymentDue",
          format(add(Date.now(), { days: 30 }), "yyyy-MM-dd")
        );
    }
    console.log(payment);
    console.log(invoice.paymentDue);
  }, [payment]);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Sender Details</legend>
        <CustomInput
          type="text"
          name="senderAddress.street"
          labelText="Sender street"
          control={control}
          rules={{
            required: "Street is required",
            minLength: { value: 3, message: "Street must be greater than 3" },
            maxLength: { value: 40, message: "Street must be less than 40" },
          }}
        />
        <CustomInput
          type="text"
          name="senderAddress.city"
          labelText="Sender city"
          control={control}
          rules={{
            required: "City is required",
            minLength: { value: 3, message: "City must be greater than 3" },
            maxLength: { value: 40, message: "City must be less than 40" },
          }}
        />
        <CustomInput
          type="text"
          name="senderAddress.postal"
          labelText="Sender postal"
          control={control}
          rules={{
            required: "postal code is required",
            minLength: {
              value: 4,
              message: "Postal code must be greater than 4",
            },
            maxLength: {
              value: 8,
              message: "Postal code  must be less than 8",
            },
          }}
        />
        <CustomInput
          type="text"
          name="senderAddress.country"
          labelText="Sender country"
          control={control}
          rules={{
            required: "country is required",
            minLength: { value: 4, message: "must be greater than 4" },
            maxLength: {
              value: 40,
              message: "Postal code  must be less than 40",
            },
          }}
        />
      </fieldset>
      <fieldset>
        <legend>Bill To</legend>
        <CustomInput
          type="text"
          name="clientName"
          labelText="Client name"
          control={control}
          rules={{
            required: "Client name is required",
            minLength: {
              value: 3,
              message: "Client name must be greater than 3",
            },
            maxLength: {
              value: 40,
              message: "Client name must be less than 40",
            },
          }}
        />
        <CustomInput
          type="email"
          name="clientEmail"
          labelText="Client email"
          control={control}
          rules={{
            required: "Email is required",
            minLength: {
              value: 3,
              message: "Client email must be greater than 3",
            },
            maxLength: {
              value: 40,
              message: "Client email must be less than 40",
            },
          }}
        />
        <CustomInput
          type="text"
          name="clientAddress.street"
          labelText="Client street"
          control={control}
          rules={{
            required: "Street is required",
            minLength: { value: 3, message: "Street must be greater than 3" },
            maxLength: { value: 40, message: "Street must be less than 40" },
          }}
        />
        <CustomInput
          type="text"
          name="clientAddress.city"
          labelText="client city"
          control={control}
          rules={{
            required: "City is required",
            minLength: { value: 3, message: "City must be greater than 3" },
            maxLength: { value: 40, message: "City must be less than 40" },
          }}
        />
        <CustomInput
          type="text"
          name="clientAddress.postal"
          labelText="Client postal"
          control={control}
          rules={{
            required: "postal code is required",
            minLength: {
              value: 4,
              message: "Postal code must be greater than 4",
            },
            maxLength: {
              value: 8,
              message: "Postal code  must be less than 8",
            },
          }}
        />
        <CustomInput
          type="text"
          name="clientAddress.country"
          labelText="Client country"
          control={control}
          rules={{
            required: "country is required",
            minLength: { value: 4, message: "must be greater than 4" },
            maxLength: {
              value: 40,
              message: "Postal code  must be less than 40",
            },
          }}
        />
      </fieldset>

      <fieldset>
        <legend>Invoice details</legend>
        <CustomSelect
          name="paymentTerms"
          control={control}
          rules={{ required: "Payment terms are required" }}
          options={[
            { value: 1, label: "Net 1 Day" },
            { value: 6, label: "Net 6 days" },
            { value: 7, label: "Net 7 days" },
            { value: 14, label: "Net 14 days" },
            { value: 30, label: "Net 30 days" },
          ]}
        />
        <CustomInput
          type="date"
          name="createdAt"
          labelText="Invoice Date"
          control={control}
          rules={{
            required: "Date is required",
          }}
        />
        <CustomInput
          type="date"
          name="paymentDue"
          labelText="Due Date"
          control={control}
          rules={{
            required: "Date is required",
          }}
        />
      </fieldset>

      <fieldset>
        <legend>Item list</legend>
        <CustomInput
          type="text"
          name="description"
          labelText="Project description"
          control={control}
          rules={{
            required: "Project description is required",
            minLength: { value: 4, message: "must be greater than 4" },
            maxLength: {
              value: 40,
              message: "Project description  must be less than 40",
            },
          }}
        />
        {invoice.items.map((item, index) => (
          <div key={item.name}>
            <CustomInput
              type="text"
              name={`items.${index}.name`}
              labelText="Project name"
              control={control}
              rules={{
                required: "Project name is required",
                minLength: { value: 4, message: "must be greater than 4" },
                maxLength: {
                  value: 40,
                  message: "Project name  must be less than 40",
                },
              }}
            />
            <CustomInput
              type="number"
              name={`items.${index}.quantity`}
              labelText="Qty"
              control={control}
              rules={{
                required: "Quantity is required",
                min: { value: 1, message: "Quantity must be greater than 0" },
                max: {
                  value: 100,
                  message: "Quantity  must be less than 100",
                },
              }}
            />
            <CustomInput
              type="number"
              name={`items.${index}.price`}
              labelText="Price"
              control={control}
              rules={{
                required: "Price is required",
                min: { value: 0, message: "Price must be greater than 0" },
              }}
            />
            <CustomInput
              type="number"
              name={`items.${index}.total`}
              labelText="Total"
              control={control}
              rules={{
                required: "Total is required",
                min: { value: 0, message: "Total must be greater than 0" },
              }}
            />
          </div>
        ))}
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AppController;
