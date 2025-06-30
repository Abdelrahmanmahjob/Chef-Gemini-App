import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromGemini } from "../../ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const recipeSectionRef = React.useRef(null)
    // console.log(recipeSectionRef)
    React.useEffect(() => {
        if(recipe && recipeSectionRef.current != null) {
            recipeSectionRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [recipe])

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromGemini(ingredients)
        setRecipe(recipeMarkdown)
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient").trim()
        if (newIngredient && !ingredients.includes(newIngredient)) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        }
    }

    function removeIngredient(ingredientToRemove) {
        setIngredients(prevIngredients =>
            prevIngredients.filter(ingredient => ingredient !== ingredientToRemove)
        );
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button className="add-ingredient-btn">Add ingredient</button>
            </form>

            {ingredients.length > 0 ?
                <IngredientsList
                    ref={recipeSectionRef}
                    ingredients={ingredients}
                    removeIngredient={removeIngredient}
                    getRecipe={getRecipe}
                /> : (
    <div className="empty-ingredients">
        <span>🍳</span>
        <strong>Start by adding ingredients!</strong>
        <p>
            ✨ Add some ingredients and we’ll suggest a delicious recipe ✨
        </p>
    </div>
)
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}