import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashborad = () => {
    return (
        <div class="drawer drawer-mobile">
        <input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <h2 className='text-2xl text-purple-500'> Welcome to yourDashboard</h2>
            <Outlet></Outlet>
          {/* <!-- Page content here --> */}
          
        
        </div> 
        <div class="drawer-side">
          <label for="dashboard-sidebar" class="drawer-overlay"></label> 
          <ul class="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li><Link  to="/dashboard">My Appoientments</Link></li>
            <li><Link to="/dashboard/review">My Reviews</Link></li>
            <li><Link to="/dashboard/history">My History</Link></li>
          </ul>
        
        </div>
      </div>
    );
};

export default Dashborad;