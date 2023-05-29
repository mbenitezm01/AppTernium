import React from 'react';

//Importacion de iconos
import { HiDownload } from 'react-icons/hi'
import { AiFillEdit } from 'react-icons/ai'
import { MdOutlineCompareArrows } from 'react-icons/md'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { FiLogOut } from 'react-icons/fi'
import { IoSearchSharp } from 'react-icons/io5'
import { HiUsers } from 'react-icons/hi'
import { VscLock } from 'react-icons/vsc'
import { AiOutlineMail } from 'react-icons/ai'



//Importacion de estilo
import './sharedStyles/Btn.css'

const components = {
    download: HiDownload,
    edit: AiFillEdit,
    compare: MdOutlineCompareArrows,
    return: IoMdArrowRoundBack,
    logout: FiLogOut,
    search: IoSearchSharp,
    users: HiUsers,
    lock: VscLock,
    email: AiOutlineMail
};

function btnIcon(icon) {
    const Icon = components[icon];
    return <Icon className='icon'/>
}

const Btn = ({ text, icon, onClick, state }) => {
    return (
        <button disabled={state} onClick={onClick}>
            {text}
            {btnIcon(icon)}
        </button>
    );
};

export default Btn;