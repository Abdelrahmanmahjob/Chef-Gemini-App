import chefClaudeLogo from "/src/assets/images/chef-claude-icon.png"

export default function Header() {
    return (
        <header>
            <img src={chefClaudeLogo}/>
            <h1>Chef Gemini</h1>
        </header>
    )
}