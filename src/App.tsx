import mondaySdk from "monday-sdk-js";
import Button from "monday-ui-react-core/dist/Button";
import Dropdown from "monday-ui-react-core/dist/Dropdown";
import "monday-ui-react-core/dist/main.css";
import Text from "monday-ui-react-core/dist/Text";
import TextField from "monday-ui-react-core/dist/TextField";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Fragrance } from "../types";

const monday = mondaySdk();
monday.setToken(import.meta.env.VITE_MONDAY_TOKEN);

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState<{ label: string; value: Fragrance }[]>(
    []
  );
  const [selectedOptions, setSelectedOptions] = useState<
    { label: string; value: Fragrance }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  async function createOrder() {
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

      const response = await monday.api(`mutation {
        create_item (board_id: 7248064972, group_id: "topics", item_name: "${name}", column_values: "{\\"status\\":\\"New Order\\",\\"numbers\\":${quantity},\\"date_1\\":{\\"date\\":\\"${date[0]}\\",\\"time\\":\\"${date[1]}\\"},\\"text\\":\\"${firstName}\\",\\"text6\\":\\"${lastName}\\",\\"dropdown\\":{\\"labels\\":[${categories}]}}") {
          id
        }
      }`);

      console.log(response);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setFirstName("");
      setLastName("");
      setQuantity(1);
      setSelectedOptions([]);
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    fetchFragranceOptions();
  }, [fetchFragranceOptions]);

  return (
    <>
      <form
        className="p-9"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          if (selectedOptions.length !== 3) {
            setError("You must select 3 fragrances");
            return;
          }
          createOrder();
        }}
      >
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
          <div style={{ width: "100%" }}>
            <Dropdown
              value={selectedOptions}
              onOptionSelect={(option: { label: string; value: Fragrance }) => {
                if (selectedOptions.length === 3) {
                  setError("You may only select 3 fragrances");
                  return;
                }
                setSelectedOptions([...selectedOptions, option]);
                setError("");
              }}
              onOptionRemove={() => {
                const newOptions = structuredClone(selectedOptions);
                newOptions.pop();
                setSelectedOptions(newOptions);
                setError("");
              }}
              onClear={() => setSelectedOptions([])}
              isLoading={isLoading}
              options={options}
              multi
              multiline
            />
            <Text color="secondary" type={Text.types.TEXT3}>
              {error}
            </Text>
          </div>
          <div>
            <Button type={Button.types.SUBMIT} loading={isSubmitting}>
              Start Order
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default App;
