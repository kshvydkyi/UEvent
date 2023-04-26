import React from 'react';

const Footer = () => {
    const lang=localStorage.getItem("lang")
    return(
    <footer className='bg-dark'>
        <div className='d-flex pt-2 justify-content-center align-items-center'>
        <div>       
         <a className="text-white me-2"href="https://t.me/kossyaak">{lang === 'ua' ? 'Служба підтримки Kvitochok' : 'Kvitochok support service'}</a> 
         <span> | </span> 
         <span className='ms-2'>{lang === 'ua' ? '© 2023 Anonymous team. Всі права збережено.' : '© 2023 Anonymous team. All rights reserved. '}</span>
        </div>  
      </div>
    </footer>
  );
}
  
  export default Footer;