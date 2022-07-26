import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
export default function Categories(){
    const [categories, setCategories] = useState([])
    useEffect(()=>{
        axios.get('https://nc-games-social.herokuapp.com/api/categories').then(response =>{
            setCategories(response.data.categories)
        })
    })
    return <ul className="categories-ul">{categories.map(category =>{
            return <li key={category.slug}><Link to={`/categories/${category.slug}`}>{category.slug}</Link></li>
    })}</ul>
}