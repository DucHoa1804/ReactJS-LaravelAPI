import Dashboard from '~/components/backend/Dashboard';
import Profile from '~/components/backend/Profile';


const Routes = [
    { path: '/admin', exact:true, name:'Admin' },
    
    { path: '/admin/dashboard',  exact:true, name:'Dashboard', component:Dashboard },
    { path: '/admin/profile',  exact:true, name:'Profile', component:Profile },
];


export default Routes;