import React from 'react';
import "../style/SuccessPage.css";
import { useLocation, useHistory } from "react-router-dom";
import Header from '../component/Header';

const SuccessPage = () => {
  const history = useHistory();

  const location = useLocation();
  const { formData, totalPrice, extraPrice, count, pizzaName } = location.state;

  console.log(formData);

  /*let orderNote = null;
  if (formData.orderNote !== "") {
      orderNote = <p>Sipariş Notu: <span>{formData.orderNote}</span></p>;
  }*/

  console.log(formData);

  return (
    <div className='success-page'>
        <Header />
      <p style={{ color: "#FDC913", fontFamily: "Satisfy", width: "100%", textAlign: "center", fontSize: "2rem", marginTop: "6%", marginBottom:"0"}}>lezzetin yolda</p>
      <p style={{ fontFamily: "Barlow", width: "40%", textAlign: "center", fontSize: "3rem", marginTop: "0%", borderBottom: "1px solid white", paddingBottom: "2%" }}>SİPARİŞ ALINDI</p>
      <h4>{pizzaName}</h4>
      <div className='pizza'>
        <p>Adet:<span>{formData.count}</span></p>
        <p>Boyut:<span >{formData.size}</span></p>
        <p>Hamur:<span >{formData.dough}</span> </p>
        <p>Ek Malzemeler:<span >{formData.extras.join(', ')}</span> </p>
        <p>Sipariş Notu:<span >{formData.orderNote}</span></p>
      </div>
      <div className="order-total">
        <h3>Sipariş Toplamı</h3>
        <div className='total-box' >
          <p> Seçimler</p>
          <p style={{fontWeight:"bold"}}>{formData.extraPrice} ₺</p>
        </div>
        <div className='total-box' >
          <p> Toplam </p>
          <p style={{fontWeight:"bold"}}>{totalPrice}₺</p>
        </div>
      </div>
    </div>

  );
};

export default SuccessPage;