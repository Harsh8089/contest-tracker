import { BACKEND_URL } from "@/const";
import { Contest } from "@/types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export const useFetch = () => {
  const [data, setData] = useState<Contest[] | null>(null);
  const [loader, setLoader] = useState<boolean>(true);

  const allContestsRef = useRef<Contest[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}`)
    .then(res => {
      allContestsRef.current = res.data;
      setData(res.data);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      setLoader(false);
    });
  }, [])

  return {
    allContestsRef,
    data,
    setData,
    loader,
    setLoader,
  }
}