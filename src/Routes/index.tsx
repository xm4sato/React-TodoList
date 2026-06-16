// import App from '@/App';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import type { JSX } from 'react';

// /**
//  * AppRoutes Component
//  * Establishes the core routing architecture for the task management dashboard.
//  * Implements fallback redirect boundaries to handle default landing scenarios cleanly.
//  */
// export default function AppRoutes(): JSX.Element {
//   return (
//     <>
//       {/* Route-based code splitting and lazy loading can be implemented here in the future */}
//       
//         {/* 1. Catch-all for the blank root path - Redirects cleanly to the default 'all' filter */}
//         {/* <Route path="/" element={<Navigate to="/tasks/all" replace />} /> */}
        
//         {/* 2. Catch-all for the legacy home path - Redirects to ensure unified view states */}
//         {/* <Route path="/home" element={<Navigate to="/tasks/all" replace />} /> */}

//         {/* 3. Single Unified Dynamic Branch Pipeline */}
//         {/* This single declaration captures 'all', 'completed', and 'pending' via route parameters */}
//         {/* <Route path="/tasks/:filter" element={<App />} /> */}
        
//         {/* 4. Optional: 404 Fallback line to protect against broken URL strings */}
//         {/* <Route path="*" element={<Navigate to="/tasks/all" replace />} /> */}
//      
//     </>
//   );
// }