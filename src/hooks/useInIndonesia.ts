import { isInIndonesia } from "@/helpers/global";
import { useEffect, useState, useTransition } from "react";

export default function useInIndonesia() {
  const [pending, startTransition] = useTransition();
  const [isIn, setIsIn] = useState<boolean>(false);

  useEffect(() => {
    if ("geolocation" in navigator)
      startTransition(async () => {
        Promise.resolve(() => {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setIsIn(isInIndonesia(latitude, longitude));
          });
        });
      });
  }, []);

  return [pending, isIn];
}
