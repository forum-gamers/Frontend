import { generateRandomString } from "@/helpers/global";
import { useEffect, useState } from "react";

export default function useCsrf() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const generate = () => {
      setToken(generateRandomString(16));
    };

    generate();

    const interval = setInterval(generate, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return token;
}
