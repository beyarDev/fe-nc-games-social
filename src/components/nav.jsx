import CategoriesDropDown from "./categoriesDropDown"
import { Link } from "react-router-dom"
import Categories from "./categoriesList"
import '../styles/nav.css'
export default function Navigation(){
   
    return <nav className="main-nav">
            <Link to='/' style={{margin:'0 20px'}}>Home</Link>
            <CategoriesDropDown>
                <Categories/>
            </CategoriesDropDown>
            </nav>
}