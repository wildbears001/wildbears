// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { backendUrl, currency } from "../App";

// const Analytics = ({ token }) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${backendUrl}/api/admin/analytics/sales`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(res => setData(res.data.sales));
//   }, [token]);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">📈 Sales Analytics (Last 7 Days)</h2>

//       <table className="border w-full">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="p-2 border">Date</th>
//             <th className="p-2 border">Orders</th>
//             <th className="p-2 border">Revenue</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((d) => (
//             <tr key={d._id}>
//               <td className="p-2 border">{d._id}</td>
//               <td className="p-2 border">{d.orders}</td>
//               <td className="p-2 border">{currency}{d.total}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Analytics;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";

const Analytics = ({ token }) => {
  const [salesData, setSalesData] = useState([]); // ✅ always array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/admin/analytics/sales`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (res.data?.success && Array.isArray(res.data.sales)) {
          setSalesData(res.data.sales);
        } else {
          setSalesData([]);
        }
      } catch (err) {
        console.error("Analytics error:", err);
        setError("Failed to load analytics");
        setSalesData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [token]);

  if (loading) {
    return <p>Loading analytics...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        📈 Sales Analytics (Last 7 Days)
      </h2>

      {salesData.length === 0 ? (
        <p className="text-gray-500">
          No sales data available for the selected period.
        </p>
      ) : (
        <table className="border w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Orders</th>
              <th className="p-2 border">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((item) => (
              <tr key={item._id}>
                <td className="p-2 border">{item._id}</td>
                <td className="p-2 border">{item.orders}</td>
                <td className="p-2 border">
                  {currency}{item.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Analytics;
