import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Col, FormGroup, Input, Label, Row, Card, CardText, FormFeedback, Form } from "reactstrap";
import * as Yup from "yup";
import "../style/OrderPage.css";
import Header from "./Header";


const OrderForm = () => {
    const extras = ["Pepperoni", "Domates", "Biber", "Sosis", "Mısır", "Sucuk", "Kanada Jambonu",
        "Ananas", "Tavuk Izgara", "Jalepeno", "Kabak", "Soğan", "Sarımsak"];

    const pizza = {
        name: "Position Absolute Acı Pizza",
        price: 85.50,
        point: "4.9",
        comment: "(200)",
        text: "Frontent Dev olarak hala position: absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan italyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir."
    }

    const [valid, setValid] = useState(false);
    const [extraPrice, setExtraPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(pizza.price);
    const history = useHistory();
    const [count, setCount] = useState(1);

    const [formData, setFormData] = useState({
        size: "",
        dough: '',
        extras: [],
        orderNote: '',
        count: count,
        extraPrice: extraPrice,
        totalPrice: totalPrice
    });

    const [formErrs, setFormErrs] = useState({
        size: '',
        dough: '',
        extras: [],
        orderNote: '',
        count: "",
    });

    const formSchema = Yup.object().shape({
        size: Yup.string().required("Boyut seçmelisiniz!"),
        dough: Yup.string().required("Hamur kalınlığı seçmelisiniz!"),
        extras: Yup.array().max(10, "10 malzemeden fazlasını seçemezsiniz."),
        orderNote: Yup.string(),
        count: Yup.number().min(1, "Minimum 1 adet ürün seçmelisiniz."),
    });

    useEffect(() => {
        formSchema.isValid(formData).then((valid) => setValid(valid));
    }, [formData]);

    const increaseCount = () => {
        setCount(count + parseInt(1));
        setFormData({ ...formData, count: count });
    };

    const decreaseCount = () => {
        count > 1 ? setCount(count - parseInt(1)) : setCount(1)
        setFormData({ ...formData, count: count })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formData)
            .then(res => {
                console.log(res.data);
                console.log(formData)
                console.log(totalPrice, extraPrice)
                history.push('/success', { formData: formData, totalPrice: totalPrice});
                setFormData(e.target.elements);
            })
            .catch(err => {
                console.log(err);
            });
    };


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'radio') {
            setFormData({ ...formData, size: value })
        }
        if (type === 'checkbox') {
            if (checked) {
                setFormData({ ...formData, extras: [...formData.extras, value] });
            } else {
                setFormData({ ...formData, extras: formData.extras.filter(item => item !== value) });
            }
        } else {
            Yup.reach(formSchema, name)
                .validate(value)
                .then(() => {
                    setFormErrs({ ...formErrs, [name]: "" });
                    console.log(formErrs)
                })
                .catch((err) => {
                    setFormErrs({ ...formErrs, [name]: err.errors[0] });
                });

            setFormData({ ...formData, [name]: value });
        }
    };


    useEffect(() => {
        const extraPrice = formData.extras.length * 5;
        setExtraPrice(extraPrice);
        setFormData({ ...formData, extraPrice: extraPrice });
    }, [formData.extras])


    useEffect(() => {
        if (formData.size === 'S') {
            setTotalPrice(85.50);
        } else if (formData.size === 'M') {
            setTotalPrice(95.50);
        } else if (formData.size === 'L') {
            setTotalPrice(105.50);
        }
    }, [formData.size])

    return (
        <div className="order-page">
            <Header />
            <div className='contents'>
                <img src={require('../Assets/adv-aseets/adv-form-banner.png')} alt="" />
                <nav>
                    <a href="/" style={{ color: "#5F5F5F" }}>Anasayfa</a>
                    <a href="/" style={{ color: "#5F5F5F" }}> - Seçenekler</a>
                    <a href="/order-pizza" style={{ color: "#CE2829" }}> - Sipariş Oluştur</a>
                </nav>
                <h3 style={{ width: "40%", margin: "auto", marginBottom: "3%", textAlign: "left" }}>{pizza.name}</h3>
                <div style={{ width: "40%", margin: "auto", display: "flex", marginBottom: "3%", textAlign: "left" }}>
                    <h2 style={{ width: "75%" }}>{pizza.price + "₺"}</h2>
                    <p style={{ color: "#5F5F5F", width: "15%" }}>{pizza.point}</p>
                    <p style={{ color: "#5F5F5F", width: "10%" }}>{pizza.comment}</p>
                </div>
                <p style={{ width: "40%", margin: "auto", marginBottom: "3%", color: "#5F5F5F", textAlign: "left" }}>{pizza.text}</p>
            </div>

            <div className='order-form-container' >
                <Form id="pizza-form" onSubmit={handleSubmit}>
                    <Row className='size-dough'>
                        <Col className='pizza-size'>
                            <h5>Boyut Seç<span style={{ color: "#CE2829" }}>*</span></h5>
                                    <Input
                                        type="radio"
                                        id="size-s"
                                        name="size"
                                        value='S'
                                        onChange={handleChange}
                                    />
                                    <Label style={{ marginTop: "4%" }} htmlFor="size-s">S</Label>
                                    <Input
                                        type="radio"
                                        id="size-m"
                                        name="size"
                                        value='M'
                                        onChange={handleChange}
                                    />
                                    <Label style={{ marginTop: "4%" }} htmlFor="size-m">M</Label>
                                    <Input
                                        type="radio"
                                        id="size-l"
                                        name="size"
                                        value='L'
                                        onChange={handleChange}
                                    />
                                    <Label style={{ marginTop: "4%" }} htmlFor="size-l">L</Label>


                            <p style={{ color: "#CE2829", fontSize: "0.8rem", fontFamily: "Quattrocento", margin: "0", marginTop: "2%" }}>{formErrs.size}</p>
                        </Col>
                        <Col className='dough'>
                            <h5>Hamur Seç<span style={{ color: "#CE2829" }}>*</span></h5>
                            <select id="dough" name="dough" value={formData.dough} onChange={handleChange} required>
                                <option value="">Hamur Kalınlığı Seçin</option>
                                <option value="extra-thin">Extra İnce Kenar</option>
                                <option value="thin">İnce Kenar</option>
                                <option value="standart">Standart Kenar</option>
                                <option value="thick">Kalın Kenar</option>
                            </select>
                            <p style={{ color: "#CE2829", fontSize: "0.8rem", fontFamily: "Quattrocento", margin: "0", marginTop: "2%" }}>{formErrs.dough}</p>
                        </Col>
                    </Row>
                    <div className='extras'>
                        <h5 className='title'>Ek Malzemeler</h5>
                        <p>En fazla 10 malzeme seçebilirsiniz. 5₺</p>
                        {extras.map((extra, index) => (
                            <Label className='checkbox' htmlFor={extra} key={index} check>
                                <Input
                                    className="extras-input"
                                    type="checkbox"
                                    id={extra}
                                    name={extra}
                                    value={extra}
                                    data-cy="extras"
                                    onChange={handleChange}
                                    disabled={formData.extras.length >= 10 && !formData.extras.includes(extra)}
                                    invalid={!!formErrs.extras}
                                />
                                <span class="checkmark"></span>
                                {extra}
                            </Label>
                        ))}
                    </div>
                    <div className='order-note'>
                        <h5>Sipariş Notu</h5>
                        <Input type="textarea" id="orderNote" name="orderNote" data-cy="note-Input" value={formData.orderNote} onChange={handleChange} placeholder='Siparişinize eklemek istediğniz bir not var mı?' />
                        <hr style={{ width: "100%", color: "black", marginTop: "5%" }} />
                    </div>
                    <div className='count-total'>

                        <div className='count-button'>
                            <button type="button" onClick={decreaseCount} style={{ margin: "0" }}>-</button>
                            <Input type="number" id="count" name="count" data-cy="count" value={count} onChange={handleChange} min="1" />
                            <button type="button" onClick={increaseCount} style={{ margin: "0" }}>+</button>
                        </div>
                        <div className="order-amount">
                            <h3>Sipariş Toplamı</h3>
                            <div className='price'>
                                <p> Seçimler:</p>
                                <p>{(count * extraPrice).toFixed(2)} ₺</p>
                                <p style={{ color: "#CE2829" }}> Toplam:</p>
                                <p style={{ color: "#CE2829" }}>{(count * (totalPrice + extraPrice)).toFixed(2)}  ₺</p>
                            </div>
                            <button id='order-button' type="submit" data-cy="submit-button" disabled={!valid} style={{ margin: "0" }}>Sipariş Ver</button>
                        </div>



                    </div>
                </Form>
            </div>



        </div>
    )
}


export default OrderForm;