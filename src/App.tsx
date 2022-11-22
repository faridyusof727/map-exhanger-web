import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

import { Rate, Widget } from "./components/Widget";

interface RequestPayload {
  fromCurrency: string;
  fromCurrencyBaseAmount: number;
  toCurrencies: string[];
  refresh?: boolean;
}

function App() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [payload, setPayload] = useState<RequestPayload>({
    fromCurrency: "USD",
    fromCurrencyBaseAmount: 1,
    toCurrencies: ["MYR", "EUR", "CHF", "AUD", "CAD", "GBP"],
  });

  useEffect(() => {
    getRates();
  }, [payload]);

  const getRates = async (refresh = false) => {
    setIsLoading(true);

    const requestPayload = { ...payload };
    if (refresh) {
      requestPayload.refresh = true;
    }

    const res = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}data`,
      requestPayload
    );
    const rates: Rate[] = [];
    for (const key in res.data?.rates) {
      const rate: Rate = {
        symbol: key,
        rate: res.data?.rates[key],
        name: key,
      };
      rates.push(rate);
    }
    setRates(rates);
    setLastUpdated(res.data.timestamp);
    setIsLoading(false);
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPayload({
      ...payload,
      fromCurrencyBaseAmount: parseFloat(event.target.value),
    });
  };

  const handleRefreshRateButton = () => {
    getRates(true);
  };

  return (
    <>
      <Container>
        <h1>Currency Rate</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Base Rate (USD)</Form.Label>
          <Form.Control
            type="number"
            value={payload.fromCurrencyBaseAmount}
            onChange={handleAmountChange}
          />
        </Form.Group>
        <Button onClick={handleRefreshRateButton}>Refresh Rate</Button>
        <hr />

        <Widget
          lastUpdated={lastUpdated}
          loading={isLoading}
          rates={rates}
          baseAmount={payload.fromCurrencyBaseAmount}
          name={"USD"}
          symbol={"USD"}
        />
      </Container>
    </>
  );
}

export default App;
