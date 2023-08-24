import axios from 'axios';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(162, 222, 208, 1)',
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };
  return (
    <Layout title="Admin Dashboard">
      <div className="grid  md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard" className="font-bold">
                管控面板 
              </Link>
            </li>
            <li>
              <Link href="/admin/orders">訂單內容</Link>
            </li>
            <li>
              <Link href="/admin/products">產品明細</Link>
            </li>
            <li>
              <Link href="/admin/users">使用者資料</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h1 className="mb-4 text-xl">管理者管控面板</h1>
          {loading ? (
            <div>載入中...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="card m-5 p-5">
                  <p className="text-3xl">${summary.ordersPrice} </p>
                  <p>銷售金額</p>
                  <Link href="/admin/orders">檢視銷售明細</Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">{summary.ordersCount} </p>
                  <p>訂單</p>
                  <Link href="/admin/orders">檢視訂單明細</Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">{summary.productsCount} </p>
                  <p>商品</p>
                  <Link href="/admin/products">檢視商品明細</Link>
                </div>
                <div className="card m-5 p-5">
                  <p className="text-3xl">{summary.usersCount} </p>
                  <p>使用者</p>
                  <Link href="/admin/users">檢視使用者明細</Link>
                </div>
              </div>
              <h2 className="text-xl">Sales Report</h2>
              <Bar
                options={{
                  legend: { display: true, position: 'right' },
                }}
                data={data}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;
