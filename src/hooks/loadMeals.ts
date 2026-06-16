import React from "react";
import { fetchItalianMeals } from "../services/mealsApi";


  export async function loadMeals(setMealsItems : any) {
    try {
      const data = await fetchItalianMeals();
      setMealsItems(data);
      // console.log(data);
    } catch {
      console.log("No data");
    }
  }