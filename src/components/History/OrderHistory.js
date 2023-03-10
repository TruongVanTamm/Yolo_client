import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GlobalState } from '../../GlobalState';

function OrderHistory() {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get(
            'https://yolo-server.onrender.com/api/payment',
            {
              headers: { Authorization: token },
            }
          );
          setHistory(res.data);
        } else {
          const res = await axios.get(
            'https://yolo-server.onrender.com/user/history',
            {
              headers: { Authorization: token },
            }
          );
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  return (
    <div className="history-page">
      <h2>Lịch sử đặt hàng</h2>
      {isAdmin ? (
        <h4>Có {history.length} đơn hàng cần xử lý</h4>
      ) : (
        <h4>Bạn đã đặt hàng {history.length} sản phẩm</h4>
      )}

      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Ngày đặt hàng</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {history.map((items) => (
            <tr key={items._id}>
              <td>{items.paymentID}</td>
              <td>{new Date(items.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/history/${items._id}`}>Xem chi tiết</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
