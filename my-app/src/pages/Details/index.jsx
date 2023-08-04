
import { Container, Content, Ingredients, PurchaseCard } from "./styles.js";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Ingredient } from "../../components/Ingredient/index.jsx";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { RiArrowLeftSLine } from 'react-icons/ri';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { BsReceipt } from 'react-icons/bs';

export function Details() {


    const { user } = useAuth()

    const navigate = useNavigate();

    function handleBack() {
        navigate(-1);
    }

    const [data, setData] = useState(null);
    const params = useParams();


    const [quantity, setQuantity] = useState(1);


    const increase = () => {
        if (quantity > 19) {
            alert("Erro: A quantidade máxima é de 20 unidades")
            return;
        }
        setQuantity(count => count + 1);
    };


    const decrease = () => {
        if (quantity < 2) {
            alert("Erro: A quantidade mínima é 1 unidade")
            return;
        }
        setQuantity(count => count - 1);
    };

    useEffect(() => {
        async function fetchDishDetail() {
            const response = await api.get(`/dishes/${params.id}`);
            setData(response.data);
        }

        fetchDishDetail();
    }, []);

    async function AddToCart(id) {
        try {
          const response = await api.get(`/cart/check/${id}`);
          const isAlreadyInCart = response.data.isInCart;
          if (isAlreadyInCart) {
            alert("O prato já está incluso no pedido!");
          } else {
            await api.post(`/cart/${id}`, { quantity });
            alert("Prato adicionado ao pedido!");
          }
        } catch (error) {
          alert("Erro ao adicionar produto ao carrinho!");
        }
      }

    return (

        <Container>
            <Header />
            {
                data &&

                <Content>
                    <ButtonText
                        title="Voltar"
                        icon={RiArrowLeftSLine}
                        onClick={handleBack}
                    />

                    <div className="dish">
                        <img src={data.image} alt="Imagem do prato" />



                        <div className="purchaseCard">
                            <div className="description">

                                <h1>{data.name}</h1>

                                <h3>{data.description}</h3>

                            </div>


                            <Ingredients>
                                {data.ingredients &&
                                    data.ingredients.map((ingredient, index) => (
                                        <Ingredient key={index} title={ingredient.name} />
                                    ))}
                            </Ingredients>

                            {
                                user.isAdmin ?

                                    <PurchaseCard>
                                        {
                                            data &&
                                            <Link to={`/editdish/${data.id}`}>
                                                <Button
                                                    title="editar prato"
                                                    icon={BsReceipt}
                                                />
                                            </Link>
                                        }
                                    </PurchaseCard>

                                    :

                                    <PurchaseCard>
                                        <div className="counter">
                                            <ButtonText
                                                icon={FiMinus}
                                                onClick={decrease}
                                            />
                                            <span>{quantity.toString().padStart(2, '0')}</span>
                                            <ButtonText
                                                icon={FiPlus}
                                                onClick={increase}
                                            />
                                        </div>

                                        <Button
                                             onClick={() => AddToCart(data.id)}
                                            title="incluir"
                                            icon={BsReceipt}

                                            style={{ height: 56, width: 92, padding: '12px 4px' }}
                                        />
                                    </PurchaseCard>
                            }
                        </div>
                    </div>


                </Content>
            }
            <Footer />
        </Container>

    );
}