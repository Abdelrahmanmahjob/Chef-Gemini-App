export async function getRecipeFromGemini(ingredientsArr) {
    try {
        const response = await fetch("https://chef-gemini-app-backend.onrender.com/api/recipe", {
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