import Header from "./Header";

export default function ResumenPerfil({ datos }){
    return (
        <div className='profile-summary'>
            <Header texto='resumen perfil'/>
            {/* <table className='info'>
                <tbody>
                    {datos}
                </tbody>
            </table> */}
            {datos}
        </div>
    );
};