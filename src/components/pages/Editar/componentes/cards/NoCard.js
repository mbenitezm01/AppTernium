import { TfiFaceSad } from 'react-icons/tfi';

export default function NoCard(){
    return (
        <div className="no-card">
            <TfiFaceSad style={{fontSize: '100px', color: '#969696'}}/>
            <p style={{fontSize: '30px', fontWeight: 'bold'}}>No hay registros</p>
        </div>
    )
};