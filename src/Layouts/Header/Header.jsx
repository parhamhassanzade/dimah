import React, { useEffect, useState } from 'react'

function Header() {
    const [userName , setUserName] = useState('')
    useEffect(() => {
        setUserName(localStorage.getItem('username'))
    })    
    return (
        <div className="Header">
            <div>
                <a> نام کاربری : {userName} </a>
            </div>
            <div>
                داشبورد مدیریت مرکز تخصصی دیماه
            </div>
        </div>
    )
}

export default Header
