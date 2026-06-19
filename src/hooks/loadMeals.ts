import { fetchItalianMeals } from "../services/meals";

export async function loadMeals(setMealsItems : any) {
  try {
    const data = await fetchItalianMeals();
    setMealsItems(data);
    // console.log(data);
  } catch {
    console.log("No data");
  }
}