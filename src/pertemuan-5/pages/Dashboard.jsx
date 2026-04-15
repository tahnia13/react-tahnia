import LayoutWrapper from '../components/LayoutWrapper';
import PageHeader from '../components/PageHeader';
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import '../assets/dashboard.css';
import RecentOrders from '../components/RecentOrders';

export default function Dashboard() {
    return (
        
        <LayoutWrapper>
            <PageHeader />
            <RecentOrders />
            
            {/* Dashboard Count - Grid Layout */}
            <div id="dashboard-grid">
                {/* Card Total Orders */}
                <div id="count-orders">
                    <div id="orders-icon" className="text-3xl text-white">
                        <FaShoppingCart />
                    </div>
                    <div id="orders-info">
                        <span id="orders-count">75</span>
                        <span id="orders-text">Total Orders</span>
                    </div>
                </div>

                {/* Card Total Delivered */}
                <div id="count-delivered">
                    <div id="delivered-icon" className="text-3xl text-white">
                        <FaTruck />
                    </div>
                    <div id="delivered-info">
                        <span id="delivered-count">175</span>
                        <span id="delivered-text">Total Delivered</span>
                    </div>
                </div>

                {/* Card Total Canceled */}
                <div id="count-canceled">
                    <div id="canceled-icon" className="text-3xl text-white">
                        <FaBan />
                    </div>
                    <div id="canceled-info">
                        <span id="canceled-count">40</span>
                        <span id="canceled-text">Total Canceled</span>
                    </div>
                </div>

                {/* Card Total Revenue */}
                <div id="count-revenue">
                    <div id="revenue-icon" className="text-3xl text-white">
                        <FaDollarSign />
                    </div>
                    <div id="revenue-info">
                        <span id="revenue-amount">Rp.128</span>
                        <span id="revenue-text">Total Revenue</span>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}