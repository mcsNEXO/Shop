import "./Footer.css";
import React from 'react'

export default function Footer(props) {
  return (
    <footer>
      <div className="footer-container">
          <div className="footer-column">
            <div className="footer-column-title">O nas</div>
            <div className="footer-column-option">O nas</div>
            <div className="footer-column-option">Kariera</div>
            <div className="footer-column-option">Ambasadorzy</div>
            <div className="footer-column-option">Mobile Apps</div>
            <div className="footer-column-option">#sudo</div>
          </div>
          <div className="footer-column">
            <div className="footer-column-title">Informacje</div>
            <div className="footer-column-option">Regulamin</div>
            <div className="footer-column-option">Regulaminy promocji</div>
            <div className="footer-column-option">Polityka Prywatności</div>
          </div>
          <div className="footer-column">
            <div className="footer-column-title">Pomoc</div>
            <div className="footer-column-option">Pomoc</div>
            <div className="footer-column-option">Wysyła i dostawa</div>
            <div className="footer-column-option">Zwroty - instrukcja</div>
            <div className="footer-column-option">Formy płatności</div>
            <div className="footer-column-option">Zgłoś zwrot</div>
            <div className="footer-column-option">Zgłoś reklamację</div>
            <div className="footer-column-option">Tabele rozmiarów</div>
          </div>
          <div className="footer-column socials">
            <div className="footer-column-title social-t">Socials</div>
            <div className="footer-column-option"><i class="bi bi-facebook"></i>Facebook</div>
            <div className="footer-column-option"><i class="bi bi-instagram"></i>Instagram</div>
            <div className="footer-column-option"><i class="bi bi-twitter"></i>Twitter</div>
            <div className="footer-column-option"><i class="bi bi-youtube"></i>YouTube</div>
            <div className="footer-column-option"><i class="bi bi-tiktok"></i>TitTok</div>
          </div>
      </div>
      <div className="footer-container">
        <div className="footer-col">Email:sudo@gmail.com</div>
        <div className="footer-col">© 2022 Sudo</div>
        <div className="footer-col">Polityka prywatności plików cookie</div>
      </div>
    </footer>
  );
}



