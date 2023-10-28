import Button from "./UI/Button"

function Header() {
    return (
        <header id = 'main-header'>
            <div id = 'title'>
                <h1> React Store </h1>
            </div>
            <nav>
                <Button textOnly={true} > Cart </Button>
            </nav>
        </header>
    )
}


export default Header