import "./Footer.css";
import React from 'react'
import {footerItems} from './footerItems'

export default function Footer(props) {
  return (
    <footer>
      <div className="footer-container">

          {footerItems.map((item,index)=>{
            let cNameCol = 'footer-column'
            let cNameTi = 'footer-column-title'
            return(
              <div key={item.id} className={item.title==='Socials' ? `${cNameCol} social`: cNameCol}>
                 <div className={item.title==='Socials' ? `${cNameTi} social-t`: cNameTi}>{item.title}</div>
                 {item.option.map(item=>{
                  return item.flag==='true' ? (<div key={item.id} className="footer-column-option"><i className={item.cN}></i>{item.desc}</div>):(<div key={item.id} className="footer-column-option">{item.desc}</div>)
                  })}
              </div>
            )
          })}
      </div>
      <div className="footer-container">
        <div className="footer-col">Email:sudo@gmail.com</div>
        <div className="footer-col">© 2022 Sudo</div>
        <div className="footer-col">Cookie privacy policy</div>
      </div>
    </footer>
  );
}



