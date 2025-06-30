export default function IngredientsList(props) {
    let ingredientsListItems = []
    props.ingredients.map(ingredient => {
        if(!ingredientsListItems.includes(ingredient)) {
            ingredientsListItems.push(
                <li key={ingredient} className="ingredient-item">
                    <span className="ingredient-name">{ingredient}</span>
                    <button
                        className="remove-ingredient-btn"
                        onClick={() => props.removeIngredient(ingredient)}
                        aria-label={`Remove ${ingredient}`}
                    >
                        &times;
                    </button>
                </li>
            ) 
        } else {
            console.warn(`Duplicate ingredient found: ${ingredient}`)
        }
        // console.log(ingredientsListItems)
        return ingredientsListItems
    })
    
    return (
        <section className="ingredients-list-container">
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {props.ingredients.length > 3 && <div className="get-recipe-container">
                <div className="get-recipe-text" ref={props.ref}>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe}>Get a recipe</button>
            </div>}
        </section>
    )
}
