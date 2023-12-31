
import { Container, Content, Payment } from './styles.js'
import { Button } from '../Button';
import { ButtonText } from "../ButtonText";
import { useAuth } from "../../hooks/auth";
import { api } from '../../services/api.js';
import { useState, useEffect } from "react";
import { BsReceipt } from 'react-icons/bs';
import pencil from '../../assets/pencil.svg'
import { FiMinus, FiPlus } from 'react-icons/fi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { AlertModal } from '../AlertModal/index.jsx';
import { useNavigate } from 'react-router-dom';

export function Card({ data, image, description, name, price,  ...rest }) {
    const { user } = useAuth()
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate= useNavigate();

    function handleDetails(id) {
        navigate(`/details/${id}`)
      }


    function handleEdit(id) {
      navigate(`/edition/${id}`)
    }
  
    const increase = () => {
        if (quantity > 19) {
            setAlertMessage("A quantidade máxima é de 20 unidades");
            setShowAlert(true);
            return;
        }
        setQuantity(count => count + 1);
        console.log(image)
    };
     
    const decrease = () => {
        if (quantity < 2) {
            setAlertMessage("A quantidade mínima é 1 unidade");
            setShowAlert(true);
            return;
        }
        setQuantity(count => count - 1);
    };

      function handleFavoriteClick() {
    if (isFavorite) {
      removeFromFavorites();
    } else {
      addToFavorites();
    }
  }

  async function addToFavorites() {
    
      setIsFavorite(true);
      try {
        const response = await api.post(`/favorites/${data.id}`);
       
      } catch (error) {
      }
    
  }

  async function removeFromFavorites() {
      setIsFavorite(false);
      try {
       await api.delete(`/favorites/${data.id}`);
      } catch (error) {
      }
 
  }

  useEffect(() => {
    async function checkFavoriteStatus() {
 
        try {
          const response = await api.get(`/favorites/check/${data.id}`);
          setIsFavorite(response.data.isFavorite);
        } catch (error) {
      }
    }
    checkFavoriteStatus();
  }, [user, data.id]);
  
  async function AddToCart(id) {
    try {
     const response= await api.get(`/cart/check/${id}`);
      const isAlreadyInCart = response.data.isInCart;
      if (isAlreadyInCart) {
         setAlertMessage("O prato já está incluso no pedido!");
          setShowAlert(true);
      } else {
        await api.post(`/cart/${id}`, { quantity });
         setAlertMessage("Prato adicionado ao pedido!");
          setShowAlert(true);
       
      }
    } catch (error) {
      setAlertMessage("Erro ao adicionar produto ao carrinho!");
          setShowAlert(true);
    }
  }

    return (
        <Container {...rest}>
            {
                user.isAdmin ?

                    <Content isAdmin={true} >
                        <div className="container">
                            <div className="pencil">
                            <img onClick={() => handleEdit(data.id)}  src={pencil} alt="Icone para editar" />

                            </div>
                          
                            <img onClick={() => handleDetails(data.id)} src={image} alt="Imagem do prato" />
                           
                                <h3 onClick={() => handleDetails(data.id)} className="dishName">{name}</h3>
                        
                            <p onClick={() => handleDetails(data.id)} className="description">{description}</p>
                            <h1 onClick={() => handleDetails(data.id)} className="price">R${price}</h1>
                          
                        </div>
                    </Content>

                :

                    <Content>
                        <button onClick={handleFavoriteClick}
                            className="ButtonFav"
                           
                            >
                              {isFavorite ?
                                    <AiFillHeart />
                                :
                                    <AiOutlineHeart />
                                }  
                                
                        </button>

                        <div  className="container">
                            <img onClick={() => handleDetails(data.id)}  src={image} alt="Imagem do prato" />
                           
                                <h3 onClick={() => handleDetails(data.id)}  className="dishName">{name} </h3>
                
                            <p onClick={() => handleDetails(data.id)} className="description">{description}</p>
                            <h1 onClick={() => handleDetails(data.id)} className="price">R${price}</h1>

                            <Payment>
                                <div className="count">
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
                                    title="incluir"
                                    icon={BsReceipt}
                                    onClick={() => AddToCart(data.id)}
                                    style={ { height: 56, width: 92, padding: '12px 4px' } }
                                />
                            </Payment>
                        </div>
                    </Content>
                }
                {showAlert && <AlertModal message={alertMessage}  onClose={() => setShowAlert(false)} />}

        </Container>
    );
}