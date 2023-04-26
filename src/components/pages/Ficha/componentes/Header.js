import '../Ficha.css';

export default function Header({ texto }){
    const contenido = texto !== undefined ? texto.toUpperCase() : '';
    return (
        <div className="header">
            <p>{contenido}</p>
        </div>
    );
};