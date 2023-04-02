import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Inputs from "./components/Inputs";
import dataList from "./data.json";
import "./App.css";

function App() {
  //const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);
  // const onSubmit = data => console.log(data);
  const invoice = dataList;
  // console.log(invoice);
  const initialState = {
    id: invoice.id,
    createdAt: invoice.createdAt,
    paymentDue: invoice.paymentDue,
    description: invoice.description,
    paymentTerms: invoice.paymentTerms,
    clientEmail: invoice.clientEmail,
    clientName: invoice.clientName,
    status: invoice.status,
    total: invoice.total,
    senderAddress: {
      street: invoice.senderAddress.street,
      city: invoice.senderAddress.city,
      postCode: invoice.senderAddress.postCode,
      country: invoice.senderAddress.country,
    },
    clientAddress: {
      street: invoice.clientAddress.street,
      city: invoice.clientAddress.city,
      postCode: invoice.clientAddress.postCode,
      country: invoice.clientAddress.country,
    },
    items: invoice.items,
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initialState });
  const [formData, setFormData] = useState(initialState);

  /*
  const onChange = (evt: {
    target: { name: any; value: any; dataset: any };
  }) => {
    const { name, value, dataset } = evt.target;
    console.log(dataset);
    // setFormData({ ...formData, [name]: value });
    setFormData({
      ...formData,
      [name]: value,
      senderAddress: {
        ...formData.senderAddress,
        [name]: value,
      },
    });
    console.log(formData.senderAddress);
  };

  const {
    clientName,
    clientEmail,
    paymentDue,
    paymentTerms,
    senderAddress: { street, city, country, postCode },
    // clientAddress: { street, city, country, postCode },
  } = formData;
  console.log(street);
*/
  return (
    <div className="main">
      <form
        className="edit-form"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <h2 className="edit-title">
          Edit
          <span className="invoice-num invoice-num-edit">{invoice.id}</span>
        </h2>

        <button type="submit">Submit form</button>
        {/* Sender details */}
        <fieldset className="edit-invoice-details">
          <legend className="edit-field-title">Bill From</legend>

          <div className={`address-line street-line`}>
            <label className="label" htmlFor={`street`}>
              street name
            </label>
            <input
              type="text"
              id={`street`}
              className={`input street`}
              placeholder={`116 Caledorn street`}
              {...register("senderAddress.street", {
                required: true,
                minLength: 4,
              })}
            />
          </div>

          <div className={`address-line city-line`}>
            <label className="label" htmlFor={`city`}>
              City
            </label>
            <input
              type="text"
              id={`city`}
              className={`input city`}
              placeholder={`Uitenhage`}
              {...register("senderAddress.city", {
                required: true,
                minLength: 4,
              })}
            />
          </div>

          <div className={`address-line postal-line`}>
            <label className="label" htmlFor={`postal`}>
              Postal code
            </label>
            <input
              type="text"
              id={`postal`}
              className={`input postal`}
              placeholder={`6229`}
              {...register("senderAddress.postCode", {
                required: true,
                minLength: 4,
              })}
            />
          </div>

          <div className={`address-line country-line`}>
            <label className="label" htmlFor={`country`}>
              Country
            </label>
            <input
              type="text"
              id={`country`}
              className={`country`}
              placeholder={`South Africa`}
              {...register("senderAddress.country", {
                required: true,
                minLength: 4,
              })}
            />
          </div>
        </fieldset>

        {/* reciever */}
        <fieldset className="edit-invoice-details">
          <legend className="edit-field-title">Bill to</legend>

          <div className={`address-line`}>
            <label className="label" htmlFor={`client`}>
              Client name
            </label>
            <input
              type="text"
              id={`client`}
              className={`input`}
              placeholder={`Chamu mutezva`}
              {...register("clientName", { required: true, minLength: 1 })}
            />
          </div>

          <div className={`address-line email-line`}>
            <label className="label" htmlFor={`email`}>
              Client name
            </label>
            <input
              type="text"
              id={`email`}
              className={`email-address`}
              placeholder={`mutezva@gmail.com`}
              {...register("clientEmail", { required: true, minLength: 4 })}
            />
          </div>

          <div className={`address-line street-line`}>
            <label className="label" htmlFor={`client-street`}>
              street name
            </label>
            <input
              type="text"
              id={`client-street`}
              className={`input street`}
              placeholder="19 Receiver street"
              {...register("clientAddress.street", {
                required: true,
                minLength: 4,
              })}
            />
          </div>

          <div className={`address-line city-line`}>
            <label className="label" htmlFor={`client-city`}>
              City
            </label>
            <input
              type="text"
              id={`client-city`}
              className={`input city`}
              placeholder={`London`}
              {...register("clientAddress.city", {
                required: true,
                minLength: 4,
              })}
            />
          </div>

          <div className={`address-line postal-line`}>
            <label className="label" htmlFor={`client-postal`}>
              Postal code
            </label>
            <input
              type="text"
              id={`client-postal`}
              className={`input postal`}
              placeholder={`AE123`}
              {...register("clientAddress.postCode", {
                required: true,
                minLength: 4,
              })}
            />
          </div>

          <div className={`address-line country-line`}>
            <label className="label" htmlFor={`country`}>
              Country
            </label>
            <input
              type="text"
              id={`country`}
              className={`country`}
              placeholder={`South Africa`}
              {...register("clientAddress.country", {
                required: true,
                minLength: 4,
              })}
            />
          </div>
        </fieldset>

        <fieldset className="edit-invoice-details">
          <div className={`invoice-date`}>
            <label className="label" htmlFor={`date`}>
              Invoice date
            </label>
            <input
              type="date"
              id={`date`}
              className={`date-signed`}
              placeholder={""}
              {...register("paymentDue")}
            />
          </div>

          <div className="payment-terms">
            <label className="label" htmlFor="terms">
              Payment terms
            </label>
            <select
              className="input terms-options"
              id="terms"
              {...register("paymentTerms")}
            >
              <option value={1}>Net 1 Day</option>
              <option value={6}>Net 6 days</option>
              <option value={7}>Net 7 days</option>
              <option value={14}>Net 14 Days</option>
              <option value={30}>Net 30 Days</option>
            </select>
          </div>

          <div className={`Project name`}>
            <label className="label" htmlFor={`project-desc`}>
              Project Description
            </label>
            <input
              type="text"
              id={`project-desc`}
              className={`project-desc`}
              placeholder={"Description"}
              {...register("description", { required: true, minLength: 4 })}
            />
          </div>
        </fieldset>

        <fieldset className="edit-invoice-details">
          <legend className="edit-field-title">Item list</legend>
          {invoice.items.map(
            (
              item: {
                name: string;
                quantity: number;
                price: number;
                total: number;
              },
              index
            ) => (
              <div className="item-line" key={item.name}>
                <div className={`project-line`}>
                  <label className="label" htmlFor={`project-line`}>
                    Project name
                  </label>
                  <input
                    type="text"
                    id={`project-name`}
                    className={`project-name`}
                    placeholder={"Name of project"}
                    {...register(`items.${index}.name`, {
                      required: true,
                      minLength: 4,
                    })}
                  />
                </div>

                <div className={`costing-line`}>
                  <label className="label" htmlFor={`qty-line`}>
                    Qty
                  </label>
                  <input
                    type="text"
                    id={`qty`}
                    className={`quantity`}
                    placeholder={"1"}
                    {...register(`items.${index}.quantity`, {
                      required: true,
                    })}
                  />
                </div>

                <div className={`price-line`}>
                  <label className="label" htmlFor={`price`}>
                    Price
                  </label>
                  <input
                    type="number"
                    id={`price`}
                    className={`price`}
                    placeholder={"200.00"}
                    {...register(`items.${index}.price`, {
                      required: true,
                    })}
                  />
                </div>
                <div className={`item-total-line`}>
                  <label className="label" htmlFor={`item-total`}>
                    Total
                  </label>
                  <input
                    type="number"
                    id={`item-total`}
                    className={`item-total`}
                    placeholder={"200.00"}
                    readOnly
                    {...register(`items.${index}.total`, {
                      required: true,
                    })}
                  />
                </div>
                {/*
                <div>
                  <p className="total-line">
                    <span className="label">Total</span>
                    <span className="label">{invoice.items[index].quantity * invoice.items[index].price}</span>
                  </p>
                </div>
                  */}
              </div>
            )
          )}
        </fieldset>
      </form>
    </div>
  );
}

export default App;
