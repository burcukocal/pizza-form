import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Col, FormGroup, Input, Label, Row, Card, CardText, FormFeedback, Form } from "reactstrap";
import * as Yup from "yup";
import "../style/OrderPage.css";
import Header from "./Header";

const OrderForm = () => {
    const pizza = {
        name: "Position Absolute Acı Pizza",
        price: 85.50,
        point: "4.9",
        comment: "(200)",
        text: "Frontent Dev olarak hala position: absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan italyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir."
    }

    const [formData, setFormData] = useState({
        size: '',
        dough: '',
        extras: [],
        orderNote: '',
        count: 1,
    });

    const [formErrs, setFormErrs] = useState({
        size: '',
        dough: '',
        extras: [],
        orderNote: '',
        count: 1,
    });

    const [isValid, setIsValid] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formData)
            .then(res => {
                console.log(res.data);
                history.push({ pathname: '/success', state: formData, pizza: pizza });
                setFormData(e.target.elements);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

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
        formSchema.isValid(formData).then((valid) => setIsValid(valid));
    }, [formData]);

    const formSchema = Yup.object().shape({
        size: Yup.string().required("Boyut seçmelisiniz!"),
        dough: Yup.string().required("Hamur kalınlığı seçmelisiniz!"),
        extras: Yup.array().max(10, "10 malzemeden fazlasını seçemezsiniz."),
        orderNote: Yup.string(),
        count: Yup.number().min(1, "Minimum 1 adet ürün seçmelisiniz.")
    });

    const increaseCount = () => {
        setFormData({
            ...formData,
            count: formData.count + parseInt(1)
        });
    };

    const decreaseCount = () => {
        setFormData({
            ...formData,
            count: formData.count > 1 ? formData.count - parseInt(1) : 1
        });
    };

    const calculateSelectedItemsTotal = (formData) => {
        const extraPrice = 5;
        const total = extraPrice * formData.extras.length
        return total;
    };
    const calculateOrderTotal = (formData) => {
        let result = pizza.price;
        const totalPrice = (pizza.price + calculateSelectedItemsTotal(formData)) * formData.count;
        if (formData.size === "S") {
            result = totalPrice
        } else if (formData.size === "M") {
            result = totalPrice + 10
        } else if (formData.size === "L") {
            result = totalPrice + 20
        }
        return result;
    };

    const handleRedirectHome = () => {
        history.push("/")
    }

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
                <p style={{ width: "40%", margin: "auto", marginBottom: "3%", color: "#5F5F5F", textAlign:"left" }}>{pizza.text}</p>
            </div>
            <div className='order-form-container' >
            <Form id="pizza-form" onSubmit={handleSubmit}>
            <div className='size-dough'>

            </div>
            </Form>
            </div>



        </div>
    )


}
export default OrderForm;