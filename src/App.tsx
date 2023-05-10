import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Inputs from "./components/Inputs";
import dataList from "./data.json";
import "./App.css";

function App() {
  //const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);
  // const onSubmit = data => console.log(data);
  const invoice = dataList;
   console.log(invoice);
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
          <Inputs
            ariaLabelledBy={"sender-street-lbl"}
            ariaInvalid={errors.senderAddress?.street ? true : false}
            registeredName={"senderAddress.street"}
            htmlFor={"sender-street-id"}
            textLabel={"Street address"}
            type={"text"}
            id={"sender-street-id"}
            placeholder={"116 Caledorn street"}
            isRequired={"Street address is required"}
            register={register}
            errorRef={errors.senderAddress?.street}
            errorMessage={errors.senderAddress?.street?.message?.toString()}
          />
          <Inputs
            ariaLabelledBy={"sender-city-lbl"}
            ariaInvalid={errors.senderAddress?.city ? true : false}
            registeredName={"senderAddress.city"}
            htmlFor={"sender-city-id"}
            textLabel={"City"}
            type={"text"}
            id={"sender-city-id"}
            placeholder={"London"}
            isRequired={"City is required"}
            register={register}
            errorRef={errors.senderAddress?.city}
            errorMessage={errors.senderAddress?.city?.message?.toString()}
          />

          <Inputs
            ariaLabelledBy={"postal-lbl"}
            ariaInvalid={errors.senderAddress?.postCode ? true : false}
            registeredName={"senderAddress.postCode"}
            htmlFor={"sender-postcode-id"}
            textLabel={"Postal code"}
            type={"text"}
            id={"sender-postcoe-id"}
            placeholder={"6229"}
            isRequired={"Postal code is required"}
            register={register}
            errorRef={errors.senderAddress?.postCode}
            errorMessage={errors.senderAddress?.postCode?.message?.toString()}
          />

          <Inputs
            ariaLabelledBy={"sender-country-lbl"}
            ariaInvalid={errors.senderAddress?.country ? true : false}
            registeredName={"senderAddress.country"}
            htmlFor={"sender-country-id"}
            textLabel={"Country"}
            type={"text"}
            id={"sender-country-id"}
            placeholder={"South Africa"}
            isRequired={"Country is required"}
            register={register}
            errorRef={errors.senderAddress?.country}
            errorMessage={errors.senderAddress?.country?.message?.toString()}
          />
        </fieldset>

        {/* reciever */}
        <fieldset className="edit-invoice-details">
          <legend className="edit-field-title">Bill to</legend>
          <Inputs
            ariaLabelledBy={"client-name-lbl"}
            ariaInvalid={errors.clientName ? true : false}
            registeredName={"clientName"}
            htmlFor={"client-name"}
            textLabel={"Client name"}
            type={"text"}
            id={"client-name"}
            placeholder={"Chamu Mutezva"}
            isRequired={"Client name is required"}
            register={register}
            errorRef={errors.clientName}
            errorMessage={errors.clientName?.message?.toString()}
          />
          <Inputs
            ariaLabelledBy={"client-email-lbl"}
            ariaInvalid={errors.clientEmail ? true : false}
            registeredName={"clientEmail"}
            htmlFor={"client-email"}
            textLabel={"Client email"}
            type={"text"}
            id={"client-email"}
            placeholder={"ckmutezva@gmail.com"}
            isRequired={"Client email is required"}
            register={register}
            errorRef={errors.clientEmail}
            errorMessage={errors.clientEmail?.message?.toString}
          />

          <Inputs
            ariaLabelledBy={"client-street-lbl"}
            ariaInvalid={errors.clientAddress?.street ? true : false}
            registeredName={"clientAddress.street"}
            htmlFor={"client-street-id"}
            textLabel={"Street"}
            type={"text"}
            id={"client-street-id"}
            placeholder={"37 Mudzi street"}
            isRequired={"Client street is required"}
            register={register}
            errorRef={errors.clientAddress?.street}
            errorMessage={errors.clientAddress?.street?.message?.toString}
          />

          <Inputs
            ariaLabelledBy={"client-city-lbl"}
            ariaInvalid={errors.clientAddress?.city ? true : false}
            registeredName={"clientAddress.city"}
            htmlFor={"client-city-id"}
            textLabel={"City"}
            type={"text"}
            id={"client-city-id"}
            placeholder={"Mudzi"}
            isRequired={"City is required"}
            register={register}
            errorRef={errors.clientAddress?.city}
            errorMessage={errors.clientAddress?.city?.message?.toString()}
          />

          <Inputs
            ariaLabelledBy={"client-postal-lbl"}
            ariaInvalid={errors.clientAddress?.postCode ? true : false}
            registeredName={"clientAddress.postCode"}
            htmlFor={"client-postal-id"}
            textLabel={"Postal code"}
            type={"text"}
            id={"client-postal-id"}
            placeholder={"AE123"}
            isRequired={"Postal code is required"}
            register={register}
            errorRef={errors.clientAddress?.postCode}
            errorMessage={errors.clientAddress?.postCode?.message?.toString()}
          />

          <Inputs
            ariaLabelledBy={"client-country-lbl"}
            ariaInvalid={errors.clientAddress?.country ? true : false}
            registeredName={"clientAddress.country"}
            htmlFor={"client-country-id"}
            textLabel={"Country"}
            type={"text"}
            id={"client-country-id"}
            placeholder={"United Kingdom"}
            isRequired={"Country is required"}
            register={register}
            errorRef={errors.clientAddress?.country}
            errorMessage={errors.clientAddress?.city?.message?.toString()}
          />
        </fieldset>

        <fieldset className="edit-invoice-details">
          <div className={`invoice-date`}>
            
            <Inputs
              ariaLabelledBy={"created-at-lbl"}
              ariaInvalid={errors.paymentDue ? true : false}
              registeredName={"Created at"}
              htmlFor={"created-id"}
              textLabel={"Invoice date"}
              type={"date"}
              id={"created-id"}
              placeholder={""}
              isRequired={"Date is required"}
              register={register}
              errorRef={errors.createdAt}
              errorMessage={errors.createdAt?.message?.toString()}
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

/*
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
*/
