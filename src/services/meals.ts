const BASE = "https://www.themealdb.com/api/json/v1/1";

export async function fetchItalianMeals() {
  const res = await fetch(`${BASE}/filter.php?a=Italian`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.meals ?? [];
}

export async function fetchMealById(id: string) {
  const res = await fetch(`${BASE}/lookup.php?i=${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const meal = data.meals?.[0];
  const ingredients = Array.from(
    { length: 20 },
    (_, i) => meal[`strIngredient${i + 1}`],
  ).filter(
    (ingredient) =>
      ingredient != null && ingredient != undefined && ingredient != "",
  );
  return {
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
    strInstructions: meal.strInstructions,
    ingredients,
  };
}
