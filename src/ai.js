export async function getRecipeFromGemini(ingredientsArr) {
    try {
        const response = await fetch("http://localhost:3001/api/recipe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients: ingredientsArr })
        });
        const data = await response.json();
        return data.recipe;
    } catch (err) {
        console.error("Something wrong ❌ => ", err.message);
        return "Error fetching recipe.";
    }
}