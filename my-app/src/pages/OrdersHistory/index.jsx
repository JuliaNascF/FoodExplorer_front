
import { Container, Content, Table, Order } from "./styles.js";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ButtonText } from "../../components/ButtonText";
import { api } from '../../services/api';
import { useAuth } from "../../hooks/auth";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { FaSpinner } from "react-icons/fa";
import { FiArrowLeft } from 'react-icons/fi'


export function OrdersHistory() {
    const { user } = useAuth()
    const [orders, setOrders] = useState([]);
    const [ordersAdmin, setOrdersAdmin] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await api.get("/orders");
                setOrders(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        fetchOrders();
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const formattedDate = format(date, 'dd/MM');
        const formattedTime = format(date, 'HH:mm');
        return `${formattedDate} às ${formattedTime}h`;
    }

    const parseItems = (items) => {
        try {

            if (!items || typeof items !== 'string') {
                return [];
            }

            const parsedItems = JSON.parse(items);


            if (Array.isArray(parsedItems)) {
                return parsedItems;
            } else {

                return [parsedItems];
            }
        } catch (error) {

            return [];
        }
    };

    function handleBack() {
        navigate(-1);
    }

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await api.put("/orders", { id: orderId, orderStatus: newStatus });

            setOrders(prevOrders =>
                prevOrders.map(order => {
                    if (order.id === orderId) {
                        return { ...order, orderstatus: newStatus };
                    } else {
                        return order;
                    }
                })
            );

            if (user.isAdmin) {
                setOrdersAdmin(prevOrders =>
                    prevOrders.map(order => {
                        if (order.id === orderId) {
                            return { ...order, orderstatus: newStatus };

                        } else {
                            return order;
                        }
                    })
                );
            }
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        async function fetchOrdersAdmin() {
            try {
                const response = await api.get("/orders/all");
                setIsLoading(false);
                setOrdersAdmin(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchOrdersAdmin();
    }, []);

    return (
        <Container>
            <Header />

            {
                user.isAdmin ?

                    <div className="back">
                        <ButtonText onClick={handleBack} icon={FiArrowLeft} />
                        <h3>Pedidos</h3>
                    </div>

                    :
                    <div className="back">
                        <ButtonText onClick={handleBack} icon={FiArrowLeft} />
                        <h3>Histórico de Pedidos</h3>
                    </div>
            }
            <Content>


                <Table className="desktop">

                    <table>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Código</th>
                                <th>Detalhamento</th>
                                <th>Data e hora</th>
                            </tr>
                        </thead>



                        {
                            user.isAdmin ?

                                <tbody className="order">
                                   
                                        {ordersAdmin &&
                                        ordersAdmin.map(order => (
                                            <tr key={String(order.id)}>
                                                <td>
                                                    <select value={order.orderStatus}
                                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}  >
                                                        <option value="🔴 Pendente">🔴 Pendente</option>
                                                        <option value="🟠 Preparando">🟠 Preparando</option>
                                                        <option value="🟢 Entregue">🟢 Entregue</option>

                                                    </select>
                                                </td>
                                                <td>0000{order.id}</td>
                                                <td>

                                                    <span >
                                                        {parseItems(order.items).map(item => (
                                                            <div key={item.id}>
                                                                {item.quantity} x {item.name}
                                                            </div>
                                                        ))}
                                                    </span>

                                                </td>
                                                <td>{formatDate(order.date)}</td>
                                            </tr>
                                        ))
                                     }
                                </tbody>

                                :
                                <tbody className="order">
                                   
                                        {orders &&
                                        orders.map(order => (
                                            <tr key={String(order.id)}>
                                                <td>{order.orderStatus}</td>
                                                <td>0000{order.id}</td>
                                                <td>

                                                    <span>
                                                        {parseItems(order.items).map(item => (
                                                            <div key={item.id}>
                                                                {item.quantity} x {item.name}
                                                            </div>
                                                        ))}
                                                    </span>
                                                </td>
                                                <td>{formatDate(order.date)}</td>
                                            </tr>
                                        ))
                                   }
                                </tbody>
                        }
                    </table>
                </Table>
                
                {user.isAdmin ? (
                    isLoading ? (
                        <FaSpinner size={25} className="loading-spinner" />
                    ) : 
                        ordersAdmin.map(order => (
                            <Order className="mobile" key={String(order.id)}>

                                <div className="details">
                                    <p>0000{order.id}</p>
                                    <p>{formatDate(order.date)}</p>
                                </div>
                                <p>
                                    {parseItems(order.items).map(item => (
                                        <div key={item.id}>
                                            {item.quantity} x {item.name}
                                        </div>
                                    ))}
                                </p>
                                <p>
                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    >
                                        <option value="🔴 Pendente">🔴 Pendente</option>
                                        <option value="🟠 Preparando">🟠 Preparando</option>
                                        <option value="🟢 Entregue">🟢 Entregue</option>
                                    </select>
                                </p>
                            </Order>
                        ))
                    
                ) : (
                    isLoading ? (
                        <FaSpinner size={25} className="loading-spinner" />
                    ) :
                        orders.map(order => (
                            <Order className="mobile" key={String(order.id)}>
                                <div className="details">
                                    <p>0000{order.id}</p>
                                    <p>{formatDate(order.date)}</p>
                                </div>
                                <p>
                                    {parseItems(order.items).map(item => (
                                        <div key={item.id}>
                                            {item.quantity} x {item.name}
                                        </div>
                                    ))}
                                </p>
                                <p>{order.orderStatus}</p>

                            </Order>
                        ))
                    
                )}



            </Content>
            <Footer />
        </Container>

    );
}