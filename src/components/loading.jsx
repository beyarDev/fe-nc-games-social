import '../styles/loading.css'

export default function Loading(){
    return <div className="spinner">
    Loading
    <div className="spinner-sector spinner-sector-red"></div>
    <div className="spinner-sector spinner-sector-blue"></div>
    <div className="spinner-sector spinner-sector-green"></div>
    </div>
}