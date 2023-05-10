import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import add  from "date-fns/add";
import format from "date-fns/format";
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
  paymentDue: Date;
};

const AppController = () => {
  const invoice = dataList;
  const initialState = {
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
    createdAt: format(new Date(invoice.createdAt), "yyyy/MM/dd"),
    description: invoice.description,
    paymentTerms: 1,
    paymentDue: new Date(invoice.paymentDue),
  };

  const { control, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: initialState,
  });

  const payment = watch("paymentTerms");
  console.log(payment);

  useEffect(() => {
    // update the days when payment terms have been selected
    switch (payment) {
      case 1:
        setValue("paymentDue", add(Date.now(), { days: 1 }));
        break;
      case 6:
        setValue("paymentDue", add(Date.now(), { days: 6 }));
        break;
      case 7:
        setValue("paymentDue", add(Date.now(), { days: 7 }));
        break;
      case 14:
        setValue("paymentDue", add(Date.now(), { days: 14 }));
        break;
      default:
        setValue("paymentDue", add(Date.now(), { days: 30 }));
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
      </fieldset>
      <fieldset>
        <legend>Invoice details</legend>
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
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AppController;
