import Button from "monday-ui-react-core/dist/Button";
import Dropdown from "monday-ui-react-core/dist/Dropdown";
import "monday-ui-react-core/dist/main.css";
import Text from "monday-ui-react-core/dist/Text";
import TextField from "monday-ui-react-core/dist/TextField";
import React, { useEffect, useMemo, useState } from "react";
import type { Fragrance, OrderOption } from "../../types";
import monday from "../lib/monday";

const MAX_OPTIONS = 3;

function OrderForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState<OrderOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<OrderOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchFragranceOptions = useMemo(
    () => async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/fragrances");
        const fragrances = await response.json();
        const options = fragrances.map((fragrance: Fragrance) => ({
          label: fragrance.name,
          value: fragrance,
        }));
        setOptions(options);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const createOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      const date = new Date()
        .toISOString()
        .replace(/.\d{3}Z$/, "")
        .split("T");

      const name = selectedOptions
        .map((option) => option.value.name)
        .join(", ");

      const categories = [
        ...new Set(
          selectedOptions.map((option) => `\\"${option.value.category}\\"`)
        ),
      ].join(",");

      await monday.api(`mutation {
        create_item (board_id: 7248064972, group_id: "topics", item_name: "${name}", column_values: "{\\"status\\":\\"New Order\\",\\"numbers\\":${quantity},\\"date_1\\":{\\"date\\":\\"${date[0]}\\",\\"time\\":\\"${date[1]}\\"},\\"text\\":\\"${firstName}\\",\\"text6\\":\\"${lastName}\\",\\"dropdown\\":{\\"labels\\":[${categories}]}}") {
          id
        }
      }`);
    } catch (error) {
      console.error(error);
    } finally {
      setFirstName("");
      setLastName("");
      setQuantity(1);
      setSelectedOptions([]);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchFragranceOptions();
  }, [fetchFragranceOptions]);

  return (
    <>
      <form className="p-9" onSubmit={createOrder}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <TextField
              id="firstName"
              name="firstName"
              title="First Name"
              placeholder="Enter Customer First Name"
              value={firstName}
              size={TextField.sizes.MEDIUM}
              onChange={setFirstName}
              required
              requiredAsterisk
            />
            <TextField
              id="lastName"
              name="lastName"
              title="Last Name"
              placeholder="Enter Customer Last Name"
              value={lastName}
              size={TextField.sizes.MEDIUM}
              onChange={setLastName}
              required
              requiredAsterisk
            />
            <TextField
              id="quantity"
              name="quantity"
              title="Quantity"
              placeholder="1"
              value={quantity}
              size={TextField.sizes.MEDIUM}
              type={TextField.types.NUMBER}
              onChange={setQuantity}
              required
              requiredAsterisk
            />
          </div>
          <div>
            <Dropdown
              placeholder="Select Fragrances"
              value={selectedOptions}
              onOptionSelect={(option: OrderOption) => {
                if (selectedOptions.length === MAX_OPTIONS) {
                  return;
                }
                setSelectedOptions([...selectedOptions, option]);
              }}
              onOptionRemove={() => {
                const newOptions = structuredClone(selectedOptions);
                newOptions.pop();
                setSelectedOptions(newOptions);
              }}
              onClear={() => setSelectedOptions([])}
              isLoading={isLoading}
              options={options}
              multi
              multiline
            />
            <Text color="secondary" type={Text.types.TEXT2}>
              {selectedOptions.length} of {MAX_OPTIONS} selected
            </Text>
          </div>
          <div>
            <Button
              type={Button.types.SUBMIT}
              loading={isSubmitting}
              disabled={selectedOptions.length !== MAX_OPTIONS}
            >
              Start Order
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default OrderForm;
